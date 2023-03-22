import axios from "axios";

const VITE_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const instance = axios.create({
  withCredentials: true,
  baseURL: VITE_SERVER_DOMAIN,
});

// interceptors를 통해
// instance.interceptors.request.use(
//   function (config) {
//     // 요청 바로 직전
//     config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default instance;
