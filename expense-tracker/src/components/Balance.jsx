import { useSelector } from "react-redux";
import thousandSeperator from "../utils/thousandSeperator";

const Balance = () => {
  const { transactions } = useSelector((state) => state.transactions);

  const netBalance = transactions.reduce(
    (initialBalance, transaction) =>
      transaction.type === "income"
        ? initialBalance + transaction.amount
        : initialBalance - transaction.amount,
    0
  );

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>&nbsp;
        <span>{thousandSeperator(netBalance)}</span>
      </h3>
    </div>
  );
};

export default Balance;
