import apiV2 from "@/apiConfig/apiV2";

export const getPost = async (post_id) => {
    return await apiV2.get(`/blogs/posts/detail/${post_id}`)
}