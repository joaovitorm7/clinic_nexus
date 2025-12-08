import { validarCargo, obterCargosValidos } from './validators';

describe('validarCargo', () => {
  it('deve aceitar cargos válidos', () => {
    expect(validarCargo('Médico')).toBe(true);
    expect(validarCargo('Enfermeiro')).toBe(true);
    expect(validarCargo('Recepcionista')).toBe(true);
    expect(validarCargo('Técnico de Enfermagem')).toBe(true);
    expect(validarCargo('Farmacêutico')).toBe(true);
    expect(validarCargo('Fisioterapeuta')).toBe(true);
    expect(validarCargo('Psicólogo')).toBe(true);
    expect(validarCargo('Nutricionista')).toBe(true);
    expect(validarCargo('Administrador')).toBe(true);
  });

  it('deve aceitar cargos válidos em minúsculas', () => {
    expect(validarCargo('médico')).toBe(true);
    expect(validarCargo('enfermeiro')).toBe(true);
    expect(validarCargo('recepcionista')).toBe(true);
  });

  it('deve aceitar cargos válidos em maiúsculas', () => {
    expect(validarCargo('MÉDICO')).toBe(true);
    expect(validarCargo('ENFERMEIRO')).toBe(true);
  });

  it('deve aceitar cargos com espaços extras', () => {
    expect(validarCargo('  Médico  ')).toBe(true);
    expect(validarCargo(' Enfermeiro ')).toBe(true);
  });

  it('deve rejeitar cargos inválidos', () => {
    expect(validarCargo('Contador')).toBe(false);
    expect(validarCargo('Gerente')).toBe(false);
    expect(validarCargo('Desenvolvedor')).toBe(false);
  });

  it('deve rejeitar cargo vazio', () => {
    expect(validarCargo('')).toBe(false);
    expect(validarCargo('   ')).toBe(false);
    expect(validarCargo(null)).toBe(false);
    expect(validarCargo(undefined)).toBe(false);
  });
});

describe('obterCargosValidos', () => {
  it('deve retornar lista de cargos válidos', () => {
    const cargos = obterCargosValidos();
    expect(Array.isArray(cargos)).toBe(true);
    expect(cargos.length).toBeGreaterThan(0);
    expect(cargos).toContain('Médico');
    expect(cargos).toContain('Enfermeiro');
  });

  it('deve retornar cópia da lista (não referência)', () => {
    const cargos1 = obterCargosValidos();
    const cargos2 = obterCargosValidos();
    expect(cargos1).not.toBe(cargos2);
    expect(cargos1).toEqual(cargos2);
  });
});
