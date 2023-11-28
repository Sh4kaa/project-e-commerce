'use client'
import { TypeProducts } from "@/types/prods";
import { createContext, useContext } from "react";

type ContextProps = {
  addToCart: (product: TypeProducts) => void
}

export const PurchasedProductsContext = createContext({} as ContextProps)

export const PurchasedProductsProvider = ({ children }: { children: React.ReactNode }) => {
  let productPurchased: TypeProducts[] = [];

  function addToCart(product: TypeProducts) {
    productPurchased.push(product)
  }

  function removeToCart(id: number) {
    let newListProduct = productPurchased.filter(product => product.id !== id)
    productPurchased = newListProduct
  }
  return (
    <PurchasedProductsContext.Provider value={{ addToCart }}>
      {children}
    </PurchasedProductsContext.Provider>
  )
}

export const usePurchaseProducts = () => {
  const context = useContext(PurchasedProductsContext)
  return context
}

