export const toCurrency = (value: number): string =>
  value.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  });
