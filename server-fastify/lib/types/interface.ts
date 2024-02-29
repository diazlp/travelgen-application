export interface IUserModel {
  id?: number;
  email: string;
  full_name: string;
  password: string;
  role: string;
  is_verified: boolean;
  verification_code: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IProfileModel {
  id?: number;
  user_id: number;
  avatar: string;
  date_of_birth: Date;
  location: string;
  biography: string;
  interests: string[];
}

export interface IPackageModel {
  id: number;
  name: string;
  country: string;
  price: number;
  thumbnail: string;
  images: string[];
  description: string;
  departure_date: Date | string;
  rating: number;
  reviewers: number;
  is_promo: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ITransactionModel {
  id: number;
  user_id: number;
  package_id: number;
  is_paid: boolean;
  quantity: number;
  checkout_at: Date | string;
  created_at?: Date;
  updated_at?: Date;
}
