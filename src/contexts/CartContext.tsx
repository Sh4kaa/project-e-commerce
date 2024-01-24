'use client'
import { addToLocalStorage } from "@/app/utils/localStorage";
import { TypeProducts } from "@/types/prods";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type ContextProps = {
  addToCart: (product: TypeProducts) => boolean
  removeToCart: (id: number) => void
  purchasedProducts: TypeProducts[]
  countProduct: number,
  setPurchasedProducts: Dispatch<SetStateAction<TypeProducts[]>>
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
      addToLocalStorage(purchasedProducts)
      return false
    }
  }

  function removeToCart(id: number) {
    const newListProduct = purchasedProducts.filter(product => product.id !== id)
    setPurchasedProducts(newListProduct)
    addToLocalStorage(purchasedProducts)
  }
  return (
    <PurchasedProductsContext.Provider value={{ addToCart, removeToCart, purchasedProducts, countProduct, setPurchasedProducts }}>
      {children}
    </PurchasedProductsContext.Provider>
  )
}

export const useProductContext = () => useContext(PurchasedProductsContext)
