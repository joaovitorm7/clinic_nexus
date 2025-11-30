import { describe, it, expect } from 'vitest';
import { validarCPF, formatarCPF } from './cpfValidator';

describe('validarCPF', () => {
  it('deve validar CPF válido sem formatação', () => {
    expect(validarCPF('11144477735')).toBe(true);
  });

  it('deve validar CPF válido com formatação', () => {
    expect(validarCPF('111.444.777-35')).toBe(true);
  });

  it('deve rejeitar CPF com todos dígitos iguais', () => {
    expect(validarCPF('111.111.111-11')).toBe(false);
    expect(validarCPF('00000000000')).toBe(false);
  });

  it('deve rejeitar CPF com dígito verificador inválido', () => {
    expect(validarCPF('123.456.789-10')).toBe(false);
  });

  it('deve rejeitar CPF com menos de 11 dígitos', () => {
    expect(validarCPF('123.456.789')).toBe(false);
  });

  it('deve rejeitar CPF vazio', () => {
    expect(validarCPF('')).toBe(false);
  });

  it('deve rejeitar CPF com letras', () => {
    expect(validarCPF('abc.def.ghi-jk')).toBe(false);
  });
});

describe('formatarCPF', () => {
  it('deve formatar CPF corretamente', () => {
    expect(formatarCPF('11144477735')).toBe('111.444.777-35');
  });

  it('deve remover caracteres não numéricos e reformatar', () => {
    expect(formatarCPF('111abc444def777ghi35')).toBe('111.444.777-35');
  });

  it('deve limitar a 14 caracteres', () => {
    expect(formatarCPF('111444777351234567')).toBe('111.444.777-35');
  });
});
