export interface Package {
  id: number
  name: string
  country: string
  price: number
  thumbnail: string
  images: string[]
  description: string
  departure_date: Date | string
  rating: number
  reviewers: number
  is_promo?: boolean
  created_at?: Date | string
  updated_at?: Date | string
  testimonies: Testimony[]
}

export interface Category {
  _id: string
  name: string
  thumbnail: string
}

export interface Testimony {
  _id: string
  full_name: string
  avatar: string
  location: string
  review: string
  rating: number
  destination: string
  checkout_at: Date | string
}
