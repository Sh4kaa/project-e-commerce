"use client";
import { useProductContext } from "@/contexts/CartContext";
import { Trash2, Minus, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { converterBRL } from "../utils/currencyConverter";
import { addToLocalStorage, getFromLocalStorage } from "../utils/localStorage";

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
    <section className="mx-auto">
      <div className="flex gap-2 flex-wrap justify-center">
        {purchasedProducts.map((prod) => (
          <div
            key={prod.id}
            className="p-4 bg-slate-700 rounded-md w-64 sm:w-96 mb-2 flex flex-col justify-between divide-y-2"
          >
            <h1 className="my-0 mb-4 text-center text-white font-normal">
              {prod.title}
            </h1>
            <div className="grid grid-cols-2 items-center justify-items-center pt-1 sm:flex sm:justify-between">
              <span className="block font-medium text-white text-3xl text-center col-span-2 max-[600px]:mb-4">
                {converterBRL(prod.price)}
              </span>
              <div className="w-max flex justify-center items-center gap-2">
                <Minus
                  className="bg-red-600 text-white rounded cursor-pointer"
                  onClick={() => handleQuantityChange(prod.id, "decrease")}
                />
                {prod.quantity}
                <Plus
                  className="bg-red-600 text-white rounded cursor-pointer"
                  onClick={() => handleQuantityChange(prod.id, "increase")}
                />
              </div>
              <Trash2
                width={30}
                className="text-white rounded hover:text-red-600 cursor-pointer hover:animate-pulse"
                onClick={() => removeToCart(prod.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <span className="text-xl block text-center font-semibold">
        <strong>Total: </strong>
        {sum}
      </span>
    </section>
  );
}
