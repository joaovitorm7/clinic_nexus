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
exports.MedicoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const medico_entity_1 = require("./entities/medico.entity");
const especialidade_entity_1 = require("./entities/especialidade.entity");
const funcionario_entity_1 = require("../funcionarios/entities/funcionario.entity");
let MedicoService = class MedicoService {
    constructor(medicoRepository, especialidadeRepository, funcionarioRepository) {
        this.medicoRepository = medicoRepository;
        this.especialidadeRepository = especialidadeRepository;
        this.funcionarioRepository = funcionarioRepository;
    }
    async create(createMedicoDto) {
        const funcionario = await this.funcionarioRepository.findOne({
            where: { id: createMedicoDto.funcionarioId }
        });
        if (!funcionario) {
            throw new common_1.BadRequestException('Funcionário inválido ou não encontrado');
        }
        const especialidade = await this.especialidadeRepository.findOne({
            where: { id: createMedicoDto.especialidadeId }
        });
        if (!especialidade) {
            throw new common_1.BadRequestException('Especialidade inválida');
        }
        const medico = this.medicoRepository.create({
            funcionario,
            crm: createMedicoDto.crm,
            especialidade,
        });
        return this.medicoRepository.save(medico);
    }
    findAll() {
        return this.medicoRepository.find({
            relations: ['especialidade', 'funcionario'],
        });
    }
    async findOne(id) {
        const medico = await this.medicoRepository.findOne({
            where: { id },
            relations: ['especialidade', 'funcionario'],
        });
        if (!medico) {
            throw new common_1.NotFoundException(`Médico com id ${id} não encontrado`);
        }
        return medico;
    }
    async findByEspecialidadeId(especialidadeId) {
        return this.medicoRepository.find({
            where: { especialidade: { id: especialidadeId } },
            relations: ['especialidade', 'funcionario'],
        });
    }
    async update(id, updateMedicoDto) {
        const medico = await this.findOne(id);
        if (updateMedicoDto.especialidadeId) {
            const especialidade = await this.especialidadeRepository.findOne({
                where: { id: updateMedicoDto.especialidadeId },
            });
            if (!especialidade) {
                throw new common_1.BadRequestException('Especialidade inválida');
            }
            medico.especialidade = especialidade;
        }
        Object.assign(medico, updateMedicoDto);
        return this.medicoRepository.save(medico);
    }
    async remove(id) {
        const medico = await this.findOne(id);
        return this.medicoRepository.remove(medico);
    }
};
exports.MedicoService = MedicoService;
exports.MedicoService = MedicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medico_entity_1.Medico)),
    __param(1, (0, typeorm_1.InjectRepository)(especialidade_entity_1.Especialidade)),
    __param(2, (0, typeorm_1.InjectRepository)(funcionario_entity_1.Funcionario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MedicoService);
//# sourceMappingURL=medico.service.js.map