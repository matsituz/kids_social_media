import apiV2 from "@/apiConfig/apiV2";

export const changePhone = async (data) => {
  return await apiV2.patch("/student/update_phone", data);
};
