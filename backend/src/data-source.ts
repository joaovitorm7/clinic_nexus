import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Carrega variáveis de ambiente do .env
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // nunca use synchronize em produção
  logging: true,

  // Pega todas as entidades espalhadas por pastas
  entities: [path.join(__dirname, '/**/*.entity.{ts,js}')],

  // Pega todas as migrations (TS para dev, JS para build)
  migrations: ['src/migrations/*{.ts,.js}'],

  extra: {
    createDatabase: true, // cria o DB se não existir
  },
});
