import useSWR, { KeyedMutator } from 'swr'

async function healthChecker() {
  const res = await fetch('/api/health')
  const data = await res.json()

  return data
}

const useHealthChecker = (): {
  health: { message: string }
} => {
  const { data: health } = useSWR('/api/health', healthChecker)

  return {
    health
  }
}

export default useHealthChecker
