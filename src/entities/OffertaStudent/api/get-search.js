import api from "@/apiConfig/api";

export const getSearch = async (external_id) => {
    return await api.get('student/search', {
        params: {
            external_id
        }
    })
}