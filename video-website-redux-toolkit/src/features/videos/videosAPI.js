import axios from "../../utils/axios";

export const getVideos = async (tags, searchStr) => {
  let queryStr = "";

  if (tags.length) queryStr += tags.map((tag) => `tags_like=${tag}`).join("&");

  if (searchStr) queryStr += `&q=${searchStr}`;

  console.log(queryStr);

  const response = await axios.get(`/videos?${queryStr}`);

  return response.data;
};
