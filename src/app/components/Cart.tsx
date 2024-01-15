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
  const { getLocalData, setItem } = useLocalStorage('quantity')
  const [quantities, setQuantities] = useState<Quantities>(() => getLocalData())

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
        <div key={prod.id} className='p-4 bg-slate-700 rounded-md w-64 sm:w-96 mb-2 flex flex-col justify-between divide-y-2'>
          <h1 className='my-0 mb-4 text-center text-white leading-8 font-bold'>{prod.title}</h1>
          <div className='grid grid-cols-2 items-center justify-items-center pt-1 sm:flex sm:justify-between'>
            <span className='block font-medium text-white text-3xl text-center col-span-2 max-[600px]:mb-4'>{converterBRL(prod.price)}</span>
            <div className='w-max'>
              <span className='text-white'>Qtd. </span>
              <input
                type="number"
                min={1}
                className='w-11 h-8 rounded px-1'
                value={quantities[prod.id] || 1}
                onChange={(e) => handleQuantityChange(prod.id, +(e.target.value))}
              />
            </div>
            <Trash2 width={30}
              className='text-white rounded hover:text-red-600 cursor-pointer hover:animate-pulse'
              onClick={() => removeToCart(prod.id)}
            />
          </div>
        </div>
      ))}
      <span className='text-xl block text-center font-semibold'><strong>Total: </strong>{sum}</span>
    </section>
  )
}
