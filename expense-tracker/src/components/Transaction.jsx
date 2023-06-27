import editIcon from "../assets/images/edit.svg";
import deleteIcon from "../assets/images/delete.svg";
import thousandSeperator from "../utils/thousandSeperator";
import {
  deleteTransactionAsync,
  editTransaction,
} from "../redux/features/transactionsSlice";
import { useDispatch } from "react-redux";

const Transaction = ({ transaction = {} }) => {
  const dispatch = useDispatch();
  const { id, name, type, amount } = transaction;

  const handleEdit = () => {
    dispatch(editTransaction(transaction));
  };

  const handleDelete = () => {
    dispatch(deleteTransactionAsync(id));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {thousandSeperator(amount)}</p>
        <button className="link">
          <img className="icon" src={editIcon} onClick={handleEdit} />
        </button>
        <button className="link">
          <img className="icon" src={deleteIcon} onClick={handleDelete} />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
