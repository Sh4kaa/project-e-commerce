"use client";
import React, { ChangeEvent, useState } from "react";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
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
          <li key={Math.random()} className="grow shrink basis-[150px] md:grow-0">
            <div className="rounded-md bg-white w-full">
              <div className="flex justify-center h-[80px] py-2">
                <Image
                  src={prod.image}
                  alt={prod.category}
                  height={30}
                  width={60}
                />
              </div>
              <div className="flex flex-col justify-between rounded-b bg-slate-700 text-white px-2 pb-2">
                <h1 className="h-6 my-0 mt-1 overflow-hidden text-center font-semibold text-base">
                  {prod.title}
                </h1>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold block">
                    {converterBRL(prod.price)}
                  </span>
                </p>
                <div className="flex gap-4 mt-1 justify-between items-end">
                  <Link className="block px-1 text-xs hover:text-red-600" href={`/products/${prod.id.toString()}`}>
                    Saiba mais
                  </Link>
                  {prod.addedToCart ? (
                    <button className="block bg-white rounded pl-1 pr-2 text-[22px] py-1 text-green-500">
                      <FaCartArrowDown />
                    </button>
                  ) : (
                    <button className="block bg-red-600 hover:bg-green-500 rounded duration-500 pl-1 pr-2 text-[22px] py-1" onClick={() => handleAddToCart(prod)}>
                      <FaCartPlus />
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
