import api from "@/apiConfig/api";

export const postSignup = async(data, referralCode) => {
    return await api.post(`auth/signup?referral_code=${referralCode}`, data)
}