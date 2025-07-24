'use client'

import React from 'react'
import { useCart } from '@/components/context/cartcontext'
import Image from 'next/image'
import { formatCurrency } from '@/lib/formatters'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Cart() {

  const router = useRouter()
const { cart = [], removeItem } = useCart()

  const totalPrice = cart.reduce((sum, item) => {
    const extrasTotal = item.extras?.reduce((eSum: number, e: any) => eSum + e.price, 0) || 0
    return sum + item.basePrice + extrasTotal
  }, 0)

  if (cart.length === 0) {
    return (
      <div className='text-center py-20'>
        <h2 className='text-2xl font-semibold'>Your cart is empty 🛒</h2>
      </div>
    )
  }

  return (
    <main>
      <div className='max-w-4xl mx-auto px-4 py-10'>
      <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>
      <ul className='space-y-6'>
        {cart.map(item => (
          <li key={item.id} className='flex items-center gap-4 p-4 border rounded-md'>
            <Image
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className='rounded-md object-cover'
            />
            <div className='flex-1'>
              <h2 className='text-lg font-semibold'>{item.title}</h2>
              <p className='text-sm text-gray-500'>Size: {item.size.name}</p>
              {item.extras?.length > 0 && (
                <p className='text-sm text-gray-500'>
                  Extras: {item.extras.map((e: any) => e.name).join(', ')}
                </p>
              )}
              <p className='text-accent font-bold'>
                {formatCurrency(item.basePrice + (item.extras?.reduce((sum: number, e: any) => sum + e.price, 0) || 0))}
              </p>
            </div>
            <Button className=' bg-primary hover:bg-primary/85 duration-200 transition-colors font-semibold' variant="destructive" onClick={() => removeItem(item.id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
<div className='mt-10 text-right space-y-4'>
  <h3 className='text-xl font-bold'>Total: {formatCurrency(totalPrice)}</h3>
  <Button
    className='bg-primary hover:bg-primary/85 transition-colors'
  onClick={() => router.push('/checkout')}
  >
    Checkout
  </Button>
</div>

    </div>
    </main>
  )
}
