const axios = require('axios');
const { execFileSync } = require('child_process');

async function run() {
  const base = 'http://127.0.0.1:3000';
  try {
    console.log('=== POST /pacientes ===');
    const pacRes = await axios.post(`${base}/pacientes`, {
      nome: 'Smoke Paciente',
      cpf: `smoke_cpf_${Date.now()}`,
      dataNascimento: '1995-12-01',
      contato: '(11) 95555-4444',
    });
    console.log(
      JSON.stringify({ status: pacRes.status, data: pacRes.data }, null, 2),
    );

    console.log('\n=== POST /usuarios ===');
    const userRes = await axios.post(`${base}/usuarios`, {
      nome: 'Smoke Usuario',
      email: `smoke_${Date.now()}@example.com`,
      senha: 'senha123',
      tipo: 'user',
    });
    console.log(
      JSON.stringify({ status: userRes.status, data: userRes.data }, null, 2),
    );

    console.log('\n=== RUN scripts/check-db.js ===');
    const out = execFileSync(process.execPath, ['scripts/check-db.js'], {
      encoding: 'utf8',
    });
    console.log(out);
  } catch (err) {
    if (err.response) {
      console.error('Request failed:', err.response.status, err.response.data);
    } else {
      console.error('Smoke test failed:', err.message || String(err));
    }
    process.exitCode = 1;
  }
}

run();
