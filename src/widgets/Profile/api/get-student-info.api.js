import api from "@/apiConfig/api";

export const getStudentInfo = async () => {
  try {
    return await api.get("/me");
  } catch (error) {
    console.log("/me :" + error);
  }
};