import api from "@/apiConfig/api";

export const getQuiz = async (id) => {
  return await api.get(`/quizes/${id}`).then((res) => res.data);
};

export const getQuizInfo = async (id) => {
  return await api.get(`/course_elements/${id}`).then((res) => {
    return res.data.quizes[0];
  });
};
