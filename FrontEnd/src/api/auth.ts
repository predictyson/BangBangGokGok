import instance from "./api";
import { IUserInfo, IAdditionalInfo } from "types/auth";
import { AxiosResponse } from "axios";
import { CheckLoginUserResponse } from "types/auth";

export const tempRequest = () => {
  return instance.get(`/jwt`, { withCredentials: true });
};

/**
 * @param email 유효성 체크하고싶은 이메일
 * @returns {boolean}
 * @comment 이메일 유효성 체크
 */
export const emailValidCheck = (email: string) => {
  const reg = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@(?:\w+\.)+\w+$/;
  return reg.test(email);
};

/**
 * @param password 유효성 체크하고싶은 비밀번호
 * @returns {boolean}
 * @comment 비밀번호 유효성 체크
 */
export const passwordValidCheck = (password: string) => {
  const reg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()\\-_=+])[A-Za-z\d~!@#$%^&*()\\-_=+]{8,16}$/;
  return reg.test(password);
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

// 이메일 중복 검사
export const requestNickname = async (nickname: string) => {
  return await instance.get(`/user/check/nickname/${nickname}`);
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

// 소셜 로그인 이후 회원 정보 조회
export const requestUserInfo = () => {
  // 로그인 이후기때문에 토큰에 헤더가 실려서 가겠죠? 쉽죠?
  return instance.get(`/user/oauth/login`);
};

/**
 * JWT 토큰 재발급
 * @param accessToken
 * @param refreshToken
 * @returns refreshToken을 바탕으로 NEW accessToken 반환
 */
export const requestToken = (
  accessToken: string | null,
  refreshToken: string | null
) => {
  const tokens = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  return instance.post(`/user/reissue`, tokens);
};

// 로그인 정보 검증
export const requestCheckLoginUser = async (
  userId: number
): Promise<AxiosResponse<CheckLoginUserResponse>> => {
  return await instance.get(`/user/check/login/${userId}`);
};

// 이메일 중복 검사 및 인증 코드 전송
export const requestJoinCheck = async (email: string) => {
  return await instance.get(`/user/join/check/${email}`);
};
