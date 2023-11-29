"use client"
import { useProductContext } from '@/contexts/cart-context'
import React from 'react'

export default function Cart() {
  const { purchasedProducts, removeToCart } = useProductContext()
  const total = purchasedProducts.reduce((acc, next) => acc + next.price, 0)

  if (!purchasedProducts.length) {
    return <p>Carrinho vazio</p>
  }
  return (
    <>
      {purchasedProducts.map(prod => (
        <div key={prod.id} className='border-[2px] p-2 border-slate-700 rounded-md h-28 w-96 mb-2'>
          <h1>{prod.title}</h1>
          <span className='block'>{prod.price}</span>
          <button className='bg-fuchsia-600 hover:bg-red-600 text-white px-2 py-1 rounded-md' onClick={() => removeToCart(prod.id)}>Deletar</button>
        </div>
      ))}
      <span><strong>Total: R$ </strong>{' ' + total.toFixed(2)}</span>
    </>
  )
}
