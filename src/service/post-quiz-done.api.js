import api from "@/apiConfig/api";

export const postQuizDone = async (quiz_id) => {
  return await api.post(`/quizes/${quiz_id}/result`, {
    quiz_id: quiz_id,
  });
};
