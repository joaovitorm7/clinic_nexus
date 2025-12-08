import {
  validarSenhaNumerica,
  validarTamanhoSenha,
  validarSenha,
} from './validators';

describe('validarSenhaNumerica', () => {
  it('deve aceitar senha apenas com números', () => {
    expect(validarSenhaNumerica('123456')).toBe(true);
    expect(validarSenhaNumerica('000000')).toBe(true);
    expect(validarSenhaNumerica('987654321')).toBe(true);
  });

  it('deve rejeitar senha com letras', () => {
    expect(validarSenhaNumerica('abc123')).toBe(false);
    expect(validarSenhaNumerica('12a456')).toBe(false);
    expect(validarSenhaNumerica('senha123')).toBe(false);
  });

  it('deve rejeitar senha com caracteres especiais', () => {
    expect(validarSenhaNumerica('123@456')).toBe(false);
    expect(validarSenhaNumerica('12-34-56')).toBe(false);
    expect(validarSenhaNumerica('123 456')).toBe(false);
  });

  it('deve rejeitar senha vazia', () => {
    expect(validarSenhaNumerica('')).toBe(false);
    expect(validarSenhaNumerica(null)).toBe(false);
    expect(validarSenhaNumerica(undefined)).toBe(false);
  });
});

describe('validarTamanhoSenha', () => {
  it('deve aceitar senha com tamanho mínimo padrão (6)', () => {
    expect(validarTamanhoSenha('123456')).toBe(true);
    expect(validarTamanhoSenha('1234567')).toBe(true);
  });

  it('deve rejeitar senha menor que o tamanho mínimo', () => {
    expect(validarTamanhoSenha('12345')).toBe(false);
    expect(validarTamanhoSenha('123')).toBe(false);
  });

  it('deve aceitar tamanho mínimo personalizado', () => {
    expect(validarTamanhoSenha('1234', 4)).toBe(true);
    expect(validarTamanhoSenha('12345678', 8)).toBe(true);
  });

  it('deve rejeitar senha menor que tamanho mínimo personalizado', () => {
    expect(validarTamanhoSenha('123', 4)).toBe(false);
    expect(validarTamanhoSenha('1234567', 8)).toBe(false);
  });
});

describe('validarSenha', () => {
  it('deve validar senha numérica com tamanho adequado', () => {
    expect(validarSenha('123456')).toBe(true);
    expect(validarSenha('1234567890')).toBe(true);
  });

  it('deve rejeitar senha numérica mas muito curta', () => {
    expect(validarSenha('12345')).toBe(false);
    expect(validarSenha('123')).toBe(false);
  });

  it('deve rejeitar senha com tamanho ok mas não numérica', () => {
    expect(validarSenha('abc123')).toBe(false);
    expect(validarSenha('senha@123')).toBe(false);
  });

  it('deve aceitar tamanho mínimo personalizado', () => {
    expect(validarSenha('1234', 4)).toBe(true);
    expect(validarSenha('123', 4)).toBe(false);
  });
});
