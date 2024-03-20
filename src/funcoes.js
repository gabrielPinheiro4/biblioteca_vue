export function removeAcentos (string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function arrayComputado (arrayCompleto, pagina, qntElementos) {
  const arrayListado = arrayCompleto.slice(
    (pagina - 1) * qntElementos, pagina * qntElementos
  )

  return arrayListado
}

export function filtrarNome (array, texto, livro = false) {
  const arrayLivro = array.filter((item) => {
    return item.titulo === texto
  })

  const arrayUsuario = array.filter((item) => {
    return item.nome === texto
  })

  if (livro) {
    return arrayLivro
  }

  return arrayUsuario
}

export function validaCPF (strCPF) {
  let soma
  let resto
  soma = 0
  const cpfsErrados = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ]

  if (cpfsErrados.indexOf(strCPF) !== -1) return false

  for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  resto = (soma * 10) % 11

  if ((resto === 10) || (resto === 11)) resto = 0
  if (resto !== parseInt(strCPF.substring(9, 10))) return false

  soma = 0
  for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  resto = (soma * 10) % 11

  if ((resto === 10) || (resto === 11)) resto = 0
  if (resto !== parseInt(strCPF.substring(10, 11))) return false
  return true
}
