export class CreateAgendaDto {
    id_medico: number;
    data: string;
    hora_inicio: string;
    hora_fim: string;
    status?: string;
    observacao?: string;
}
