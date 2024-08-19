// import api from "@/apiConfig/api";
import axios from "axios";

export const getLocalTime = async () => {
  return await axios.get("https://test.api.marsit.uz/now/datetime");
};
