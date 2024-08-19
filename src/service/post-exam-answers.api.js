import api from "@/apiConfig/api";

export const postExamAnswer = async (group_id, theme_id, link, file) => {
  return await api.post(`/courses/student_exam_answer`, file, {
    params: {
      group_id,
      theme_id,
      link,
    },
  });
};
