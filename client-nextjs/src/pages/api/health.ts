import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const healthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const baseApiURL = process.env.BASE_API_URL

  if (!baseApiURL) {
    throw new Error('Base API URL is not defined in environment variables')
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(`${baseApiURL}/v1.0/health`, {
        method: 'GET'
      })
      const data = await response.json()

      if (response.ok) {
        res.status(200).json(data)
      } else {
        res.status(500).json(data)
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}

export default healthHandler
