import axios from "../../utils/axios";

export const getRelatedPosts = async ({ tags, currentId }) => {
  const limit = 5;
  const queryStr = tags?.length
    ? tags.map((tag) => `tags_like=${tag}`).join("&") +
      `&id_ne=${currentId}&_limit=${limit}`
    : `id_ne=${currentId}&_limit=${limit}`;

  const response = await axios.get(`/blogs?${queryStr}`);

  return response.data;
};
