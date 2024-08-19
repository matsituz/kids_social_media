import apiV2 from "@/apiConfig/apiV2";

export const postPhone = async (data) => {
  return await apiV2.post("student/add_phone", data);
};
