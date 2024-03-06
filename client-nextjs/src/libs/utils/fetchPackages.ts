import { Package } from '../types/interface'

const BASE_API_URL = process.env.BASE_API_URL || ''

async function fetchPackages(): Promise<Package[]> {
  try {
    const response = await fetch(`${BASE_API_URL}/v1.0/package/find-all`)
    if (!response.ok) {
      throw new Error('Failed to fetch packages')
    }
    return await response.json()
  } catch (error) {
    return []
  }
}

export default fetchPackages
