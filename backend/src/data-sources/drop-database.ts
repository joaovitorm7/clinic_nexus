import { dropDatabase } from "typeorm-extension";
import { AppDataSource } from "../data-source"; 

async function main() {
  const dbName = AppDataSource.options.database;
  console.log(`Iniciando a operação para deletar o banco de dados: ${dbName}`);
  
  try {
    await dropDatabase({
      ifExist: true, 
      options: AppDataSource.options,
    });

    console.log(`Database "${dbName}" deletada com sucesso!`);
  } catch (error) {
    console.error(`Falha ao deletar o banco de dados "${dbName}". Verifique se o usuário do DB tem permissão de DROP.`, error);
  }
}

main();