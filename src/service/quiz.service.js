import api from "@/apiConfig/api";

export const getQuiz = async (id) => {
  return await api.get(`/quizes/${id}`);
};

// export const getAnswer = async (id) => {
//   return await axios.get(`${API_URL}/quizes/quiz-answer/${id}`);
// };

export const postQuizAnswer = async (
  // task_id,
  question_id,
  // question_option_id,
  // quiz_id,
  answer_id,
  // group_id
) => {
  return await api.post(`/quizes/answer`, {
    question_id,
    student_option_choice_id: answer_id,
  });
};
