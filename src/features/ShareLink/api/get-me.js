import api from "@/apiConfig/api";

export const getMe = async () => {
    return await api.get('me')
}