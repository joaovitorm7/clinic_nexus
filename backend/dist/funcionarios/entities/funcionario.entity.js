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
exports.Funcionario = void 0;
const typeorm_1 = require("typeorm");
const medico_entity_1 = require("../../medico/entities/medico.entity");
const class_validator_1 = require("class-validator");
let Funcionario = class Funcionario {
};
exports.Funcionario = Funcionario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Funcionario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Funcionario.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 14, unique: true, nullable: false }),
    __metadata("design:type", String)
], Funcionario.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, nullable: true, unique: true }),
    __metadata("design:type", String)
], Funcionario.prototype, "telefone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true, nullable: false }),
    __metadata("design:type", String)
], Funcionario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Funcionario.prototype, "cargo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Funcionario.prototype, "data_desativacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Funcionario.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => medico_entity_1.Medico, medico => medico.funcionario, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", medico_entity_1.Medico)
], Funcionario.prototype, "medico", void 0);
exports.Funcionario = Funcionario = __decorate([
    (0, typeorm_1.Entity)('Funcionario')
], Funcionario);
//# sourceMappingURL=funcionario.entity.js.map