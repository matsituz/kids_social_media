import api from "@/apiConfig/api";

export const getGroup = async (group_id, all=true) => {
    return await api.get(`groups/${group_id}`, {
        params: {
            all
        }
    })
}