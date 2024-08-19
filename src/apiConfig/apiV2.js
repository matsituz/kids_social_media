// Импортируем библиотеку Axios
import axios from "axios";
import store from "@/store";

const apiUrl = process.env.VUE_APP_API_URL_V2;

// Создаем экземпляр Axios
const apiV2 = axios.create({
  baseURL: apiUrl,
});

// const vueStore = store;

// Добавляем перехватчики запросов и ответов
apiV2.interceptors.request.use(
  (config) => {
    // Здесь можно выполнить проверку токена и обновить его, если истек
    // Если токен валиден, можно добавить его в заголовки запроса
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiV2.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 403) {
      store.commit("auth/logout");
    }
    if (error?.response?.status.toString().startsWith(5)) {
      alert("Backend error");
      // console.log('backend error');
    }
    // console.log(error);
    return Promise.reject(error);
  }
);

export default apiV2;
