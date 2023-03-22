interface IToastProps {
  type: "success" | "error" | "info" | "action";
  message?: string;
}

interface GroupSetUer {
  userId: number;
  nickname: string;
  email: string;
  profileImageType: string;
}

interface IGenreData {
  genreId: int; // 장르 id
  category: string; // 장르 종류
}
interface IUserData {
  userId: int; // 유저 id
  nickname: string; // 닉네임
  email: string; // 이메일
  profileImageType: string; // 프로필 이미지 타입
}
