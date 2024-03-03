import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const profileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req: req,
    secret: process?.env?.NEXTAUTH_SECRET
  })

  const baseApiURL = process.env.BASE_API_URL

  if (!baseApiURL) {
    throw new Error('Base API URL is not defined in environment variables')
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(`${baseApiURL}/v1.0/auth/profile`, {
        method: 'GET',
        headers: {
          Authorization: token?.token as string
        }
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
  } else if (req.method === 'PUT') {
    try {
      const response = await fetch(`${baseApiURL}/v1.0/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token?.token as string
        },
        body: JSON.stringify(req.body)
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

export default profileHandler
