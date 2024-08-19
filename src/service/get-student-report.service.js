import api from "@/apiConfig/api";


export const getStudentReport = async (lang) => {
  return await api.get(`/student/report`,{
    params:{
      lang:lang
    }
  });
};
