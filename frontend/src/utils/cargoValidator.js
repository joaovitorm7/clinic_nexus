const CARGOS_VALIDOS = [
  'Médico',
  'Enfermeiro',
  'Recepcionista',
  'Técnico de Enfermagem',
  'Farmacêutico',
  'Fisioterapeuta',
  'Psicólogo',
  'Nutricionista',
  'Administrador'
];

export function validarCargo(cargo) {
  if (!cargo || cargo.trim().length === 0) return false;
  
  return CARGOS_VALIDOS.some(
    cargoValido => cargoValido.toLowerCase() === cargo.toLowerCase().trim()
  );
}

export function obterCargosValidos() {
  return [...CARGOS_VALIDOS];
}
