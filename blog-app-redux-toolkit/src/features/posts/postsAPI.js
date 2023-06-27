import axios from "../../utils/axios";

export const getPosts = async (queryStr) => {
  const response = await axios.get(`/blogs?${queryStr}`);

  return response.data;
};
