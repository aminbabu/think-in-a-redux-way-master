import axios from "../../utils/axios";

export const createTransaction = async (transaction) => {
  const response = await axios.post("/transactions", transaction);

  return response.data;
};

export const getTransactions = async () => {
  const response = await axios.get("/transactions");

  return response.data;
};

export const updateTransaction = async (id, transaction) => {
  const response = await axios.put(`/transactions/${id}`, transaction);

  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);

  return response.data;
};
