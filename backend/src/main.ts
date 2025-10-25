import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Cria a aplicação
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // log completo
  });

  // Habilita CORS (permitindo chamadas do Electron, Postman etc)
  app.enableCors();

  // Habilita validação global dos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades não esperadas do body
      forbidNonWhitelisted: true, // lança erro se vierem propriedades extras
      transform: true, // converte automaticamente tipos (ex.: string -> number)
    }),
  );

  // Acessa ConfigService para pegar dados do .env
  const configService = app.get(ConfigService);

  logger.log('=== CONFIGURAÇÃO DO AMBIENTE ===');
  logger.log(`DB_HOST: ${configService.get<string>('DB_HOST')}`);
  logger.log(`DB_PORT: ${configService.get<string>('DB_PORT')}`);
  logger.log(`DB_USER: ${configService.get<string>('DB_USER')}`);
  logger.log(`DB_PASS: ${configService.get<string>('DB_PASS')}`);
  logger.log(`DB_NAME: ${configService.get<string>('DB_NAME')}`);
  logger.log(`DB_SYNC: ${configService.get<string>('DB_SYNC')}`);
  logger.log('================================');

  // Porta da aplicação
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Aplicação rodando na porta ${port}`);
}

bootstrap();
