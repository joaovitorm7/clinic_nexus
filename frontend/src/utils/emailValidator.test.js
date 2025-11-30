import { describe, it, expect } from 'vitest';
import { validarEmail } from './emailValidator';

describe('validarEmail', () => {
  it('deve validar emails válidos', () => {
    expect(validarEmail('usuario@email.com')).toBe(true);
    expect(validarEmail('teste.usuario@email.com.br')).toBe(true);
    expect(validarEmail('contato@empresa.com')).toBe(true);
    expect(validarEmail('user123@domain.co.uk')).toBe(true);
  });

  it('deve rejeitar email sem @', () => {
    expect(validarEmail('emailsemarroba.com')).toBe(false);
  });

  it('deve rejeitar email sem domínio', () => {
    expect(validarEmail('usuario@')).toBe(false);
    expect(validarEmail('usuario@dominio')).toBe(false);
  });

  it('deve rejeitar email sem usuário', () => {
    expect(validarEmail('@dominio.com')).toBe(false);
  });

  it('deve rejeitar email com espaços', () => {
    expect(validarEmail('usuario @email.com')).toBe(false);
    expect(validarEmail('usuario@email .com')).toBe(false);
  });

  it('deve rejeitar email vazio', () => {
    expect(validarEmail('')).toBe(false);
    expect(validarEmail(null)).toBe(false);
    expect(validarEmail(undefined)).toBe(false);
  });

  it('deve rejeitar email com múltiplos @', () => {
    expect(validarEmail('usuario@@email.com')).toBe(false);
    expect(validarEmail('user@name@email.com')).toBe(false);
  });
});
