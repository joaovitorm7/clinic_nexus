const ESPECIALIZACOES_MEDICAS = [
  'Cardiologia',
  'Dermatologia',
  'Ortopedia',
  'Pediatria',
  'Ginecologia',
  'Neurologia',
  'Psiquiatria',
  'Oftalmologia',
  'Otorrinolaringologia',
  'Urologia',
  'Endocrinologia',
  'Gastroenterologia',
  'Oncologia',
  'Clínica Geral',
  'Cirurgia Geral'
];

export function validarEspecializacao(especializacao, obrigatorio = false) {
  if (!obrigatorio && (!especializacao || especializacao.trim().length === 0)) {
    return true;
  }
  
  if (!especializacao || especializacao.trim().length === 0) return false;
  
  return ESPECIALIZACOES_MEDICAS.some(
    esp => esp.toLowerCase() === especializacao.toLowerCase().trim()
  );
}

export function obterEspecializacoes() {
  return [...ESPECIALIZACOES_MEDICAS];
}
