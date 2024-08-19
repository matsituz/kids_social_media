import api from "@/apiConfig/api";

export const buyProducts = async (product_id) => {
  return api.post(`/shop/buy/${product_id}`, {
    product_id: product_id,
  });
};
