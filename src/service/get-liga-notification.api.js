import api from "@/apiConfig/api";

export const getLigaNotification = async () => {
  return await api.get(`/courses/winner_liga`);
};
