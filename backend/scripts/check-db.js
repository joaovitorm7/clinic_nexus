const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

function parseEnv(envContent) {
  return envContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .reduce((acc, line) => {
      const idx = line.indexOf('=');
      if (idx === -1) return acc;
      const key = line.substring(0, idx).trim();
      const val = line.substring(idx + 1).trim();
      acc[key] = val;
      return acc;
    }, {});
}

(async () => {
  try {
    const envPath = path.resolve(__dirname, '..', '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = parseEnv(envContent);

    const host = env.DB_HOST || env.DBHOST || '127.0.0.1';
    const port = Number(env.DB_PORT || env.DBPORT || 3306);
    const user = env.DB_USER || env.DBUSER || env.DB_USER_NAME || 'root';
    const password = env.DB_PASS || env.DB_PASSWORD || env.DBPASSWORD || '';
    const database =
      env.DB_NAME || env.DBNAME || env.DATABASE || 'Clinic_nexus';

    const conn = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
    });

    const result = {};

    // paciente
    try {
      const [countRows] = await conn.execute(
        'SELECT COUNT(*) AS count FROM paciente',
      );
      result.pacienteCount = countRows[0] ? countRows[0].count : 0;
      const [rows] = await conn.execute(
        'SELECT id, nome, cpf, data_nascimento AS dataNascimento, contato FROM paciente ORDER BY id DESC LIMIT 5',
      );
      result.pacienteRecent = rows;
    } catch (e) {
      result.pacienteError = (e && e.message) || String(e);
    }

    // usuario
    try {
      const [countRows] = await conn.execute(
        'SELECT COUNT(*) AS count FROM usuario',
      );
      result.usuarioCount = countRows[0] ? countRows[0].count : 0;
      const [rows] = await conn.execute(
        'SELECT id, nome, email, status, tipo FROM usuario ORDER BY id DESC LIMIT 5',
      );
      result.usuarioRecent = rows;
    } catch (e) {
      result.usuarioError = (e && e.message) || String(e);
    }

    console.log(
      JSON.stringify({ ok: true, database, host, port, result }, null, 2),
    );

    await conn.end();
  } catch (err) {
    console.error(
      JSON.stringify(
        { ok: false, error: (err && err.message) || String(err) },
        null,
        2,
      ),
    );
    process.exitCode = 1;
  }
})();
