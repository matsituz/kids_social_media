import api from "@/apiConfig/api";

export const getExam = async (group_id, module) => {
  return await api.get(`/courses/group_exam`, {
    params: {
      group_id: group_id || localStorage.getItem("group_id"),
      module: module,
    },
  });
};
