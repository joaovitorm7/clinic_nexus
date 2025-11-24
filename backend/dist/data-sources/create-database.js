"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const data_source_1 = require("../data-source");
async function main() {
    await (0, typeorm_extension_1.createDatabase)({
        ifNotExist: true,
        options: data_source_1.AppDataSource.options,
    });
    console.log("Database criada com sucesso!");
}
main();
//# sourceMappingURL=create-database.js.map