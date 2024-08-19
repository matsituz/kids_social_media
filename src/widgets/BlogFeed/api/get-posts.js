
import apiV2 from "@/apiConfig/apiV2";
export const getPosts = async (fellow_id, page, limits=10) => {
    return await apiV2.get("blogs/posts", {
        params: {
            fellow_id,
            page,
            limits
        }
    })
}