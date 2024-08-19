import apiV2 from "@/apiConfig/apiV2";

export const deletePostById = async (post_id) => {
    return await apiV2.delete(`/blogs/posts/${post_id}`);
};
