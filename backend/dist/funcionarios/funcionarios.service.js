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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const funcionario_entity_1 = require("./entities/funcionario.entity");
const usuario_entity_1 = require("../usuario/entities/usuario.entity");
const typeorm_2 = require("@nestjs/typeorm");
let FuncionarioService = class FuncionarioService {
    constructor(funcionarioRepo, usuarioRepo) {
        this.funcionarioRepo = funcionarioRepo;
        this.usuarioRepo = usuarioRepo;
    }
    async createFuncionario(data) {
        const usuario = this.usuarioRepo.create({
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            status: 'ativo',
        });
        await this.usuarioRepo.save(usuario);
        const funcionario = this.funcionarioRepo.create({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            cargo: data.cargo,
            usuario,
        });
        return this.funcionarioRepo.save(funcionario);
    }
};
exports.FuncionarioService = FuncionarioService;
exports.FuncionarioService = FuncionarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(funcionario_entity_1.Funcionario)),
    __param(1, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], FuncionarioService);
//# sourceMappingURL=funcionarios.service.js.map