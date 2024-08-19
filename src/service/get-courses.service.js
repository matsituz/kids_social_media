import api from "@/apiConfig/api";

export const getCoursesInfo = async (id, group_id = null) => {
  return await api.get(`/course_elements`, {
    params: {
      course_id: id,
      group_id: group_id,
    },
  });
};

export const getCoursesDetails = async (
  id,
  group_id = localStorage.getItem("group_id")
) => {
  return await api.get(`/course_elements/${id}`, {
    params: {
      element_id: id,
      group_id: group_id,
    },
  });
};

export const getProjects = (course_id) => {
  return api.get(`/me/projects?course_id=${course_id}`);
};
