export function removeAcentos (string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function arrayComputado (arrayCompleto, pagina, qntElementos) {
  const arrayListado = arrayCompleto.slice(
    (pagina - 1) * qntElementos, pagina * qntElementos
  )

  return arrayListado
}
