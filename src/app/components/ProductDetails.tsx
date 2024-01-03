"use client"
import { useProductContext } from '@/contexts/cart-context'
import { TypeProducts } from '@/types/prods'
import Image from 'next/image'
import Link from 'next/link'
import { converterBRL } from '../utils/currencyConverter'
import { useEffect } from 'react'


export default function ProductDetails({ product }: { product: TypeProducts }) {
  const { addToCart, productCart } = useProductContext()

  function sale(product: TypeProducts) {
    addToCart(product)
  }
  return (

    <div className="border-[2px] border-black p-4 rounded-md">
      <div className='flex gap-6 items-center justify-center'>
        <Image
          src={product.image}
          width={400}
          height={400}
          alt={product.category}
          className='rounded'
        />
        <div className="flex flex-col">
          <h1 className="text-center font-bold">{product.title}</h1>
          <p>{product.description}</p>
          <p className="text-4xl font-bold text-center mt-5">
            {converterBRL(product.price)}
          </p>
          {productCart ? (
            <button className="py-2 px-4 rounded bg-red-500/50 text-white cursor-not-allowed
            mt-4 font-semibold text-lg active:scale-105 active:bg-red-500/70 active:text-white
            duration-500" onClick={() => sale(product)}>
              Produto já foi adicionado ao carrinho
            </button>
          ) : (
            <button className="py-2 px-4 rounded bg-red-500
            mt-4 font-semibold text-lg active:scale-105 active:bg-red-500/70 active:text-white
            duration-500" onClick={() => sale(product)}>
              Comprar
            </button>
          )}
        </div>
      </div>


      <Link
        className="block bg-red-500 py-2 px-4 mt-9 w-max mx-auto rounded text-center text-white font-semibold hover:text-black duration-500"
        href={"/products"}
      >
        Continuar comprando
      </Link>
    </div>


  )
}
