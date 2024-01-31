export const toUSD = (amount: number, tokenPrice: string) => {
  const price = amount * +tokenPrice

  if (price > 0.01) {
    return '$' + parseFloat(price.toFixed(2)).toLocaleString()
  } else {
    return '<$0.01'
  }
}
