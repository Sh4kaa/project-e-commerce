'use client'
import { Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import CartCount from './CartCount'

export default function Nav() {
  const [menu, setMenu] = useState(false)

  function isMenu() {
    setMenu(!menu)
  }
  return (
    <nav>
      <Menu className='sm:hidden cursor-pointer text-white' onClick={isMenu} />
      {menu && (
        <ul className="flex flex-col justify-center z-[200] h-max gap-4 p-4 absolute top-16 right-0 bg-blue-600 rounded w-[70%] text-center">
          <li>
            <Link
              className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
              href="/products"
            >
              Produtos
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
              href="#"
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              className="flex py-2 px-4 hover:bg-white hover:rounded duration-300 relative justify-center"
              href="/cart"
            >
              <ShoppingCart />
              <CartCount />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}
