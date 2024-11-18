const formatPrice = (value: string): string => {
  if (!value) return 'R$ 0,00';
  const numero = Number(value.replace(',', '.'));
  return `R$ ${numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
};

export { formatPrice }