import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5188",
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError<string>(error) && error.response) {
      console.error("Ошибка с сервера:", error.response.data);
    }
    return Promise.reject(error);
  },
);

export default api;
