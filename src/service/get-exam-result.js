import api from "@/apiConfig/api";

export const getExamResult = async (group_id) => {
  return await api.get(`/me/total_monthly_exam_results`, {
    params: {
      group_id
    }
  });
};
export const getStudentExamResult = async (group_id, module, student_id) => {
  return await api.get("/courses/student_exam_results", {
    params: {
      student_id: student_id,
      module: module,
      group_id: group_id || localStorage.getItem("group_id"),
    },
  });
};
