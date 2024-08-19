import api from "@/apiConfig/api";

export const getStudentInfo = async () => {
  return await api.get("/me");
};
