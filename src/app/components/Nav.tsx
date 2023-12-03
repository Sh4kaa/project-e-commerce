'use client'
import { Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import CartCount from './CartCount'
import useMedia from '../utils/media'

export default function Nav() {
  const [menu, setMenu] = useState(false)

  const media = useMedia('(min-width: 640px)')

  function isMenu() {
    setMenu(!menu)
  }
  return (
    <nav>
      <Menu className='sm:hidden cursor-pointer text-white' onClick={isMenu} />
      {menu && (
        <ul className="absolute top-16 right-0 sm:hidden bg-blue-500 w-full p-4 text-center h-[50vh] flex flex-col items-center justify-around">
          <li className='w-full'>
            <Link
              className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
              href="/"
            >
              Home
            </Link>
          </li>
          <li className='w-full'>
            <Link
              className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
              href="/products"
            >
              Produtos
            </Link>
          </li>
          <li className='w-full'>
            <Link
              className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
              href="#"
            >
              Sobre
            </Link>
          </li>
          <li className='w-full'>
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

      {media && (
        <ul className="flex gap-3">
          <li className='w-full'>
            <Link
              className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
              href="/"
            >
              Home
            </Link>
          </li>
          <li className='w-full'>
            <Link
              className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
              href="/products"
            >
              Produtos
            </Link>
          </li>
          <li className='w-full'>
            <Link
              className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
              href="#"
            >
              Sobre
            </Link>
          </li>
          <li className='w-full'>
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
