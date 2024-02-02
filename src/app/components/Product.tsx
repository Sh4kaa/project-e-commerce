"use client";
import React, { ChangeEvent } from "react";
import { Search } from "lucide-react";
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
    prod.title.toLowerCase().includes(inputSearch.toLowerCase()),
  );

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
          <li key={prod.id} className="grow shrink-0 basis-20 max-w-[177px] sm:basis-48">
            <Link className="block w-full" href={`/products/${prod.id.toString()}`}>
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
                  <button className="rounded bg-red-500 py-2 font-bold transition group-hover:text-black group-hover:bg-white">
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
