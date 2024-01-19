'use client'
import { TypeProducts } from "@/types/prods";
import { createContext, useContext, useState } from "react";

type ContextProps = {
  addToCart: (product: TypeProducts) => boolean
  removeToCart: (id: number) => void
  purchasedProducts: TypeProducts[]
  countProduct: number
}

const PurchasedProductsContext = createContext({} as ContextProps)

export const PurchasedProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [purchasedProducts, setPurchasedProducts] = useState<TypeProducts[]>([])

  const countProduct = purchasedProducts.length
  function addToCart(product: TypeProducts) {
    const isProductInCart = purchasedProducts.some(prod => prod.id === product.id);
    if (isProductInCart) {
      return true
    } else {
      setPurchasedProducts([...purchasedProducts, product])
      return false
    }
  }

  function removeToCart(id: number) {
    const newListProduct = purchasedProducts.filter(product => product.id !== id)
    setPurchasedProducts(newListProduct)
    console.log(purchasedProducts)
  }
  return (
    <PurchasedProductsContext.Provider value={{ addToCart, removeToCart, purchasedProducts, countProduct }}>
      {children}
    </PurchasedProductsContext.Provider>
  )
}

export const useProductContext = () => useContext(PurchasedProductsContext)
