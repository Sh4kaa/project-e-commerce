"use client";
import { useProductContext } from "@/contexts/CartContext";
import { Trash2, Minus, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { converterBRL } from "../utils/currencyConverter";
import { addToLocalStorage, getFromLocalStorage } from "../utils/localStorage";
import Image from "next/image";

export default function Cart() {
  const { purchasedProducts, removeToCart, setPurchasedProducts } =
    useProductContext();

  useEffect(() => {
    const localData = getFromLocalStorage("cart");
    setPurchasedProducts(localData);
  }, [setPurchasedProducts]);

  const total = purchasedProducts.reduce((acc, prod) => {
    const quantity = prod.quantity;
    let total = acc + prod.price * quantity;
    return total;
  }, 0);
  const sum = converterBRL(total);

  function handleQuantityChange(id: number, action: "increase" | "decrease") {
    setPurchasedProducts((prevProducts) => {
      const productsUpdated = prevProducts.map((prod) => {
        if (prod.id === id) {
          if (action === "increase") {
            prod.quantity += 1;
          }
          if (action === "decrease") {
            prod.quantity = Math.max(1, prod.quantity - 1);
          }
        }
        return prod;
      });
      addToLocalStorage(purchasedProducts);
      return productsUpdated;
    });
  }

  if (!purchasedProducts.length) {
    return <p className="text-center">Carrinho vazio 😥</p>;
  }

  return (
    <section className="">
      <div className="flex flex-wrap gap-2 justify-center">
        {purchasedProducts.map((prod) => (
          <div key={prod.id} className="bg-white grow shrink basis-72 max-w-[310px] flex rounded overflow-hidden pl-2 py-2 h-[130px]" >
            <Image src={prod.image} width={90} height={90} alt={prod.title} />
            <div className="w-full flex flex-col justify-evenly px-2">
              {/* title */}
              <h1 className="text-center font-bold text-lg h-[28px] overflow-y-hidden">{prod.title}</h1>
              {/* price */}
              <span className="block text-center text-2xl">
                {converterBRL(prod.price)}
              </span>
              {/* quantitities */}
              <div className="flex justify-between">
                <div className="flex">
                  <Minus
                    className="bg-red-600 rounded cursor-pointer hover:bg-red-500"
                    color="white"
                    width={22}
                    height={22}
                    onClick={() => handleQuantityChange(prod.id, "decrease")}
                  />
                  <span className="mx-2">
                    {prod.quantity}
                  </span>
                  <Plus
                    className="bg-red-600 rounded cursor-pointer hover:bg-red-500"
                    color="white"
                    width={22}
                    height={22}
                    onClick={() => handleQuantityChange(prod.id, "increase")}
                  />
                </div>
                <Trash2 className="bg-red-600 py-1 rounded cursor-pointer hover:bg-red-500" height={25} color="white" onClick={() => removeToCart(prod.id)} />
              </div>
            </div>


          </div>
        ))}
      </div>
      <span className="block text-center mt-3">
        <strong>Total: </strong>
        {sum}
      </span>
    </section >
  );
}
