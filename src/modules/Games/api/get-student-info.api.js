import api from "@/apiConfig/api";

export const getMyInfo = async () => {
  return await api.get("/me");
};
