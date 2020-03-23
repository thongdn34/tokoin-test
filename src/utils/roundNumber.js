export const round = (number, decimals = 2) => {
  return +(Math.round(number + 'e+' + decimals) + 'e-' + decimals)
}
