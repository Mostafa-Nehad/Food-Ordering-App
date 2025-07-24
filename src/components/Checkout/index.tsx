'use client'

import React, { useState } from 'react'
import { useCart } from '@/components/context/cartcontext'
import { formatCurrency } from '@/lib/formatters'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const totalPrice = cart.reduce((total, item) => {
    const extrasTotal = item.extras.reduce((sum, e) => sum + e.price, 0)
    return total + item.basePrice + item.size.price + extrasTotal
  }, 0)

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    address: Yup.string()
      .required('Address is required')
      .min(5, 'Address must be at least 5 characters'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (cart.length === 0) {
        toast.error('Your cart is empty')
        return
      }

      setIsLoading(true)
      const order = {
        id: crypto.randomUUID(),
        name: values.name,
        address: values.address,
        phone: values.phone,
        items: cart,
        total: totalPrice,
        date: new Date().toLocaleString(),
      }

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      const updatedOrders = [...existingOrders, order]
      localStorage.setItem('orders', JSON.stringify(updatedOrders))

      clearCart()
      setIsLoading(false)
      toast.success('Order placed successfully 🎉', {
        description: 'You can view it in My Orders',
        duration: 1500,
      })

      router.push('/my-orders')
    },
  })

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
      </div>
    )
  }

  return (
    <main>
          <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name :
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              required
              className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md text-lg flex items-center">
              <svg
                viewBox="0 0 24 24"
                className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                fill="currentColor"
              >
                <path d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z" />
              </svg>
              <span className="text-red-800">{formik.errors.name}</span>
            </div>
          ) : null}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address :
          </label>
          <div className="mt-1">
            <input
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              required
              className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          {formik.touched.address && formik.errors.address ? (
            <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md text-lg flex items-center">
              <svg
                viewBox="0 0 24 24"
                className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                fill="currentColor"
              >
                <path d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z" />
              </svg>
              <span className="text-red-800">{formik.errors.address}</span>
            </div>
          ) : null}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone :
          </label>
          <div className="mt-1">
            <input
              id="phone"
              name="phone"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              required
              className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md text-lg flex items-center">
              <svg
                viewBox="0 0 24 24"
                className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                fill="currentColor"
              >
                <path d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z" />
              </svg>
              <span className="text-red-800">{formik.errors.phone}</span>
            </div>
          ) : null}
        </div>

        {/* Total Price */}
        <div className="mt-6 font-semibold text-lg">Total: {formatCurrency(totalPrice)}</div>

        {/* Submit Button */}
        <div className="w-fit ml-auto">
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty) || isLoading}
            className={`flex w-full justify-center rounded-md border border-transparent py-4 px-10 text-sm font-semibold text-white shadow-sm focus:outline-none  focus:ring-offset-2 ${
              !(formik.isValid && formik.dirty) || isLoading
                ? 'bg-primary/50 duration-300 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/85 transition duration-300'
            }`}
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
    </main>
  )
}
