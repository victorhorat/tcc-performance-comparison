# Estudo Comparativo de Performance - Implementação FastAPI

Este projeto integra uma análise comparativa de desempenho entre frameworks, focando em cenários de alta volumetria de dados para telemetria.

## Tecnologias Utilizadas
- Python 3.10+
- FastAPI
- SQLAlchemy (ORM)
- PostgreSQL (via Docker)
- Pydantic (Validação de dados e DTOs)

## Estrutura do Projeto
- main.py: Gerenciamento de rotas e injeção de dependências.
- models.py: Definição das entidades do banco de dados.
- schemas.py: Contratos de dados (DTOs) e regras de validação.
- database.py: Configuração da engine e sessão do banco de dados.
- crud.py: Camada de persistência e lógica de agregação de dados.

## Instruções para Execução

1. Instalação de dependências:
   Para instalar os pacotes necessários, utilize o gerenciador pip:
   pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic

2. Inicialização do servidor:
   Para rodar a aplicação na porta definida para evitar conflitos com o Spring Boot (8081) e o pgAdmin (8080), execute o comando abaixo na raiz do projeto:
   uvicorn main:app --reload --port 8082

## Endpoints Disponíveis
- GET /api/telemetry/sensor/{id}: Retorna todos os registros vinculados a um sensor específico.
- GET /api/telemetry/sensor/{id}/average: Retorna a média aritmética dos valores calculada diretamente no banco de dados.
- POST /api/telemetry: Cria um registro individual de telemetria.
- POST /api/telemetry/bulk: Realiza a inserção de múltiplos registros em uma única transação (Teste de carga).

## Monitoramento e Testes
A documentação interativa (Swagger) pode ser acessada em: http://localhost:8082/docs