import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppDataSource } from './data-source';
import { seedEspecialidades } from './data-sources/especialidade.seed';
import { Especialidade } from './medico/entities/especialidade.entity';
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  

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

  const configService = app.get(ConfigService);

  logger.log('=== CONFIGURAÇÃO DO AMBIENTE ===');
  logger.log(`DB_HOST: ${configService.get<string>('DB_HOST')}`);
  logger.log(`DB_PORT: ${configService.get<string>('DB_PORT')}`);
  logger.log(`DB_USER: ${configService.get<string>('DB_USER')}`);
  logger.log(`DB_PASS: ${configService.get<string>('DB_PASS')}`);
  logger.log(`DB_NAME: ${configService.get<string>('DB_NAME')}`);
  logger.log(`DB_SYNC: ${configService.get<string>('DB_SYNC')}`);
  logger.log('================================');

  if (!AppDataSource.isInitialized) {
  await AppDataSource.initialize();
}

const especialidadeRepo = AppDataSource.getRepository(Especialidade);

const existeEspecialidade = await especialidadeRepo.exist();

if (!existeEspecialidade) {
  await seedEspecialidades(AppDataSource);
}

 
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Aplicação rodando na porta ${port}`);
}

bootstrap();
