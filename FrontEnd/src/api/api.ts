import axios from "axios";
import { requestToken } from "./auth";

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
    config.headers["Authorization"] = `Bearer ${getCookie("access")}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (config) {
    return config;
  },
  async function (error) {
    // HTTP 응답 에러발생 => accessToekn 만료
    if (error.response.status === 401 || error.response.status === 403) {
      try {
        const response = await requestToken(
          getCookie("access"),
          getCookie("refresh")
        );
        // 새로운 access token 받아옴
        const newAccessToken = response.data.accessToken;
        // 쿠키에 새로운 access token을 저장
        document.cookie = `access=${newAccessToken}`;
        // 기존 요청 재요청 (config의 headers.Authorization 업데이트)
        const config = error.config;
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(config);
      } catch (e) {
        // TODO: requestToken API 호출도 실패하면 로그인 페이지로 이동하거나, 다시 로그인 요청을 하도록 처리
        console.error(e);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

/**
 * 쿠키에서 원하는 key로 value 반환하는 함수
 * @param name cookie의 key
 * @returns 해당 key의 value
 */
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
