export const formatAmount = (amount, currency) => {
   let toNumber = Number(amount)
   if(amount <= 0) return 'Free'
   return `${currency} ${toNumber.toFixed(2)}`;
}