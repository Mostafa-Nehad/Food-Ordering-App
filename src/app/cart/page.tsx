import React from 'react'
import { Metadata } from 'next'
import Cart from '@/components/Cart'

export const metadata: Metadata = {
  title: 'Cart | Pizza Store',
}
export default function CartPage() {
  return(
    <Cart/>
  )
}
