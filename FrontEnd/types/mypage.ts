export interface UserProfile {
  userId: number;
  nickname: string;
  region: string;
  age: number;
  gender: string;
  profileImageType: string;
  genre: IGenreData[];
}

export interface UserProfileProps {
  userProfile: UserProfile;
}
