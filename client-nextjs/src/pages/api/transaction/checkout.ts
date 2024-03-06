import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { Package } from '@/libs/types/interface'

interface CheckoutValues {
  data: Package
  quantity: number
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

const checkoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { data, quantity }: CheckoutValues = req.body

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}?session_id={CHECKOUT_SESSION_ID}&package_id=${data.id}&quantity=${quantity}`,
        cancel_url: `${process.env.NEXTAUTH_URL}?session_id={CHECKOUT_SESSION_ID}&package_id=${data.id}&quantity=${quantity}`,
        line_items: [
          {
            price_data: {
              unit_amount: data.is_promo ? data.price * 90 : data.price * 100,
              currency: 'IDR',
              product_data: {
                name: data.name,
                description: `NOTE: Use Card Number 4242 4242 4242 4242 and use any future-date & CVC | ${data.description}`,
                images: [data.thumbnail]
              }
            },
            quantity
          }
        ]
      })

      res.status(200).json({ session_id: session.id })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}

export default checkoutHandler
