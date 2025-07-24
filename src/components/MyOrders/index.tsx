'use client'
import { Routes } from '@/constants/enums'
import { formatCurrency } from '@/lib/formatters'
import React, { useEffect, useState } from 'react'

export default function MyOrders() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('orders')
    if (stored) setOrders(JSON.parse(stored))
  }, [])

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">No orders yet 📦</h2>
      </div>
    )
  }

  return (
    <main>
      <section className='section-gap' id={Routes.MYORDERS}>
          <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="border rounded-lg p-4 space-y-2">
            <div className="text-muted-foreground text-sm">
              <span className="mr-2">🕒</span>{order.date}
            </div>

            <div className="text-sm">
              <strong>👤 Name:</strong> {order.name}
            </div>

            <div className="text-sm">
              <strong>📞 Phone:</strong> {order.phone}
            </div>

            <div className="text-sm">
              <strong>🏠 Address:</strong> {order.address}
            </div>

            <ul className="text-sm list-disc list-inside mt-2">
              {order.items.map((item: any) => (
                <li key={item.id}>
                  🍕 {item.title} - {item.size.name}
                  {item.extras?.length > 0 && (
                    <> + {item.extras.map((e: any) => e.name).join(', ')}</>
                  )}
                </li>
              ))}
            </ul>

            <div className="font-semibold mt-2">
              Total: {formatCurrency(order.total)}
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
    </main>
  )
}
