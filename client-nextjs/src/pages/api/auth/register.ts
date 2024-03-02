import { NextApiRequest, NextApiResponse } from 'next'

interface FormValues {
  fullName: string
  email: string
  password: string
}

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { fullName, email, password }: FormValues = req.body

    const baseApiURL = process.env.BASE_API_URL

    if (!baseApiURL) {
      throw new Error('Base API URL is not defined in environment variables')
    }

    try {
      const response = await fetch(`${baseApiURL}/v1.0/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, password })
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

export default registerHandler
