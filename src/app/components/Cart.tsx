"use client"
import { useProductContext } from '@/contexts/CartContext'
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { converterBRL } from '../utils/currencyConverter'
import useLocalStorage from '../utils/useLocalStorage';

type Quantities = {
  [key: number]: number;
}

export default function Cart() {
  const { getItem, setItem } = useLocalStorage('quantity')
  const [quantities, setQuantities] = useState<Quantities>(() => {
    const data = getItem()
    return data
  })

  useEffect(() => {
    setItem(quantities)
  }, [setItem, quantities])

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
        <div key={prod.id} className='border-[2px] p-2 border-blue-700 rounded-md w-64 sm:w-96 mb-2 flex flex-col justify-between'>
          <h1>{prod.title}</h1>
          <div className='flex justify-between items-center'>
            <span className='block font-semibold text-3xl items-center'>{converterBRL(prod.price)}</span>
            <input
              type="number"
              min={1}
              className='w-9 h-8 rounded px-1'
              value={quantities[prod.id] || 1}
              onChange={(e) => handleQuantityChange(prod.id, +(e.target.value))}
            />
            <Trash2 width={30}
              className='text-black rounded hover:text-red-600 cursor-pointer hover:animate-pulse'
              onClick={() => removeToCart(prod.id)}
            />
          </div>
        </div>
      ))}
      <span className='text-xl font-semibold'><strong>Total: </strong>{sum}</span>
    </section>
  )
}
