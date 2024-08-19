import api from "@/apiConfig/api";

export const getProducts = async (company_id) => {
  return api
    .get(`/shop/transaction`, {
      params: {
        company_id: company_id,
      },
    })
    .then((res) => res.data);
};
