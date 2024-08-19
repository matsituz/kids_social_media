import apiV2 from "@/apiConfig/apiV2";

export const postComment = async(data) => {
    return await apiV2.post('blogs/posts/comment', data)
}