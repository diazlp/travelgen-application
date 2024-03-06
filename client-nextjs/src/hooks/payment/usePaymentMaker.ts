import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

interface PaymentBody {
  session_id: string
  package_id: number
  quantity: number
}

async function makePayment(values: PaymentBody) {
  try {
    const response = await fetch('/api/transaction/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const usePaymentMaker = () => {
  const router = useRouter()
  const queryParams = useSearchParams()
  const sessionId = queryParams.get('session_id')
  const packageId = queryParams.get('package_id')
  const quantity = queryParams.get('quantity')

  useEffect(() => {
    if (sessionId && packageId && quantity) {
      ;(async () => {
        try {
          const paymentResponse = await makePayment({
            session_id: sessionId,
            package_id: +packageId,
            quantity: +quantity
          })

          toast.success(paymentResponse, {
            style: {
              background: 'green',
              color: '#fff'
            }
          })
        } catch (error: any) {
          if (error.message.startsWith('Payment not verified.')) {
            toast.error('Payment not verified.', {
              style: {
                fontWeight: 'bold'
              }
            })
          } else {
            toast.error(error.message, {
              style: {
                fontWeight: 'bold'
              }
            })
          }
        } finally {
          router.push('/')
        }
      })()
    }
  }, [sessionId, packageId, quantity, router])
}

export default usePaymentMaker
