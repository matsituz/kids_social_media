import api from "@/apiConfig/api";

export const TaskPost = async (data) => {
  return await api.post(`/course_elements/answer/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const resendHomework = async (file) => {
  return await api.put(`/course_elements/edit/answer/`, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const readingPostTheory = async (course_element_id, theory_id) => {
  return await api.post(`/theory`, {
    course_element_id,
    theory_id,
  });
};
