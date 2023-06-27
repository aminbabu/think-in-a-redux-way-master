import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelEditTransaction,
  createTransactionAsync,
  updateTransactionAsync,
} from "../redux/features/transactionsSlice";

const initalTransaction = {
  transaction_name: "",
  transaction_type: "",
  transaction_amount: "",
};

const ExpenseForm = () => {
  const [newTransaction, setNewTransaction] = useState(initalTransaction);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const { editableTransaction } = useSelector((state) => state.transactions);

  const { transaction_name, transaction_type, transaction_amount } =
    newTransaction;

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setNewTransaction((prevTransaction) => {
      return { ...prevTransaction, [name]: value };
    });
  };

  const handleNewTransaction = (e) => {
    e.preventDefault();

    const transaction = {
      name: transaction_name,
      type: transaction_type,
      amount: Number(transaction_amount),
    };

    dispatch(createTransactionAsync(transaction));

    setNewTransaction(initalTransaction);
  };

  const handleEditTransaction = (e) => {
    e.preventDefault();
    const transactionDetails = {
      id: editableTransaction.id,
      transaction: {
        name: transaction_name,
        type: transaction_type,
        amount: Number(transaction_amount),
      },
    };
    dispatch(updateTransactionAsync(transactionDetails));
    setNewTransaction(initalTransaction);
    dispatch(cancelEditTransaction());
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setNewTransaction(initalTransaction);
    dispatch(cancelEditTransaction());
  };

  useEffect(() => {
    const { id, name, type, amount } = editableTransaction || {};

    if (id) {
      setEditMode(true);
      setNewTransaction({
        transaction_name: name,
        transaction_type: type,
        transaction_amount: amount,
      });
    } else {
      setEditMode(false);
      setNewTransaction(initalTransaction);
    }
  }, [editableTransaction]);

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? handleEditTransaction : handleNewTransaction}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="transaction_name"
            id="transaction_name"
            placeholder="My Salary"
            value={transaction_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="transaction_type"
              id="transaction_type-income"
              checked={transaction_type === "income"}
              onChange={handleChange}
              required
            />
            <label htmlFor="transaction_type-income">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="transaction_type"
              id="transaction_type-expense"
              placeholder="Expense"
              checked={transaction_type === "expense"}
              onChange={handleChange}
              required
            />
            <label htmlFor="transaction_type-expense">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="300"
            name="transaction_amount"
            id="transaction_amount"
            value={transaction_amount}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn">
          {editMode ? "Update" : "Add"} Transaction
        </button>

        {editMode && (
          <button className="btn cancel_edit" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
