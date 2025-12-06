// Validadores centralizados no backend

export function validarCPF(cpf: string): boolean {
  if (!cpf) return false;

  const cpfLimpo = cpf.replace(/\D/g, '');

  if (cpfLimpo.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo[i]) * (10 - i);
  }

  let digito1 = 11 - (soma % 11);
  digito1 = digito1 > 9 ? 0 : digito1;

  if (parseInt(cpfLimpo[9]) !== digito1) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo[i]) * (11 - i);
  }

  let digito2 = 11 - (soma % 11);
  digito2 = digito2 > 9 ? 0 : digito2;

  return parseInt(cpfLimpo[10]) === digito2;
}

export function validarEmail(email: string): boolean {
  if (!email) return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const arrobas = (email.match(/@/g) || []).length;

  return regex.test(email) && arrobas === 1;
}

export function validarTelefone(telefone: string): boolean {
  if (!telefone) return false;

  const apenasNumeros = telefone.replace(/\D/g, '');
  return apenasNumeros.length >= 10 && apenasNumeros.length <= 11;
}

export function validarSenhaNumerica(senha: string): boolean {
  if (!senha) return false;
  return /^\d+$/.test(senha);
}

export function validarTamanhoSenha(senha: string, minimo = 6): boolean {
  if (!senha) return false;
  return senha.length >= minimo;
}

export function validarSenha(senha: string, minimo = 6): boolean {
  return validarSenhaNumerica(senha) && validarTamanhoSenha(senha, minimo);
}

export function validarCargo(cargo: string): boolean {
  const cargosValidos = [
    'médico',
    'enfermeiro',
    'recepcionista',
    'técnico de enfermagem',
    'farmacêutico',
    'fisioterapeuta',
    'psicólogo',
    'nutricionista',
    'administrador',
  ];

  if (!cargo) return false;

  return cargosValidos.includes(cargo.toLowerCase().trim());
}

export function obterCargosValidos(): string[] {
  return [
    'Médico',
    'Enfermeiro',
    'Recepcionista',
    'Técnico de Enfermagem',
    'Farmacêutico',
    'Fisioterapeuta',
    'Psicólogo',
    'Nutricionista',
    'Administrador',
  ];
}

export function validarEspecializacao(
  especializacao: string,
  obrigatorio = false,
): boolean {
  const especializacoesValidas = [
    'cardiologia',
    'dermatologia',
    'ortopedia',
    'pediatria',
    'ginecologia',
    'clínica geral',
  ];

  if (!especializacao || !especializacao.toString().trim()) {
    return !obrigatorio;
  }

  return especializacoesValidas.includes(especializacao.toLowerCase().trim());
}

export function obterEspecializacoes(): string[] {
  return [
    'Cardiologia',
    'Dermatologia',
    'Ortopedia',
    'Pediatria',
    'Ginecologia',
    'Clínica Geral',
  ];
}
