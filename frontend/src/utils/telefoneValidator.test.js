import { describe, it, expect } from 'vitest';
import { validarTelefone, formatarTelefone } from './telefoneValidator';

describe('validarTelefone', () => {
  it('deve validar telefone fixo (10 dígitos)', () => {
    expect(validarTelefone('1133334444')).toBe(true);
    expect(validarTelefone('(11) 3333-4444')).toBe(true);
  });

  it('deve validar telefone celular (11 dígitos)', () => {
    expect(validarTelefone('11999998888')).toBe(true);
    expect(validarTelefone('(11) 99999-8888')).toBe(true);
  });

  it('deve rejeitar telefone com menos de 10 dígitos', () => {
    expect(validarTelefone('119999888')).toBe(false);
    expect(validarTelefone('(11) 9999-888')).toBe(false);
  });

  it('deve rejeitar telefone com mais de 11 dígitos', () => {
    expect(validarTelefone('119999888877')).toBe(false);
  });

  it('deve rejeitar telefone vazio', () => {
    expect(validarTelefone('')).toBe(false);
  });
});

describe('formatarTelefone', () => {
  it('deve formatar telefone fixo (10 dígitos)', () => {
    expect(formatarTelefone('1133334444')).toBe('(11) 3333-4444');
  });

  it('deve formatar telefone celular (11 dígitos)', () => {
    expect(formatarTelefone('11999998888')).toBe('(11) 99999-8888');
  });

  it('deve remover caracteres não numéricos e reformatar', () => {
    expect(formatarTelefone('(11)abc99999-8888')).toBe('(11) 99999-8888');
  });

  it('deve limitar a 11 dígitos', () => {
    expect(formatarTelefone('11999998888777')).toBe('(11) 99999-8888');
  });

  it('deve formatar parcialmente enquanto digita', () => {
    expect(formatarTelefone('11')).toBe('(11) ');
    expect(formatarTelefone('119')).toBe('(11) 9');
    expect(formatarTelefone('11999')).toBe('(11) 999');
    expect(formatarTelefone('1199999')).toBe('(11) 99999');
    expect(formatarTelefone('119999988')).toBe('(11) 99999-88');
  });
});
