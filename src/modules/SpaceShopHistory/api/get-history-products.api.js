import api from "@/apiConfig/api";

export const getHistoryProducts = async () => {
  return api.get(`/shop/history`).then((res) => res.data.reverse());
};
