import apiV2 from "@/apiConfig/apiV2";

export const generateLink = async () => {
    return await apiV2.post('users/generate_refferal_link')
}