import axiox from "../../utils/axios";

export const getVideo = async (id) => {
  const response = await axiox.get(`/videos/${id}`);

  return response.data;
};
