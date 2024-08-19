import api from "@/apiConfig/api"

export const getStudents = async (student_id) => {
    return await api.get('me/students/fellow/profile', {
        params: {
            student_id
        }
    })
}