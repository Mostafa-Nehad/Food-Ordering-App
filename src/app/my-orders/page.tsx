import React from 'react'
import { Metadata } from 'next'
import MyOrders from '@/components/MyOrders'

export const metadata: Metadata = {
  title: 'MyOrders | Pizza Store',
}
export default function MyOrdersPage() {

  return(
    <MyOrders/>
  )
}
