import api from "@/apiConfig/api";

export const getNews = async () => {
  return await api.get("/news/");
};
