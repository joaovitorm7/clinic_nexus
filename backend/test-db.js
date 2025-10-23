import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'joao123',
      database: 'clinic_nexus',
    });
    console.log('Conexão com MySQL bem-sucedida!');
    await connection.end();
  } catch (error) {
    console.error('Erro na conexão:', error);
  }
}

testConnection();
