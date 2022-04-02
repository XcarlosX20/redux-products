export const formatAmount = (amount, currency) => {
   let toNumber = Number(amount)
   if(amount <= 0) return 'Free'
   return `${currency} ${toNumber.toFixed(2)}`;
}
export const formatAmountToNumber = (str) => {
   let number = Number(str.substring(1))
   return number
}