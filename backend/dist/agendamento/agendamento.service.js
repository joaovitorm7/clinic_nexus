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
const paciente_entity_1 = require("../paciente/entities/paciente.entity");
const medico_entity_1 = require("../medico/entities/medico.entity");
const funcionario_entity_1 = require("../funcionarios/entities/funcionario.entity");
let AgendamentoService = class AgendamentoService {
    constructor(agendamentoRepository, pacienteRepository, medicoRepository, funcionarioRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
        this.funcionarioRepository = funcionarioRepository;
    }
    async create(dto) {
        const agendamento = this.agendamentoRepository.create({
            ...dto,
            paciente: dto.id_paciente ? { id: dto.id_paciente } : null,
            medico: dto.id_medico ? { id: dto.id_medico } : null,
        });
        return await this.agendamentoRepository.save(agendamento);
    }
    findById(id) {
        return this.agendamentoRepository.findOne({
            where: { id },
            relations: ['paciente', 'medico', 'medico.especialidade', 'medico.funcionario'],
        });
    }
    async update(id, dto) {
        const agendamento = await this.agendamentoRepository.findOne({
            where: { id },
            relations: ['paciente', 'medico', 'medico.especialidade'],
        });
        if (!agendamento) {
            throw new common_1.NotFoundException('Agendamento não encontrado');
        }
        const { id_paciente, id_medico, ...rest } = dto;
        if (dto.hasOwnProperty('id_paciente')) {
            if (id_paciente === null) {
                agendamento.paciente = null;
            }
            else {
                const paciente = await this.pacienteRepository.findOne({
                    where: { id: id_paciente },
                });
                if (!paciente)
                    throw new common_1.NotFoundException('Paciente não encontrado');
                agendamento.paciente = paciente;
            }
        }
        if (dto.hasOwnProperty('id_medico')) {
            if (id_medico === null) {
                agendamento.medico = null;
            }
            else {
                const medico = await this.medicoRepository.findOne({
                    where: { id: id_medico },
                });
                if (!medico)
                    throw new common_1.NotFoundException('Médico não encontrado');
                agendamento.medico = medico;
            }
        }
        Object.assign(agendamento, rest);
        return await this.agendamentoRepository.save(agendamento);
    }
    async updateStatus(id, status) {
        const agendamento = await this.agendamentoRepository.findOne({ where: { id } });
        if (!agendamento) {
            throw new common_1.NotFoundException('Agendamento não encontrado');
        }
        agendamento.status = status;
        return this.agendamentoRepository.save(agendamento);
    }
    async findAgendamentosByPacienteId(pacienteId) {
        return this.agendamentoRepository.find({
            where: { paciente: { id: pacienteId } },
            relations: ['paciente'],
        });
    }
    async findAll() {
        return this.agendamentoRepository.find({
            relations: ['paciente', 'medico', 'medico.especialidade', 'medico.funcionario'],
        });
    }
    async findOne(id) {
        return this.agendamentoRepository.findOne({
            where: { id },
            relations: ['paciente', 'medico', 'medico.especialidade'],
        });
    }
    async findByDate(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return this.agendamentoRepository.find({
            where: {
                data: (0, typeorm_2.Between)(startOfDay, endOfDay),
            },
            relations: ['paciente', 'medico', 'medico.especialidade'],
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
    __param(1, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __param(2, (0, typeorm_1.InjectRepository)(medico_entity_1.Medico)),
    __param(3, (0, typeorm_1.InjectRepository)(funcionario_entity_1.Funcionario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AgendamentoService);
//# sourceMappingURL=agendamento.service.js.map