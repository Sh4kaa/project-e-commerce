"use client";
import { useProductContext } from "@/contexts/CartContext";
import { TypeProducts } from "@/types/prods";
import Image from "next/image";
import Link from "next/link";
import { converterBRL } from "../utils/currencyConverter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFromLocalStorage } from "../utils/localStorage";
import { useEffect, useState } from "react";

export default function ProductDetails({ product }: { product: TypeProducts }) {
  const [activeBtnInCart, setActiveBtnInCart] = useState(false);
  const { addToCart } = useProductContext();

  useEffect(() => {
    const cartItems = getFromLocalStorage("cart");
    const isInCart = cartItems.some((item) => item.id === product.id);
    setActiveBtnInCart(isInCart);
  }, [product.id]);

  function sale(product: TypeProducts) {
    const newProduct = { ...product, quantity: 1, addedToCart: true };
    addToCart(newProduct);
  }

  return (
    <section className="grid grid-cols-1 p-4 rounded place-items-center md:grid-cols-2 md:grid-rows-3 gap-4">
      <Image
        className="rounded sm:col-start-1 sm:row-start-1 sm:row-span-4 md:place-self-start"
        src={product.image}
        width={500}
        height={500}
        alt={product.category}
      />
      <div className="sm:row-span-2 self-end md:self-start xl:self-end">
        <h1 className="text-center font-extrabold text-lg sm:text-4xl lg:text-5xl sm:mb-3">{product.title}</h1>
        <p className="text-center sm:text-lg md:text-2xl lg:mt-8 md:mt-8">{product.description}</p>
        <span className="block text-[2rem] sm:text-4xl md:text-5xl lg:text-7xl  font-bold text-center mt-5">
          {converterBRL(product.price)}
        </span>
      </div>
      <div className="w-full space-y-3 md:self-start lg:mt-4">
        {activeBtnInCart ? (
          <button
            className="block py-3 text-center rounded bg-red-600/70 w-full sm:py-5 font-bold sm:text-2xl hover:text-white duration-500 cursor-not-allowed"
          >
            Item Adicionado
          </button>
        ) : (
          <button
            className="block py-3 text-center rounded bg-red-600 w-full sm:py-5 md:py-4 font-bold sm:text-2xl hover:text-white duration-500"
            onClick={() => sale(product)}
          >
            COMPRAR
          </button>
        )}

        <Link
          className="block bg-red-600 py-3 sm:py-5 md:py-4 rounded w-full text-center sm:text-2xl font-bold hover:text-white duration-500"
          href={"/products"}
        >
          CONTINUAR COMPRANDO
        </Link>
      </div>

      <ToastContainer />
    </section>
  );
}
