"use client"
import { useProductContext } from '@/contexts/cart-context'
import React from 'react'

export default function Cart() {
  const { purchasedProducts } = useProductContext()
  if (!purchasedProducts.length) {
    return <p>Carrinho vazio</p>
  }
  return (
    <>
      {purchasedProducts && purchasedProducts.map(prod => (
        <div key={prod.id} className='border-[2px] border-slate-700 rounded-md h-28 w-96 mb-2'>
          <h1>{prod.title}</h1>
          <span>{prod.price}</span>
        </div>
      ))}
    </>
  )
}
