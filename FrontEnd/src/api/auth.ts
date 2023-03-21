import instance from "./api";
import { IUserInfo, IAdditionalInfo } from "types/auth";

const URL = import.meta.env.VITE_SERVER_DOMAIN;

export const requestSignUp = async (user: IUserInfo) => {
  const userData: IUserInfo = {
    email: user.email,
    password: user.password,
  };

  console.log(userData);

  return await instance.post(`${URL}/user/join`, userData);
};

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
