import api from "@/apiConfig/api";
export const getRanks = async () => {
  return await api.get("/xp/rank");
};
