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
exports.AgendamentoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agendamento_entity_1 = require("./entities/agendamento.entity");
let AgendamentoService = class AgendamentoService {
    constructor(agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }
    async create(dto) {
        const agendamento = this.agendamentoRepository.create({
            ...dto,
            paciente: dto.id_paciente ? { id: dto.id_paciente } : null
        });
        return await this.agendamentoRepository.save(agendamento);
    }
    async findAll() {
        return this.agendamentoRepository.find({
            relations: ['paciente'],
        });
    }
    async findOne(id) {
        return this.agendamentoRepository.findOne({
            where: { id },
            relations: ['paciente'],
        });
    }
    async remove(id) {
        await this.agendamentoRepository.delete(id);
    }
};
exports.AgendamentoService = AgendamentoService;
exports.AgendamentoService = AgendamentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agendamento_entity_1.Agendamento)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AgendamentoService);
//# sourceMappingURL=agendamento.service.js.map