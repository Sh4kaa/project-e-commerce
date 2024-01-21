'use client'
import useLocalStorage from "@/app/utils/useLocalStorage";
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
  const { addLocalStorage, getLocalData } = useLocalStorage('productsincart')

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
    const productsInCart = getLocalData();
    if (productsInCart) {
      const localItemsInCart = productsInCart.filter(item => item.id === id)
      localStorage.setItem('productsincart', JSON.stringify(localItemsInCart))
    }
    // purchasedProducts.map(item => addLocalStorage(item))
  }
  return (
    <PurchasedProductsContext.Provider value={{ addToCart, removeToCart, purchasedProducts, countProduct, setPurchasedProducts }}>
      {children}
    </PurchasedProductsContext.Provider>
  )
}

export const useProductContext = () => useContext(PurchasedProductsContext)
