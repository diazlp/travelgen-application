import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import usePaymentMaker from '@/hooks/payment/usePaymentMaker'
import { useCheckoutModalStore } from '@/libs/store'
import { Utils } from '@/libs/utils'
import Button from '../button'

export default function CheckoutModal(): React.ReactNode {
  usePaymentMaker()
  const checkoutModal = useCheckoutModalStore()

  const checkoutHandler = async () => {
    const stripePromise = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    )

    try {
      const res = await fetch('/api/transaction/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: checkoutModal.data,
          quantity: checkoutModal.quantity
        })
      })

      const data = await res.json()

      await stripePromise?.redirectToCheckout({
        sessionId: data.session_id
      })
    } catch (error) {
      // Empty block statement
    }
  }

  if (checkoutModal.visible) {
    return (
      <div
        className="fixed inset-0 z-50 overflow-auto flex w-full items-end bg-black bg-opacity-10 animate-fadeInModal"
        onClick={checkoutModal.closeModal}
      >
        <div
          className="border px-6 shadow-lg bg-white z-50 overflow-y-auto w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row items-center justify-between py-4 w-full text-left px-6">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-gray-100">Package Qty</p>
              <div className="cursor-pointer z-50 flex flex-row gap-4 items-center mx-4 select-none">
                <Button
                  className="h-[37px] w-[40px] text-white"
                  props={{
                    onClick: checkoutModal.incrementQuantity
                  }}
                >
                  +
                </Button>
                <p className="text-heading-3 font-bold">
                  {checkoutModal.quantity}
                </p>
                <Button
                  className="h-[37px] w-[40px] text-white"
                  props={{
                    onClick: checkoutModal.decrementQuantity
                  }}
                >
                  -
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <p className="text-heading-3 font-bold">
                {checkoutModal.data
                  ? checkoutModal.data.isPromo
                    ? Utils.formatCurrency(
                        checkoutModal.data.price * 0.9 * checkoutModal.quantity
                      )
                    : Utils.formatCurrency(
                        checkoutModal.data.price * checkoutModal.quantity
                      )
                  : 0}
              </p>
              <Button
                className="w-[190px] text-white"
                props={{
                  onClick: checkoutHandler
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
