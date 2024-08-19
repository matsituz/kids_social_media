import api from "@/apiConfig/api";

export const getUniqueCode = async (modmeId) => {
  return await api(`/auth/code`, modmeId);
};
