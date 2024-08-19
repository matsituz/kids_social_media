import api from "@/apiConfig/api";

export const getNewsDescr = async () => {
  return await api.get(`/news/`);
};
