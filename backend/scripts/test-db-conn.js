/* eslint-env node */
/* eslint-disable */
// @ts-nocheck
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function parseEnv(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const env = {};
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    env[key] = val;
  }
  return env;
}

(async () => {
  try {
    const envPath = resolve(__dirname, '..', '.env');
    console.log('Lendo .env em:', envPath);
    if (!existsSync(envPath)) {
      console.error('Arquivo .env não encontrado em', envPath);
      process.exit(2);
    }

    const env = parseEnv(envPath);
    const host = env.DB_HOST || env.DBHOST || '127.0.0.1';
    const port = Number(env.DB_PORT || env.DBPORT || 3306);
    const user = env.DB_PASS ? env.DB_USER : env.DB_USER; // fallback
    const password = env.DB_PASS || env.DB_PASSWORD || '';
    const database = env.DB_NAME || env.DBNAME || env.DATABASE || '';

    console.log('Tentando conectar com:', { host, port, user, database });
    console.log('Variáveis lidas do .env:', env);

    const conn = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
    });
    console.log('Conexão estabelecida com sucesso!');

    const [rows] = await conn.execute('SELECT 1 as ok');
    console.log('Resultado da query de teste:', rows);

    await conn.end();
    process.exit(0);
  } catch (err) {
    console.error('Erro ao conectar no DB:');
    // imprime mensagem e stack para diagnóstico
    console.error(err && err.message ? err.message : err);
    if (err && err.stack) console.error(err.stack);
    if (err && err.code) console.error('Código de erro MySQL:', err.code);
    try {
      // imprime propriedades do erro (útil para objetos Error do mysql2)
      console.error(
        'Detalhes do erro:',
        JSON.stringify(err, Object.getOwnPropertyNames(err), 2),
      );
    } catch (e) {
      // ignora falha ao stringificar
    }
    process.exit(1);
  }
})();
