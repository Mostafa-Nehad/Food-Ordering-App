import React from 'react'
import { Metadata } from 'next'
import Checkout from '@/components/Checkout'

export const metadata: Metadata = {
  title: 'CheckOut | Pizza Store',
}
export default function CheckoutPage() {
  return(
    <Checkout/>
  )
}
