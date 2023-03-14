interface dummy {
  num: number;
}
interface ISliderData {
  label: string;
  themes: IThemeData[];
}
interface IThemeData {
  themeId: int;
  title: stirng;
  imgUrl: string;
}
interface IUserInfo {
  profileImageType: int; // 프로필 이미지 타입
  nickname: string; // 닉네임
  genreId: int; // 선호 장르 id
  regionBig: string; // 선호 지역(대분류)
  age: int; // 나이
  gender: string; // 성별
}

interface ProfileProps {
  userInfo: IUserInfo;
  changeUserInfo: (key: string, value: string | number | number[]) => void;
}

interface GroupSetUer {
  profileImageType: number;
  nickname: string;
}
