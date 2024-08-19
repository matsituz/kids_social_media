import api from "@/apiConfig/api";

export const postQuizAnswer = async (
  task_id,
  question_id,
  question_option_id,
  quiz_id,
  answer_id
) => {
  return await api.post(`/quizes/quiz-answer`, {
    course_element_id: task_id,
    question_id,
    question_option_id,
    quiz_id,
    student_option_choice_id: answer_id,
  });
};
