import { createDatabase } from "typeorm-extension";
import { AppDataSource } from "../data-source";

async function main() {
  await createDatabase({
    ifNotExist: true,
    options: AppDataSource.options,
  });

  console.log("Database criada com sucesso!");
}

main();
