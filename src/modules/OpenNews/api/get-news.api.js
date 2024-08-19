import api from "@/apiConfig/api";

export const getMarsNews = async () => {
  return await api.get(`/news/`);
};
