"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TypeProducts } from "@/types/prods";
import { converterBRL } from "../utils/currencyConverter";
import { useProductContext } from "@/contexts/CartContext";
import { getFromLocalStorage } from "../utils/localStorage";

type Props = {
  children: TypeProducts[];
};

export default function Product({ children }: Props) {
  const [listProducts, setListProducts] = useState(children)
  // const [btnInCart, setBtnInCart] = useState(false)
  const [inputSearch, setInputSearch] = React.useState("");
  const { addToCart } = useProductContext()
  // let listProducts = children

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    setInputSearch(target.value);
  }

  const filteredListProducts = listProducts.filter((prod) =>
    prod.title.toLowerCase().includes(inputSearch.toLowerCase()),
  );

  function handleAddToCart(product: TypeProducts) {
    product = { ...product, quantity: 1, addedToCart: true }
    console.log(product)
    addToCart(product)
    //peganod items do carrinho
    const itemsInCart = getFromLocalStorage('cart')
    // verificando se o item está no carrinho
    const isProductInCart = itemsInCart.find(item => item.id === product.id);
    //pegando o item do carrinho e jogando na lsita d eprodutos substituido
    setListProducts(prevItem => prevItem.map(item => {
      if (item.id === isProductInCart?.id) {
        return isProductInCart
      } else { return item }
    }))

  }

  console.log(listProducts)

  return (
    <>
      <input
        className="block mx-auto pl-2 py-2 rounded-md outline-none w-full max-w-md mb-4"
        type="text"
        value={inputSearch}
        onChange={handleChange}
        placeholder="Pesquise seu produto"
      />
      <ul className="flex flex-wrap justify-center gap-4">
        {filteredListProducts.map((prod) => (
          <li key={Math.random()} className="grow shrink basis-44 md:grow-0">

            <div className="rounded-md bg-white">
              <div className="h-28 rounded-t-md border-b-4 border-red-500 p-2 flex items-center justify-center">
                <Image
                  src={prod.image}
                  alt={prod.category}
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex flex-col justify-between rounded-b bg-slate-700 text-white px-2 pb-2">
                <h1 className="h-6 my-0 mt-1 overflow-hidden text-center font-semibold text-base">
                  {prod.title}
                </h1>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">
                    {converterBRL(prod.price)}
                  </span>
                </p>
                <div className="flex gap-4 mt-1">
                  <Link className="block w-full bg-red-600 rounded px-1" href={`/products/${prod.id.toString()}`}>
                    Detalhes
                  </Link>
                  {prod.addedToCart ? (
                    <button className="block w-ful bg-red-600 rounded px-1">
                      Added
                    </button>
                  ) : (
                    <button className="block w-ful bg-red-600 rounded px-1" onClick={() => handleAddToCart(prod)}>
                      Comprar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
