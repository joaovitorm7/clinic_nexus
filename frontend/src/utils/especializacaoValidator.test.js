import { describe, it, expect } from 'vitest';
import { validarEspecializacao, obterEspecializacoes } from './especializacaoValidator';

describe('validarEspecializacao', () => {
  it('deve aceitar especializações válidas', () => {
    expect(validarEspecializacao('Cardiologia')).toBe(true);
    expect(validarEspecializacao('Dermatologia')).toBe(true);
    expect(validarEspecializacao('Ortopedia')).toBe(true);
    expect(validarEspecializacao('Pediatria')).toBe(true);
    expect(validarEspecializacao('Ginecologia')).toBe(true);
    expect(validarEspecializacao('Clínica Geral')).toBe(true);
  });

  it('deve aceitar especializações em minúsculas', () => {
    expect(validarEspecializacao('cardiologia')).toBe(true);
    expect(validarEspecializacao('pediatria')).toBe(true);
  });

  it('deve aceitar especializações em maiúsculas', () => {
    expect(validarEspecializacao('CARDIOLOGIA')).toBe(true);
    expect(validarEspecializacao('PEDIATRIA')).toBe(true);
  });

  it('deve aceitar especializações com espaços extras', () => {
    expect(validarEspecializacao('  Cardiologia  ')).toBe(true);
    expect(validarEspecializacao(' Pediatria ')).toBe(true);
  });

  it('deve rejeitar especializações inválidas', () => {
    expect(validarEspecializacao('Veterinária')).toBe(false);
    expect(validarEspecializacao('Odontologia')).toBe(false);
    expect(validarEspecializacao('Especialização Inexistente')).toBe(false);
  });

  it('deve aceitar vazio quando não obrigatório (padrão)', () => {
    expect(validarEspecializacao('')).toBe(true);
    expect(validarEspecializacao('   ')).toBe(true);
    expect(validarEspecializacao(null)).toBe(true);
    expect(validarEspecializacao(undefined)).toBe(true);
  });

  it('deve rejeitar vazio quando obrigatório', () => {
    expect(validarEspecializacao('', true)).toBe(false);
    expect(validarEspecializacao('   ', true)).toBe(false);
    expect(validarEspecializacao(null, true)).toBe(false);
    expect(validarEspecializacao(undefined, true)).toBe(false);
  });

  it('deve validar corretamente quando obrigatório com valor válido', () => {
    expect(validarEspecializacao('Cardiologia', true)).toBe(true);
    expect(validarEspecializacao('Pediatria', true)).toBe(true);
  });
});

describe('obterEspecializacoes', () => {
  it('deve retornar lista de especializações', () => {
    const especializacoes = obterEspecializacoes();
    expect(especializacoes).toBeInstanceOf(Array);
    expect(especializacoes.length).toBeGreaterThan(0);
    expect(especializacoes).toContain('Cardiologia');
    expect(especializacoes).toContain('Pediatria');
  });

  it('deve retornar cópia da lista (não referência)', () => {
    const esp1 = obterEspecializacoes();
    const esp2 = obterEspecializacoes();
    expect(esp1).not.toBe(esp2);
    expect(esp1).toEqual(esp2);
  });
});
