import useSWR, { KeyedMutator } from 'swr'
import { Testimony } from '@/libs/types/interface'

async function testimonyFetcher(destination: string) {
  const res = await fetch(`/api/testimony?destination=${destination}`)
  const data = await res.json()

  return data
}

const useTestimonyFetcher = (
  destination: string
): {
  testimonies: Testimony[]
  loading: boolean
  mutate: KeyedMutator<any>
} => {
  const {
    data: testimonies,
    isLoading,
    mutate
  } = useSWR(`/api/testimony?destination=${destination}`, testimonyFetcher)

  return {
    testimonies,
    loading: isLoading,
    mutate
  }
}

export default useTestimonyFetcher
