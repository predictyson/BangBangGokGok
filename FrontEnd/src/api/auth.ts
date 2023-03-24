import instance from "./api";
import { IUserInfo, IAdditionalInfo } from "types/auth";

export const tempRequest = () => {
  return instance.get(`/jwt`, { withCredentials: true });
};

/**
 * @param email
 * @returns {boolean}
 * @comment 이메일 유효성 체크
 */
export const emailValidCheck = (email: string) => {
  const reg = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@(?:\w+\.)+\w+$/;
  return reg.test(email);
};

// 로컬 로그인
export const requestLogin = async (user: IUserInfo) => {
  const userData: IUserInfo = {
    email: user.email,
    password: user.password,
  };
  return await instance.post(`/user/login`, userData);
};

// 로컬 회원가입
export const requestSignUp = async (user: IUserInfo) => {
  const userData: IUserInfo = {
    email: user.email,
    password: user.password,
  };

  console.log(userData);

  return await instance.post(`/user/join`, userData);
};

// 이메일 중복 검사
export const requestEmailCheck = async (email: string) => {
  return await instance.get(`/user/check/email/${email}`);
};

// 추가 정보 입력
export const requestAdditional = async (user: IAdditionalInfo) => {
  const additionalData: IAdditionalInfo = {
    userId: user.userId,
    nickname: user.nickname,
    genreIds: user.genreIds,
    regionBig: user.regionBig,
    regionSmall: user.regionSmall,
    age: user.age,
    gender: user.gender,
    profileImageType: user.profileImageType,
  };

  console.log(additionalData);

  return await instance.post(`/user/join/additional`, additionalData);
};

// 이메일 인증 코드 전송
export const requestSendEmail = async (email: string) => {
  return await instance.get(`/user/send/email/${email}`);
};

// 이메일 인증 코드 확인
export const requestCheckCode = async (email: string, code: string) => {
  return await instance.get(`/user/check/emailCode/${email}/${code}`);
};

// 비밀번호 변경
export const requestChangePassword = async (user: IUserInfo) => {
  return await instance.post(`/user/password`, user);
};

// 장르 목록 조회
export const requestOther = () => {
  return instance.get(`/other/genre`);
};

// 지역 소분류 목록 조회
export const requestSmallRegion = (big: string) => {
  console.log(big);
  return instance.get(`/other/region/${big}`);
};
