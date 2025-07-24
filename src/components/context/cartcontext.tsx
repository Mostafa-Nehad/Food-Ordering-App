'use client'
import { createContext, useContext, useState, useEffect } from 'react'

type CartItemType = {
  id: string
  title: string
  image: string
  basePrice: number
  size: { id: string; name: string; price: number }
  extras: { id: string; name: string; price: number }[]
}

type CartContextType = {
  cart: CartItemType[]
  addItem: (item: CartItemType) => void
  removeItem: (id: string) => void
  clearCart: () => void                     // ✅ أضفنا clearCart هنا
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) setCart(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addItem = (item: CartItemType) => {
    setCart(prev => [...prev, item])
  }

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
