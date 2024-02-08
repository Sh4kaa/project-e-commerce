"use client";
import { addToLocalStorage, getFromLocalStorage } from "@/app/utils/localStorage";
import { TypeProducts } from "@/types/prods";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

type ContextProps = {
  addToCart: (product: TypeProducts) => boolean;
  removeToCart: (id: number) => void;
  purchasedProducts: TypeProducts[];
  countProduct: number;
  setPurchasedProducts: Dispatch<SetStateAction<TypeProducts[]>>;
};

const PurchasedProductsContext = createContext({} as ContextProps);

export const PurchasedProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [purchasedProducts, setPurchasedProducts] = useState<TypeProducts[]>([]);
  const countProduct = purchasedProducts.length;

  function addToCart(product: TypeProducts) {
    const productsInLocalStorage = getFromLocalStorage('cart')
    const productsLocal = productsInLocalStorage.some(prod => prod.id === product.id)
    if (!productsLocal) {
      productsInLocalStorage.push(product)
      addToLocalStorage(productsInLocalStorage)
      const itemsInLocalStorage = getFromLocalStorage('cart')
      setPurchasedProducts(itemsInLocalStorage)
      toast('Adicionado ao carinho')
      return false
    } else {
      return true
    }
    // const isProductInCart = purchasedProducts.some(prod => prod.id === product.id);
    // if (isProductInCart) {
    //   return true;
    // } else {
    //   toast("Item adicionado");
    //   addToLocalStorage(purchasedProducts)
    //   setPurchasedProducts([...purchasedProducts, product]);
    //   return false;
    // }
  }

  function removeToCart(id: number) {
    // const newListProduct = purchasedProducts.filter((product) => product.id !== id );
    const data = getFromLocalStorage("cart");
    const newProductsLocalStorage = data.filter((item) => item.id !== id);
    addToLocalStorage(newProductsLocalStorage);
    setPurchasedProducts(newProductsLocalStorage);
  }
  return (
    <PurchasedProductsContext.Provider
      value={{ addToCart, removeToCart, purchasedProducts, countProduct, setPurchasedProducts }}
    >
      {children}
    </PurchasedProductsContext.Provider>
  );
};

export const useProductContext = () => useContext(PurchasedProductsContext);
