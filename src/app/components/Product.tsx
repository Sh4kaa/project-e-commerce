"use client";
import React, { ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { TypeProducts } from "@/types/prods";
import { converterBRL } from "../utils/currencyConverter";

type Props = {
  children: TypeProducts[];
};

export default function Product({ children }: Props) {
  const [inputSearch, setInputSearch] = React.useState("");
  const listProducts = children;

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    setInputSearch(target.value);
  }
  const filteredListProducts = listProducts.filter((prod) =>
    prod.title.toLowerCase().includes(inputSearch.toLowerCase())
  );

  return (
    <>

      <input
        className="border"
        type="text"
        value={inputSearch}
        onChange={handleChange}
      />


      <ul className="flex flex-wrap gap-2 justify-center">
        {filteredListProducts.map((prod) => (
          <li key={prod.id}>
            <Link href={`/products/${prod.id.toString()}`}>
              <div className="m-4 h-72 max-w-[220px] rounded-md bg-white shadow-lg transition hover:scale-105 group">
                <div className="h-28 rounded-t-md border-b-4 border-fuchsia-600 p-2 flex items-center justify-center">
                  <Image
                    src={prod.image}
                    alt={prod.category}
                    width={60}
                    height={60}
                  />
                </div>
                <div className="flex h-44 flex-col justify-between rounded-b bg-blue-500 px-2 pb-2">
                  <h1 className="h-6 overflow-hidden text-center font-semibold text-base">
                    {prod.title}
                  </h1>
                  <p className="h-12 overflow-hidden text-center text-xs leading-none">
                    {prod.description}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold">{converterBRL(prod.price)}</span>
                  </p>
                  <button className="rounded bg-green-500 py-2 font-bold transition group-hover:text-green-500 group-hover:bg-white">
                    COMPRAR
                  </button>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </>
  );
}
