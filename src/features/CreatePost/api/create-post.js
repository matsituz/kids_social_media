import apiV2 from "@/apiConfig/apiV2";

export const postPost = async (data, description, title, ) => {
    return await apiV2.post('/blogs/posts', data, {
        params: {
            description,
            title,
        }
    })
}