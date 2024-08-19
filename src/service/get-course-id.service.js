import api from "@/apiConfig/api";

export const getCourseId = async () => {
  return await api.get(`/courses`);
};
