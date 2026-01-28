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
exports.AgendamentoController = void 0;
const common_1 = require("@nestjs/common");
const agendamento_service_1 = require("./agendamento.service");
const create_agendamento_dto_1 = require("./dto/create-agendamento.dto");
const update_agendamento_dto_1 = require("./dto/update-agendamento.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let AgendamentoController = class AgendamentoController {
    constructor(agendamentoService) {
        this.agendamentoService = agendamentoService;
    }
    findMinhasConsultas(req) {
        const funcionarioId = Number(req.user.funcionarioId);
        if (isNaN(funcionarioId)) {
            throw new common_1.BadRequestException('funcionarioId inválido no token');
        }
        return this.agendamentoService.findByMedico(funcionarioId);
    }
    create(dto) {
        return this.agendamentoService.create(dto);
    }
    findAll() {
        return this.agendamentoService.findAll();
    }
    findByDate(data) {
        const date = new Date(data);
        return this.agendamentoService.findByDate(date);
    }
    findOne(id) {
        return this.agendamentoService.findById(id);
    }
    async patch(id, dto) {
        return await this.agendamentoService.update(id, dto);
    }
    remove(id) {
        return this.agendamentoService.remove(id);
    }
    async cancelar(id) {
        return await this.agendamentoService.cancelAgendamento(id);
    }
};
exports.AgendamentoController = AgendamentoController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('minhas-consultas'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AgendamentoController.prototype, "findMinhasConsultas", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agendamento_dto_1.CreateAgendamentoDto]),
    __metadata("design:returntype", void 0)
], AgendamentoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AgendamentoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('data/:data'),
    __param(0, (0, common_1.Param)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AgendamentoController.prototype, "findByDate", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AgendamentoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_agendamento_dto_1.UpdateAgendamentoDto]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AgendamentoController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/cancelar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "cancelar", null);
exports.AgendamentoController = AgendamentoController = __decorate([
    (0, common_1.Controller)('agendamentos'),
    __metadata("design:paramtypes", [agendamento_service_1.AgendamentoService])
], AgendamentoController);
//# sourceMappingURL=agendamento.controller.js.map