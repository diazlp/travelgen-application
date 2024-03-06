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
  created_at?: Date
  updated_at?: Date
}
export interface Category {
  id: string
  name: string
  thumbnail: string
}
export interface Testimony {
  id: string
  fullName: string
  photo: string
  location: string
  review: string
  rating: number
  destination: string
  checkoutDate: string
}
