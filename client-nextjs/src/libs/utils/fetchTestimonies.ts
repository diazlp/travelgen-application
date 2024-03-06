import { Testimony } from '../types/interface'

const BASE_API_URL = process.env.BASE_API_URL || ''

async function fetchTestimonies(): Promise<Testimony[]> {
  try {
    const response = await fetch(`${BASE_API_URL}/v1.0/testimony/find-all`)
    if (!response.ok) {
      throw new Error('Failed to fetch testimonies')
    }
    return await response.json()
  } catch (error) {
    return []
  }
}

export default fetchTestimonies
