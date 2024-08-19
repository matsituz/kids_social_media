import api from "@/apiConfig/api";

export const getRatings = async (filter, from, till) => {
  try {
    const { data: response } = await api.get(`/coins/student/ratings`, {
      params: {
        filter: filter,
        from_date: from,
        till_date: till,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};
