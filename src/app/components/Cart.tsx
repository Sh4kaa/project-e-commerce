"use client"
import { useProductContext } from '@/contexts/CartContext'
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { converterBRL } from '../utils/currencyConverter'

export default function Cart() {
  const [quantities, setQuantities] = useState<{ [id: number]: number }>(() => {
    const localQuantity = localStorage.getItem('quantity');
    return localQuantity ? JSON.parse(localQuantity) : {}
  })

  useEffect(() => {
    localStorage.setItem('quantity', JSON.stringify(quantities))
  }, [quantities])

  const { purchasedProducts, removeToCart } = useProductContext()
  const total = purchasedProducts.reduce((acc, prod) => {
    const quantity = quantities[prod.id] || 1
    let total = acc + (prod.price * quantity);
    return total
  }, 0)
  const sum = converterBRL(total)

  function handleQuantityChange(id: number, quantity: number) {
    setQuantities({ ...quantities, [id]: quantity })
  }

  if (!purchasedProducts.length) {
    return <p className='text-center'>Carrinho vazio 😥</p>
  }
  return (
    <section className='mx-auto'>
      {purchasedProducts.map(prod => (
        <div key={prod.id} className='border-[2px] p-2 border-slate-700 rounded-md w-64 sm:w-96 mb-2 flex flex-col justify-between'>
          <h1>{prod.title}</h1>
          <div className='flex justify-between'>
            <span className='block font-semibold text-3xl items-center'>{converterBRL(prod.price)}</span>
            <input
              type="number"
              min={1}
              className='w-8 h-8 rounded'
              value={quantities[prod.id] || 1}
              onChange={(e) => handleQuantityChange(prod.id, +(e.target.value))}
            />
            <div
              className='bg-fuchsia-500 text-white p-2 rounded max-w-max hover:bg-red-600 duration-500 cursor-pointer'
              onClick={() => removeToCart(prod.id)}
            >
              <Trash2 />
            </div>
          </div>
        </div>
      ))}
      <span><strong>Total:</strong>{sum}</span>
    </section>
  )
}
