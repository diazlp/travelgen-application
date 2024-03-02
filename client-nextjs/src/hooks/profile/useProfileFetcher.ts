import useSWR from 'swr'

interface IProfile {
  avatar: string
  date_of_birth: Date
  location: string
  biography: string
  interests: string[]
}

interface IUser {
  id: number
  email: string
  full_name: string
  role: string
  is_verified: boolean
  verification_code: string
  created_at: Date
  profile: IProfile
}

async function profileFetcher() {
  const res = await fetch('/api/auth/profile')
  const data = await res.json()

  return data
}

const useProfileFetcher = (): { profile: IUser } => {
  const { data: profile } = useSWR('/api/auth/profile', profileFetcher)

  return {
    profile
  }
}

export default useProfileFetcher
