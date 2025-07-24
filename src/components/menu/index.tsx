import React from 'react'
import imgMargherita from "../../../public/assets/images/margherita.jpeg"
import imgPepperoni from "../../../public/assets/images/pepperoni.png"
import imgVeggie from "../../../public/assets/images/veggie_delight.jpeg"
import imgBBQ from "../../../public/assets/images/bbq_chicken.jpg"
import imgHawaiian from "../../../public/assets/images/hawaiian.jpg"
import imgFourCheese from "../../../public/assets/images/four_cheese.jpg"
import imgMeatLovers from "../../../public/assets/images/meat_lovers.jpg"
import imgBuffalo from "../../../public/assets/images/buffalo_chicken.jpeg"
import imgSpinachFeta from "../../../public/assets/images/spinach_feta.jpeg"
import MenuItem from './MenuItem'

type MenuProps = {
  limit?: number
}

export default function Menu({limit}: MenuProps) {

const BestSellers = [
  { id: crypto.randomUUID(), title: "Margherita", description: "Classic tomato, mozzarella & basil.", basePrice: 90, image: imgMargherita },
  { id: crypto.randomUUID(), title: "Pepperoni", description: "Mozzarella and spicy pepperoni slices.", basePrice: 120, image: imgPepperoni },
  { id: crypto.randomUUID(), title: "BBQ Chicken", description: "Grilled chicken, BBQ sauce & red onions.", basePrice: 140, image: imgBBQ },
  { id: crypto.randomUUID(), title: "Veggie Delight", description: "Bell peppers, olives, mushrooms & onions.", basePrice: 110, image: imgVeggie },
  { id: crypto.randomUUID(), title: "Hawaiian", description: "Ham & pineapple combo.", basePrice: 120, image: imgHawaiian },
  { id: crypto.randomUUID(), title: "Four Cheese", description: "Mozzarella, cheddar, parmesan & gorgonzola.", basePrice: 130, image: imgFourCheese },
  { id: crypto.randomUUID(), title: "Meat Lovers", description: "Pepperoni, sausage, beef & bacon.", basePrice: 150, image: imgMeatLovers },
  { id: crypto.randomUUID(), title: "Buffalo Chicken", description: "Spicy buffalo chicken & ranch sauce.", basePrice: 130, image: imgBuffalo },
  { id: crypto.randomUUID(), title: "Spinach & Feta", description: "Garlic white sauce, spinach & feta.", basePrice: 110, image: imgSpinachFeta },
];



const visibleItems = limit ? BestSellers.slice(0, limit) : BestSellers;

  return (
    
        <ul className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {visibleItems.map((bestSeller) => (
            <MenuItem key={bestSeller.id}  bestSeller={bestSeller} />
          ))}
        </ul>
  )
}
