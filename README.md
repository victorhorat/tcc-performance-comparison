# Estudo Comparativo de Performance: Spring Boot vs FastAPI vs NestJS

Este repositório contém a implementação prática do meu Trabalho de Conclusão de Curso (TCC) em Ciência da Computação na CESAR School. O objetivo do projeto é analisar e comparar o desempenho de diferentes frameworks de backend no processamento e persistência de altos volumes de dados de telemetria.

## Sobre o Estudo
O projeto simula um cenário real de IoT/Telemetria, onde sensores enviam milhares de registros que precisam ser processados de forma eficiente. Avaliamos três pilares tecnológicos distintos para entender como cada runtime lida com concorrência, memória e latência:

1. **Spring Boot (Java)**: Focado em robustez e multithreading na JVM.
2. **FastAPI (Python)**: Utilizando o modelo de concorrência assíncrona (AsyncIO).
3. **NestJS (Node.js)**: Baseado no Event Loop do motor V8.

## Arquitetura do Ecossistema
Todas as aplicações compartilham a mesma instância de banco de dados para garantir que a comparação de performance foque exclusivamente no comportamento dos frameworks.

- **Banco de Dados**: PostgreSQL (rodando via Docker) na porta 5432.
- **Portas das Aplicações**:
  - **8081**: Spring Boot (Java)
  - **8082**: FastAPI (Python)
  - **8083**: NestJS (Node.js)

## Estrutura do Repositório
O projeto está organizado no formato de monorepo:
- `/api-spring-performance`: Implementação em Java 17+.
- `/api-fastapi-performance`: Implementação em Python 3.10+.
- `/api-nest-performance`: Implementação em TypeScript/Node.js.
- `/Scripts`: Scripts SQL para população e limpeza da base de dados.
- `/Infra`: Configurações de Docker e ambiente.

## Como Executar

### 1. Banco de Dados
Certifique-se de que o container PostgreSQL está ativo:
```bash
docker-compose up -d