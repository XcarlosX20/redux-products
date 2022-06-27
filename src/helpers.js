export const formatAmount = (amount, currency = "$", txt) => {
  let toNumber = Number(amount);
  if (amount <= 0) return "Free";
  if (txt)
    return (
      <p className="format-amount">
        <span>{txt} </span>
        <span>{currency}</span>
        {toNumber.toFixed(2)}
      </p>
    );
  return (
    <p className="format-amount">
      <span>{currency}</span>
      {toNumber.toFixed(2)}
    </p>
  );
};
export const formatAmountToNumber = (str) => {
  let number = Number(str.substring(1));
  return number;
};
