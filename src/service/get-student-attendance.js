import api from "@/apiConfig/api";

export const getStudentAttendance = async (from, till) => {
  try {
    const { data: response } = await api.get(`/attendance/student`, {
      params: {
        from_date: from,
        till_date: till,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
