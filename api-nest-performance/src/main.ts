import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa a validação automática para todos os DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Define o prefixo global para as rotas (opcional, para ficar igual ao Java)
  app.setGlobalPrefix('api');

  // Muda a porta para 8083 para evitar conflitos
  await app.listen(8083);
}
bootstrap();