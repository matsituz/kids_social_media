import api from "@/apiConfig/api";

export const TaskPost = async (file, element_id, link, comments, group_id) => {
  return await api.post(
    `/course_elements/${element_id}/answer/${group_id}`,
    file,
    {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=" +
          Math.random().toString().substring(2),
      },
      params: {
        link,
        comments,
      },
    }
  );
};
