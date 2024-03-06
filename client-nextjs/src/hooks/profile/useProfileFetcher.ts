import useSWR, { KeyedMutator } from 'swr'

interface IPackageResponse {
  id: number
  name: string
  country: string
  thumbnail: string
  description: string
  departure_date: Date
  rating: number
  reviewers: number
}

export interface ITransactionResponse {
  quantity: number
  is_paid: boolean
  checkout_at: Date
  package: IPackageResponse
}

interface IProfileResponse {
  avatar: string
  date_of_birth: Date
  location: string
  biography: string
  interests: string[]
}

export interface IUserResponse {
  id: number
  email: string
  full_name: string
  role: string
  is_verified: boolean
  verification_code: string
  created_at: Date
  profile: IProfileResponse
  transactions: ITransactionResponse[]
}

async function profileFetcher() {
  const res = await fetch('/api/auth/profile')
  const data = await res.json()

  return data
}

const useProfileFetcher = (): {
  profile: IUserResponse
  loading: boolean
  mutate: KeyedMutator<any>
} => {
  const {
    data: profile,
    isLoading,
    mutate
  } = useSWR('/api/auth/profile', profileFetcher)

  return {
    profile,
    loading: isLoading,
    mutate
  }
}

export default useProfileFetcher
