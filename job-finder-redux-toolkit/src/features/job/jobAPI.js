import axios from "../../utils/axios.js";

export const getJob = async (id) => {
  const response = await axios.get(`/jobs/${id}`);

  return response.data;
};
