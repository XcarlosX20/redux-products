export const formatAmount = (amount, currency) => {
    return `${currency} ` + amount.toFixed(2);
} 