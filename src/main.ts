import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  console.log('Tentando conectar com os seguintes parâmetros do banco:');
  console.log({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
  });

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 3000;

  // Verifica se o TypeORM já inicializou a conexão
  const dataSource = app.get(DataSource);
  if (dataSource.isInitialized) {
    logger.log('Conexão com o banco de dados estabelecida com sucesso!');
  } else {
    logger.warn('Conexão com o banco de dados ainda não inicializada.');
  }

  await app.listen(port);
  logger.log(`Aplicação rodando na porta ${port}`);
}

bootstrap();
