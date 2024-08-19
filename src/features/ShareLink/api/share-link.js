import apiV2 from "@/apiConfig/apiV2";

export const shareLink = async () => {
  return await apiV2.post("users/share_referral_link");
};
