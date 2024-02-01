"use client";
import { useProductContext } from "@/contexts/CartContext";
import { TypeProducts } from "@/types/prods";
import Image from "next/image";
import Link from "next/link";
import { converterBRL } from "../utils/currencyConverter";
import { useEffect, useState } from "react";
import { addToLocalStorage, getFromLocalStorage } from "../utils/localStorage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const productCart = addToCart(newProduct);
    setActiveBtnInCart(true);
    if (productCart) {
    } else {
      const item = getFromLocalStorage("cart");
      item.push(newProduct);
      addToLocalStorage(item);
    }
  }
  return (
    <section className="grid grid-cols-1 p-4 rounded place-items-center sm:grid-cols-2 sm:grid-rows-3 gap-4">
      <Image
        className="rounded sm:col-start-1 sm:row-start-1 sm:row-span-4 sm:place-self-start"
        src={product.image}
        width={500}
        height={500}
        alt={product.category}
      />
      <div className="sm:row-span-2">
        <h1 className="text-center font-extrabold">{product.title}</h1>
        <p className="text-center sm:text-lg">{product.description}</p>
        <span className="block text-[2rem] sm:text-6xl font-bold text-center mt-5">
          {converterBRL(product.price)}
        </span>
      </div>
      <div className="w-full space-y-3">
        {activeBtnInCart ? (
          <button
            className=""
            onClick={() => sale(product)}
          >
            Item Adicionado
          </button>
        ) : (
          <button
            className="block py-3 text-center rounded bg-red-600 w-full sm:py-5 font-bold sm:text-2xl hover:text-white duration-500"
            onClick={() => sale(product)}
          >
            COMPRAR
          </button>
        )}

        <Link
          className="block bg-red-600 py-3 sm:py-5 rounded w-full text-center sm:text-2xl font-bold hover:text-white duration-500"
          href={"/products"}
        >
          CONTINUAR COMPRANDO
        </Link>
      </div>

      <ToastContainer />
    </section>
  );
}
