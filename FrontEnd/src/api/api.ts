import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_DOMAIN;
const LOCAL_URL = import.meta.env.VITE_LOCAL_DOMAIN;

const instance = axios.create({
  // withCredentials: true,
  baseURL: SERVER_URL,
});

/** 401 Error : acess token이 만료되어 발생
 * 프론트는 401이 발생할때마다 refresh 보내서 새로운 access 토큰 받아옴과
 * 동시에 api 재요청이 새로운 acess 토큰으로 가야함
 */

// interceptors를 통해
instance.interceptors.request.use(
  function (config) {
    // 요청 바로 직전
    console.log(getCookie("access"));
    config.headers["Authorization"] = `Bearer ${getCookie("access")}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;

function getCookie(name: string): string | null {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
}
