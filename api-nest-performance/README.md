# Estudo Comparativo de Performance - Implementação NestJS

Este projeto integra uma análise comparativa de desempenho entre frameworks, utilizando Node.js e TypeScript.

## Tecnologias Utilizadas
- Node.js 18+
- NestJS
- TypeORM
- PostgreSQL
- Class-validator (Validação de DTOs)

## Instruções para Execução

1. Instalação de dependências:
   npm install

2. Inicialização do servidor:
   Para rodar na porta 8083 (evitando conflitos com os outros frameworks):
   npm run start

## Endpoints Disponíveis
- GET /api/telemetry/sensor/{id}: Lista registros de um sensor.
- GET /api/telemetry/sensor/{id}/average: Cálculo de média via QueryBuilder (Banco).
- POST /api/telemetry/bulk: Inserção em massa.