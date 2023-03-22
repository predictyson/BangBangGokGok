import instance from "./api";
import { IUserInfo, IAdditionalInfo } from "types/auth";

const URL = import.meta.env.VITE_SERVER_DOMAIN;

/**
 * @param email
 * @returns {boolean}
 * @comment 이메일 유효성 체크
 */
export const emailValidCheck = (email: string) => {
  const reg = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@(?:\w+\.)+\w+$/;
  return reg.test(email);
};

// 로그인
export const requestLogin = async (user: IUserInfo) => {
  const userData: IUserInfo = {
    email: user.email,
    password: user.password,
  };

  return await instance.post(`${URL}/user/login`, userData);
};

// 로컬 회원가입
export const requestSignUp = async (user: IUserInfo) => {
  const userData: IUserInfo = {
    email: user.email,
    password: user.password,
  };

  console.log(userData);

  return await instance.post(`${URL}/user/join`, userData);
};

// 추가 정보 입력
export const requestAdditional = async (user: IAdditionalInfo) => {
  const additionalData: IAdditionalInfo = {
    userId: user.userId,
    nickname: user.nickname,
    genreId: user.genreId,
    regionBig: user.regionBig,
    regionSmall: user.regionSmall,
    age: user.age,
    gender: user.gender,
    profileImageType: user.profileImageType,
  };

  console.log(additionalData);

  return await instance.post(`${URL}/user/join/additional`, additionalData);
};

// 이메일 코드 전송
export const requestSendEmail = async (email: string) => {
  return await instance.get(`${URL}/user/send/email/${email}`);
};

// 이메일 인증 코드 확인
export const requestCheckCode = async (email: string, code: string) => {
  return await instance.get(`${URL}/user/check/emailCode/${email}/${code}`);
};
