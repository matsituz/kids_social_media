import api from "@/apiConfig/api";

export const postAvatarImg = async (imgFile, emoji, student_id) => {
  return await api.patch("/me/update_picture", imgFile, {
    params: {
      student_id: student_id,
      emoji: emoji,
    },
  });
};
