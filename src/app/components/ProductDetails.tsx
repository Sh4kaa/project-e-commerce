"use client"
import { useProductContext } from '@/contexts/cart-context'
import { TypeProducts } from '@/types/prods'
import Image from 'next/image'
import Link from 'next/link'


export default function ProductDetails({ product }: { product: TypeProducts }) {
  const { addToCart } = useProductContext()
  function sale(product: TypeProducts) {
    addToCart(product)
  }
  return (
    <div className="grid grid-cols-1 gap-3 place-items-center md:grid-cols-2 md:place-items-center">
      <Image
        src={product.image}
        width={400}
        height={400}
        alt={product.category}
      />
      <div className="flex flex-col px-6">
        <h1 className="text-center font-bold">{product.title}</h1>
        <p>{product.description}</p>
        <p className="text-4xl font-bold text-center mt-5">
          R$ {product.price}
        </p>
        <button className="py-2 px-4 rounded bg-red-500" onClick={() => sale(product)}>Comprar</button>
      </div>
      <Link
        className="bg-red-500 py-2 px-4 rounded text-center w-40 mt-9 text-white mx-auto col-span-2"
        href={"/products"}
      >
        Continuar comprando
      </Link>
    </div>
  )
}