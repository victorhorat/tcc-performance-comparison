const fs = require('fs');
const { spawn } = require('child_process');

const TOTAL_REGISTROS = 100000;
const FILE_NAME = 'massa_dados.sql';

console.log('Iniciando processo de geração de dados...');

// 1. Criar o fluxo de escrita (Write Stream)
const stream = fs.createWriteStream(FILE_NAME);

stream.write('BEGIN;\n'); // Transação para alta performance

for (let i = 0; i < TOTAL_REGISTROS; i++) {
    const sensor_id = `sensor-${Math.floor(Math.random() * 10) + 1}`;
    const value = (Math.random() * (40 - 15) + 15).toFixed(2);
    const unit = 'celsius';
    
    // Escreve cada linha de INSERT diretamente no arquivo no disco
    stream.write(`INSERT INTO telemetry (sensor_id, value, unit) VALUES ('${sensor_id}', ${value}, '${unit}');\n`);
    
    if (i % 20000 === 0 && i !== 0) {
        console.log(`Geradas ${i} linhas...`);
    }
}

stream.write('COMMIT;\n');
stream.end();

// 2. Quando terminar de escrever o arquivo, iniciamos a importação
stream.on('finish', () => {
    console.log('Arquivo SQL gerado com sucesso!');
    console.log('Enviando para o banco de dados via Stream (evitando estouro de buffer)...');

    // Preparamos o comando 'docker exec' de forma fragmentada
    const docker = spawn('docker', [
        'exec', '-i', 'tcc_postgres', 
        'psql', '-U', 'user_tcc', '-d', 'telemetry_db'
    ]);

    // Criamos um fluxo de leitura do arquivo SQL
    const fileStream = fs.createReadStream(FILE_NAME);

    // O "pulo do gato": Conectamos a saída do arquivo diretamente na entrada do Docker
    fileStream.pipe(docker.stdin);

    // Captura mensagens de erro do processo do Docker
    docker.stderr.on('data', (data) => {
        console.error(`Alerta do Banco: ${data}`);
    });

    // Quando o processo do Docker terminar
    docker.on('close', (code) => {
        if (code === 0) {
            console.log('--------------------------------------------------');
            console.log('SUCESSO: 100.000 registros inseridos no Postgres!');
            console.log('--------------------------------------------------');
            
            // Deletar o arquivo temporário para não ocupar espaço no seu PC
            fs.unlinkSync(FILE_NAME);
            console.log(`Arquivo temporário ${FILE_NAME} removido.`);
        } else {
            console.error(`O processo de importação falhou com o código: ${code}`);
        }
    });
});