import apiV2 from "@/apiConfig/apiV2";

export const postVerification = async(data) => {
    return await apiV2.post('/auth/verify_phone_number', data)
}