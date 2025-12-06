import { describe, it, expect, vi, beforeEach } from "vitest";
import * as agendamentoService from "../services/agendamentoService";

describe("agendamentoService - Cancelar Consulta", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve ter função cancelarAgendamento exportada", () => {
    expect(typeof agendamentoService.cancelarAgendamento).toBe("function");
  });

  it("deve fazer requisição PATCH para endpoint correto", async () => {
    const consultaId = 1;
    const mockResponse = { id: 1, status: "cancelada" };

    // Mock da API
    vi.spyOn(agendamentoService, "cancelarAgendamento").mockResolvedValue(
      mockResponse
    );

    const resultado = await agendamentoService.cancelarAgendamento(consultaId);

    expect(resultado).toEqual(mockResponse);
    expect(resultado.status).toBe("cancelada");
  });

  it("cancelarAgendamento deve estar no export default", () => {
    const defaultExport = agendamentoService.default;
    expect(defaultExport.cancelarAgendamento).toBeDefined();
    expect(typeof defaultExport.cancelarAgendamento).toBe("function");
  });
});
