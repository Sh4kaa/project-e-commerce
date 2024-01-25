"use client"
import { useProductContext } from '@/contexts/CartContext'
import { TypeProducts } from '@/types/prods'
import Image from 'next/image'
import Link from 'next/link'
import { converterBRL } from '../utils/currencyConverter'
import { useEffect, useState } from 'react'
import { addToLocalStorage, getFromLocalStorage } from '../utils/localStorage'

export default function ProductDetails({ product }: { product: TypeProducts }) {
  const [productInCart, setProductInCart] = useState(false)
  const { addToCart } = useProductContext()

  useEffect(() => {
    const cartItems = getFromLocalStorage('cart');
    const isInCart = cartItems.some(item => item.id === product.id);
    setProductInCart(isInCart);
  }, [product.id]);

  function sale(product: TypeProducts) {
    const newProduct = { ...product, quantity: 1, addedToCart: true }
    const productCart = addToCart(newProduct)
    setProductInCart(true)
    if (productCart) {
    } else {
      const item = getFromLocalStorage('cart')
      item.push(newProduct)
      addToLocalStorage(item)
    }
  }
  return (
    <section className='h-[calc(100vh_-_4rem)] flex items-center'>
      <div className="bg-slate-700 p-4 rounded-md max-w-3xl mx-auto">
        <div className='flex gap-6 max-[600px]:flex-col items-center justify-center'>
          <Image
            src={product.image}
            width={400}
            height={400}
            alt={product.category}
            className='rounded min-w-[256px] w-full'
          />
          <div className="flex flex-col">
            <h1 className="text-center font-bold">{product.title}</h1>
            <p>{product.description}</p>
            <p className="text-4xl font-bold text-center mt-5">
              {converterBRL(product.price)}
            </p>
            {productInCart ? (
              <button className="py-2 px-4 rounded bg-red-500/50 text-white cursor-not-allowed
            mt-4 font-semibold text-lg active:scale-105 active:bg-red-500/70 active:text-white
            duration-500" onClick={() => sale(product)}>
                Item Adicionado
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
    </section>
  )
}
