'use client'
import { Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import CartCount from './CartCount'
import { X } from 'lucide-react'
import ActiveLink from './ActiveLink'


export default function Nav() {
  const [menu, setMenu] = useState(false)

  function isMenu() {
    setMenu(!menu)
  }
  return (
    <nav>
      {menu ? <X className='cursor-pointer text-white relative sm:hidden' onClick={isMenu} /> : <Menu className='cursor-pointer text-white relative sm:hidden' onClick={isMenu} />}
      <ul className={`${menu ? 'opacity-100 duration-700' : 'max-[640px]:opacity-0 right-[-100%] duration-700'} flex flex-col w-[70%] bg-blue-600 rounded absolute z-50 right-0 p-4 top-14 gap-3 sm:flex-row sm:static sm:p-0`}>
        <li >
          <ActiveLink href='/'>
            Home
          </ActiveLink>
        </li>
        <li >
          <ActiveLink href='/products'>
            Produtos
          </ActiveLink>
        </li>
        <li >
          <ActiveLink href='/about'>
            Sobre
          </ActiveLink>
        </li>
        <li >
          <Link
            className="flex py-2 px-4 hover:bg-white hover:rounded duration-300 relative justify-center"
            href="/cart"
          >
            <ShoppingCart />
            <CartCount />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
