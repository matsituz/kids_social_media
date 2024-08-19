import apiV2 from "@/apiConfig/apiV2";

export const getOfferta = async () => {
    return await apiV2.get('/company/term_and_condition')
}