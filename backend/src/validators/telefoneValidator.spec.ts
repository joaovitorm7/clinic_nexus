import { validarTelefone } from './validators';

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
