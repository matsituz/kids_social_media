import apiV2 from "@/apiConfig/apiV2";

export const postLike = async(data) => {
    return await apiV2.post("/blogs/posts/reaction", data)
}