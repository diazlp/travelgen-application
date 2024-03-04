import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

interface FormValues {
  verification_code: string
}

const verifyEmailHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = await getToken({
    req: req,
    secret: process?.env?.NEXTAUTH_SECRET
  })

  if (req.method === 'POST') {
    const { verification_code }: FormValues = req.body

    const baseApiURL = process.env.BASE_API_URL

    if (!baseApiURL) {
      throw new Error('Base API URL is not defined in environment variables')
    }

    try {
      const response = await fetch(`${baseApiURL}/v1.0/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token?.token as string
        },
        body: JSON.stringify({ verification_code })
      })
      const data = await response.json()

      if (response.ok) {
        res.status(201).json(data)
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

export default verifyEmailHandler
