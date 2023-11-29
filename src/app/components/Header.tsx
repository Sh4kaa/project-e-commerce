import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import CartCount from './CartCount'

export default function Header() {
  return (
    <header className="h-16 w-full fixed bg-blue-600 top-0 shadow-md">
      <div className="h-full w-1/2 mx-auto px-8 flex justify-between items-center">
        <Link href="/">Mercado do Zé</Link>
        <ul className="flex gap-4">
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
              className="block py-2 px-4 hover:bg-white hover:rounded duration-300 relative"
              href="/cart"
            >
              <ShoppingCart />
              <CartCount />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
