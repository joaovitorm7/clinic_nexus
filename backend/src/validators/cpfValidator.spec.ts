import { validarCPF } from './validators';

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
