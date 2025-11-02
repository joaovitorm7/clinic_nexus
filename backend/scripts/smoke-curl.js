/* eslint-disable */
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

function runCurlPost(url, jsonBody) {
  // write body to a temp file to avoid shell/quoting issues
  const tmpDir = os.tmpdir();
  const tmpFile = path.join(tmpDir, `smoke_body_${Date.now()}.json`);
  fs.writeFileSync(tmpFile, JSON.stringify(jsonBody));
  try {
    const args = [
      '-s',
      '-X',
      'POST',
      url,
      '-H',
      'Content-Type: application/json',
      '--data',
      `@${tmpFile}`,
    ];
    const out = execFileSync('curl', args, { encoding: 'utf8' });
    try {
      fs.unlinkSync(tmpFile);
    } catch (_) {}
    return out;
  } catch (err) {
    try {
      fs.unlinkSync(tmpFile);
    } catch (_) {}
    throw new Error(
      `curl POST failed: ${String(err && err.message ? err.message : err)}`,
    );
  }
}

try {
  console.log('=== POST /pacientes (curl) ===');
  const pacOut = runCurlPost('http://localhost:3000/pacientes', {
    nome: 'Smoke Paciente CURL',
    cpf: '44444444444',
    dataNascimento: '1994-11-02',
    contato: '(11) 94444-3333',
  });
  console.log(pacOut || '(no output)');

  console.log('\n=== POST /usuarios (curl) ===');
  const userOut = runCurlPost('http://localhost:3000/usuarios', {
    nome: 'Smoke Usuario CURL',
    email: `smoke_curl_${Date.now()}@example.com`,
    senha: 'senha123',
    tipo: 'user',
  });
  console.log(userOut || '(no output)');

  console.log('\n=== RUN scripts/check-db.js ===');
  const out = execFileSync(process.execPath, ['scripts/check-db.js'], {
    encoding: 'utf8',
  });
  console.log(out);
} catch (err) {
  console.error(
    'Smoke-curl failed:',
    String(err && err.message ? err.message : err),
  );
  process.exitCode = 1;
}
