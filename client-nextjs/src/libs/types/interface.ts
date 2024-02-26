export interface Package {
  id: number
  name: string
  country: string
  price: number
  thumbnail: string
  images: string[]
  description: string
  departureDate: string
  rating: number
  reviewers: number
  isPromo?: boolean
}
