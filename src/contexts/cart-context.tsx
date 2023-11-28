'use client'
import { TypeProducts } from "@/types/prods";

import { createContext, useContext, useState } from "react";



type ContextProps = {
  addToCart: (product: TypeProducts) => void
  removeToCart: (id: number) => void
}

const PurchasedProductsContext = createContext({} as ContextProps)

export const PurchasedProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [purchasedProducts, setPurchasedProducts] = useState<TypeProducts[]>([])


  function addToCart(product: TypeProducts) {
    setPurchasedProducts([...purchasedProducts, product])
    console.log('produto adicionado ao carrinho')
  }

  function removeToCart(id: number) {
    const newListProduct = purchasedProducts.filter(product => product.id !== id)
    setPurchasedProducts(newListProduct)
    console.log(purchasedProducts)
  }
  return (
    <PurchasedProductsContext.Provider value={{ addToCart, removeToCart }}>
      {children}
    </PurchasedProductsContext.Provider>
  )
}

export const useProductContext = () => useContext(PurchasedProductsContext)
