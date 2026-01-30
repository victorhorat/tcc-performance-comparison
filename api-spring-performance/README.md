# Estudo Comparativo de Performance - Implementação Spring Boot

Este projeto integra uma análise comparativa de desempenho entre frameworks, focando em cenários de alta volumetria de dados para telemetria utilizando a JVM.

## Tecnologias Utilizadas
- Java 17+
- Spring Boot 3.x
- Spring Data JPA (Hibernate)
- PostgreSQL (via Docker)
- Lombok (Redução de código boilerplate)
- Jakarta Validation (Bean Validation)

## Estrutura do Projeto
- controller/: Exposição dos endpoints REST e validação de entrada com @Valid.
- service/: Camada de lógica de negócio e processamento de dados (Streams API).
- repository/: Interface de comunicação com o banco de dados via Spring Data.
- model/: Entidades mapeadas para o banco de dados.
- dto/: Objetos de transferência de dados para segurança e validação.

## Instruções para Execução

1. Compilação e Build:
   Certifique-se de estar na raiz do projeto onde se encontra o arquivo pom.xml:
   ./mvnw clean package

2. Inicialização do servidor:
   Para rodar a aplicação na porta 8081 (evitando conflito com o pgAdmin na 8080 e FastAPI na 8082):
   ./mvnw spring-boot:run

   Alternativamente, rodando o JAR diretamente:
   java -jar target/api-spring-performance-0.0.1-SNAPSHOT.jar

## Endpoints Disponíveis
- GET /api/telemetry/sensor/{id}: Retorna todos os registros de um sensor (Processado via JPA).
- GET /api/telemetry/sensor/{id}/average: Retorna a média aritmética calculada via Java Streams API (Processamento em memória).
- POST /api/telemetry: Cria um registro individual com validação via DTO.
- POST /api/telemetry/bulk: Inserção de múltiplos registros utilizando o método saveAll do JPA.

## Configurações de Performance
As configurações de batch insert e porta estão localizadas em: src/main/resources/application.properties