export const formatAmount = (amount, currency) => {
   let toNumber = Number(amount)
   if(toNumber)  return `${currency} ` + toNumber.toFixed(2);
} 