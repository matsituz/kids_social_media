import api from "@/apiConfig/api";

export const getExamThemes = async (course_id, module) => {
  return await api.get(`/courses/exam_themes`, {
    params: {
      course_id,
      module,
    },
  });
};
