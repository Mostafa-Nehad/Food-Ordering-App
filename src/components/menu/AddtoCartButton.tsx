'use client'
import React, { useState, useMemo, useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Label } from '../ui/label'
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { formatCurrency } from '@/lib/formatters'
import { Checkbox } from '../ui/checkbox'
import { useCart } from '@/components/context/cartcontext'
import { toast } from 'sonner'

export default function AddtoCartButton({ bestSeller }: any) {
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()
  const closeRef = useRef<HTMLButtonElement>(null)

  const sizes = [
    { id: 'small', name: 'Small', price: 0 },
    { id: 'medium', name: 'Medium', price: 40 },
    { id: 'large', name: 'Large', price: 80 },
  ]
  const extras = [
    { id: 'chesse', name: 'Chesse', price: 20 },
    { id: 'onion', name: 'Onion', price: 10 },
    { id: 'tomato', name: 'Tomato', price: 12 },
  ]

  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])

  const totalPrice = useMemo(() => {
    const extrasTotal = selectedExtras.reduce((sum, extraId) => {
      const found = extras.find(e => e.id === extraId)
      return sum + (found?.price || 0)
    }, 0)

    return bestSeller.basePrice + selectedSize.price + extrasTotal
  }, [selectedSize, selectedExtras, bestSeller])

  const handleAddToCart = () => {
    addItem({
      id: crypto.randomUUID(),
      title: bestSeller.title,
      image: bestSeller.image,
      basePrice: bestSeller.basePrice,
      size: selectedSize,
      extras: extras.filter(e => selectedExtras.includes(e.id))
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)

    toast.success("Success", {
      description: `${bestSeller.title} added to cart`,
      duration: 800,
      icon: "🛒",
    })


  setTimeout(() => {
    setIsAdded(false)
    closeRef.current?.click()
  },800)
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            type='button'
            size='lg'
            className='mt-4 text-white rounded-full !px-8'
          >
            {isAdded ? " Added" : "Add To Cart"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader className='flex items-center'>
            <Image src={bestSeller.image} alt={bestSeller.title} width={200} height={200} className='object-cover rounded-md' />
            <DialogTitle className='px-5 pt-2'>{bestSeller.title}</DialogTitle>
            <DialogDescription className='text-center font-semibold text-xl my-2'>
              {bestSeller.description}
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-10'>
            <div className='space-y-4 text-center'>
              <Label className='block'>Pick your size</Label>
              <PickSize
                sizes={sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                item={bestSeller}
              />
            </div>
            <div className='space-y-4 text-center'>
              <Label className='block'>Any extras?</Label>
              <Extras
                extras={extras}
                selectedExtras={selectedExtras}
                setSelectedExtras={setSelectedExtras}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddToCart}
              type="submit"
              className='w-full h-10'
            >
              {isAdded ? " Added" : `Add to Cart - ${formatCurrency(totalPrice)}`}
            </Button>
            <DialogClose asChild>
              <button ref={closeRef} className="hidden" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

function PickSize({ sizes, selectedSize, setSelectedSize, item }: any) {
  return (
    <RadioGroup
      value={selectedSize.name}
      onValueChange={(value) => {
        const size = sizes.find((s: any) => s.name === value)
        if (size) setSelectedSize(size)
      }}
    >
      {sizes.map((size: any) => (
        <div key={size.id} className="flex items-center gap-2 border border-gray-100 rounded-md p-4">
          <RadioGroupItem value={size.name} id={size.id} />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

function Extras({ extras, selectedExtras, setSelectedExtras }: any) {
  const toggleExtra = (id: string) => {
    setSelectedExtras((prev: string[]) =>
      prev.includes(id)
        ? prev.filter(e => e !== id)
        : [...prev, id]
    )
  }

  return (
    extras.map((extra: any) => (
      <div key={extra.id} className="flex items-center gap-2 border border-gray-100 rounded-md p-4">
        <Checkbox
          id={extra.id}
          checked={selectedExtras.includes(extra.id)}
          onCheckedChange={() => toggleExtra(extra.id)}
        />
        <Label htmlFor={extra.id}>
          {extra.name} {formatCurrency(extra.price)}
        </Label>
      </div>
    ))
  )
}
