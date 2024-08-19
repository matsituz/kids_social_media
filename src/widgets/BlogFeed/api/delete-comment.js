import apiV2 from "@/apiConfig/apiV2";

export const deleteCommentById = async (comment_id, is_banned=false) => {
    return await apiV2.delete(`blogs/posts/comments/${comment_id}`, {
        params: {
            is_banned
        }
    })
}