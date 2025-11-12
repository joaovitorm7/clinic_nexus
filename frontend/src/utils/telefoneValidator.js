export function validarTelefone(telefone) {
  const cleanTelefone = telefone.replace(/[^\d]/g, '');
  
  return cleanTelefone.length === 10 || cleanTelefone.length === 11;
}

export function formatarTelefone(telefone) {
  const cleanTelefone = telefone.replace(/[^\d]/g, '').slice(0, 11);
  
  if (cleanTelefone.length <= 10) {
    return cleanTelefone
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    return cleanTelefone
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
}
