import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsAsync } from "../redux/features/transactionsSlice";
import Transaction from "./Transaction";

const Transactions = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, errMsg, transactions } = useSelector(
    (state) => state.transactions
  );

  // render all the transactions
  useEffect(() => {
    dispatch(getTransactionsAsync());
  }, [dispatch]);

  // what to render
  let content = null;

  if (isLoading) content = <p className="message">Loading...</p>;
  if (!isLoading && isError)
    content = <p className="message errorMsg">404 - Transactions Not Found!</p>;
  if (!isLoading && !isError && transactions?.length === 0)
    content = <p className="message">There is no transaction available.</p>;
  if (!isLoading && !isError && transactions?.length)
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
