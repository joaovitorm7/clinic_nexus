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
exports.EspecialidadeController = void 0;
const common_1 = require("@nestjs/common");
const create_especialidade_dto_1 = require("../medico/dto/create-especialidade.dto");
const common_2 = require("@nestjs/common");
const especialidade_service_1 = require("./especialidade.service");
let EspecialidadeController = class EspecialidadeController {
    constructor(especialidadeService) {
        this.especialidadeService = especialidadeService;
    }
    create(dto) {
        return this.especialidadeService.create(dto);
    }
    findAll() {
        return this.especialidadeService.findAll();
    }
    findOne(id) {
        return this.especialidadeService.findOne(id);
    }
};
exports.EspecialidadeController = EspecialidadeController;
__decorate([
    (0, common_2.Post)(),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_especialidade_dto_1.CreateEspecialidadeDto]),
    __metadata("design:returntype", void 0)
], EspecialidadeController.prototype, "create", null);
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EspecialidadeController.prototype, "findAll", null);
__decorate([
    (0, common_2.Get)(':id'),
    __param(0, (0, common_2.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EspecialidadeController.prototype, "findOne", null);
exports.EspecialidadeController = EspecialidadeController = __decorate([
    (0, common_1.Controller)('especialidades'),
    __metadata("design:paramtypes", [especialidade_service_1.EspecialidadeService])
], EspecialidadeController);
//# sourceMappingURL=especialidade.controller.js.map