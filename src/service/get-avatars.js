import api from "@/apiConfig/api";

export const getAvatars = async () => {
    return await api.get("me/avatar_files");
}