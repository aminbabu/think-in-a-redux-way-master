import axiox from "../../utils/axios";

export const getVideo = async (id, tags) => {
  let queryStr = "";

  if (tags.length)
    queryStr +=
      tags.map((tag) => `tags_like=${tag}`).join("&") + `&id_ne=${id}`;

  const response = await axiox.get(`/videos?${queryStr}`);

  return response.data;
};
