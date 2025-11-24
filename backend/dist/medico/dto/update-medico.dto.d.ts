import { CreateMedicoDto } from './create-medico.dto';
declare const UpdateMedicoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMedicoDto>>;
export declare class UpdateMedicoDto extends UpdateMedicoDto_base {
    crm?: string;
    especialidadeId?: number;
}
export {};
