export function validarSenhaNumerica(senha) {
  if (!senha || senha.length === 0) return false;
  
  return /^\d+$/.test(senha);
}

export function validarTamanhoSenha(senha, minLength = 6) {
  return senha && senha.length >= minLength;
}

export function validarSenha(senha, minLength = 6) {
  return validarSenhaNumerica(senha) && validarTamanhoSenha(senha, minLength);
}
