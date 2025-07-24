'use client';

import { Routes } from '@/constants/enums';
import  Link  from '../Link'
import React, { useState } from 'react'
import { Button, buttonVariants } from '../ui/button';
import { Menu, ShoppingCart, XIcon } from 'lucide-react';

export default function Navbar() {

  const [openMenu, setOpenMenu] = useState(false);

  const links = [
    {id:crypto.randomUUID(),title:"Menu",href:Routes.MENU},
    {id:crypto.randomUUID(),title:"About",href:Routes.ABOUT},
    {id:crypto.randomUUID(),title:"Contact",href:Routes.CONTACT},
    {id:crypto.randomUUID(),title:"My Orders",href:Routes.MYORDERS},
    {id:crypto.randomUUID(),title:"Cart",href:Routes.CART},
  ]

  return (
    <nav className='flex-1 justify-end flex'>

            <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="!w-6 !h-6" />
      </Button>

      <ul className={`fixed lg:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}>
          <Button
          variant="secondary"
          size="sm"
          className="absolute top-5 right-5 lg:hidden"
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className="!w-6 !h-6" />
        </Button>
{links.map((link) => (
  <li key={link.id}>
    <Link
      href={link.href}
      className= 'text-accent hover:text-primary duration-200 transition-colors font-semibold flex items-center'
      onClick={() => setOpenMenu(false)}
    >
      {link.title === "Cart" ? (
        <ShoppingCart className="w-6 h-6" aria-label="Cart" />
      ) : (
        link.title
      )}
    </Link>
  </li>
))}

      </ul>
    </nav>
  )
}
