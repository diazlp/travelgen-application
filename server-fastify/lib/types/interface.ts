export interface IUserModel {
  id: number;
  email: string;
  full_name: string;
  password: string;
  role: string;
  is_verified: boolean;
  verification_code: string;
}

export interface IProfileModel {
  id: number;
  user_id: number;
  avatar: string;
  date_of_birth: Date;
  location: string;
  biography: string;
  interests: string[];
}
