import apiV2 from "@/apiConfig/apiV2";

export const postOfferta = async(data) => {
    return await apiV2.post('/company/term_and_condition', data)
}