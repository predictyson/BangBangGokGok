export interface ProfileProps {
  userAdditionalInfo: IAdditionalInfo;
  changeUserInfo: (key: string, value: string | number | number[]) => void;
}

export interface IUserInfo {
  email: string; // 이메일
  password: string; // 비밀번호
}

export interface IAdditionalInfo {
  userId: number; // 유저 고유 아이디
  nickname: string; // 닉네임
  genreId: number[]; // 선호 장르 id
  regionBig: string; // 선호 지역(대분류)
  regionSmall: string; // 선호 지역(대분류)
  age: number; // 나이
  gender: string; // 성별
  profileImageType: string; // 프로필 이미지 타입
}
