// Импортируем библиотеку Axios
import axios from "axios";
import store from "@/store";

const apiUrl = process.env.VUE_APP_API_URL;

// Создаем экземпляр Axios
const api = axios.create({
  baseURL: apiUrl,
});

// const vueStore = store;

// Добавляем перехватчики запросов и ответов
api.interceptors.request.use(
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

api.interceptors.response.use(
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

export default api;
