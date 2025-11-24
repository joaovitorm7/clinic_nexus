"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prontuario = void 0;
const typeorm_1 = require("typeorm");
let Prontuario = class Prontuario {
};
exports.Prontuario = Prontuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Prontuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'data_registro' }),
    __metadata("design:type", Date)
], Prontuario.prototype, "dataRegistro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Prontuario.prototype, "diagnostico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Prontuario.prototype, "observacoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'medicamentos_prescritos' }),
    __metadata("design:type", String)
], Prontuario.prototype, "medicamentosPrescritos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Prontuario.prototype, "procedimentos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Prontuario.prototype, "anexos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Prontuario.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Prontuario.prototype, "atualizadoEm", void 0);
exports.Prontuario = Prontuario = __decorate([
    (0, typeorm_1.Entity)('Prontuario')
], Prontuario);
//# sourceMappingURL=prontuario.entity.js.map