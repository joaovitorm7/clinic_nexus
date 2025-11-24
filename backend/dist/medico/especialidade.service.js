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
exports.EspecialidadeService = void 0;
const especialidade_entity_1 = require("./entities/especialidade.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EspecialidadeService = class EspecialidadeService {
    constructor(especialidadeRepository) {
        this.especialidadeRepository = especialidadeRepository;
    }
    async create(createEspecialidadeDto) {
        const exists = await this.especialidadeRepository.findOne({
            where: { nome: createEspecialidadeDto.nome },
        });
        if (exists) {
            throw new common_1.ConflictException(`Especialidade '${createEspecialidadeDto.nome}' já existe`);
        }
        const especialidade = this.especialidadeRepository.create(createEspecialidadeDto);
        return this.especialidadeRepository.save(especialidade);
    }
    findAll() {
        return this.especialidadeRepository.find();
    }
    async findOne(id) {
        const especialidade = await this.especialidadeRepository.findOne({ where: { id } });
        if (!especialidade) {
            throw new common_1.NotFoundException(`Especialidade com id ${id} não encontrada`);
        }
        return especialidade;
    }
};
exports.EspecialidadeService = EspecialidadeService;
exports.EspecialidadeService = EspecialidadeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(especialidade_entity_1.Especialidade)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EspecialidadeService);
//# sourceMappingURL=especialidade.service.js.map