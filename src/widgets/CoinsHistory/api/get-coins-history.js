import apiV2 from "@/apiConfig/apiV2";

export const getCoinsHistory = async(from_date, till_date) => {
    return await apiV2.get("/coins/student/history", {
        params: {
            from_date,
            till_date
        }
    })
}