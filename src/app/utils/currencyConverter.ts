

export function converterBRL(value: number) {
  const coin = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return coin
}
