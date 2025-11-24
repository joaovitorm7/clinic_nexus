"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedEspecialidades1763236277844 = void 0;
class SeedEspecialidades1763236277844 {
    async up(queryRunner) {
        await queryRunner.query(`
            INSERT INTO Especialidade (nome) VALUES
            ('Cardiologia'),
            ('Dermatologia'),
            ('Pediatria'),
            ('Ortopedia');
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DELETE FROM Especialidade
            WHERE nome IN ('Cardiologia','Dermatologia','Pediatria','Ortopedia');
        `);
    }
}
exports.SeedEspecialidades1763236277844 = SeedEspecialidades1763236277844;
//# sourceMappingURL=1763236277843-seedEspecialidades.js.map