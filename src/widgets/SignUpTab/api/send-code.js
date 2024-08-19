import apiV2 from "@/apiConfig/apiV2";

export const sendCode = async(data) => {
    return await apiV2.post('auth/send_code', data)
}