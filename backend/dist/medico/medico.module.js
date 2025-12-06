"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const medico_service_1 = require("./medico.service");
const medico_controller_1 = require("./medico.controller");
const medico_entity_1 = require("./entities/medico.entity");
const especialidade_entity_1 = require("./entities/especialidade.entity");
const funcionarios_module_1 = require("../funcionarios/funcionarios.module");
const funcionario_entity_1 = require("../funcionarios/entities/funcionario.entity");
const especialidade_service_1 = require("./especialidade.service");
const medico_controller_2 = require("./medico.controller");
let MedicoModule = class MedicoModule {
};
exports.MedicoModule = MedicoModule;
exports.MedicoModule = MedicoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([medico_entity_1.Medico, especialidade_entity_1.Especialidade, funcionario_entity_1.Funcionario]),
            funcionarios_module_1.FuncionariosModule,
        ],
        controllers: [medico_controller_1.MedicoController, medico_controller_2.EspecialidadeController],
        providers: [medico_service_1.MedicoService, especialidade_service_1.EspecialidadeService],
        exports: [medico_service_1.MedicoService],
    })
], MedicoModule);
//# sourceMappingURL=medico.module.js.map