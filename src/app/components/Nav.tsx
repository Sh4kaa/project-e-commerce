"use client";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CartCount from "./CartCount";
import { X } from "lucide-react";
import ActiveLink from "./ActiveLink";
import NotificationCart from "./NotificationCart";
import { useProductContext } from "@/contexts/CartContext";

export default function Nav() {
  const [menu, setMenu] = useState(false);
  const { purchasedProducts } = useProductContext()

  function isMenu() {
    setMenu(!menu);
  }
  return (
    <nav>
      {menu ? (
        <X
          className="cursor-pointer text-white relative sm:hidden"
          onClick={isMenu}
        />
      ) : (
        <div className="relative">
          <Menu
            className="cursor-pointer text-white relative sm:hidden"
            onClick={isMenu}
          />
          {purchasedProducts.length > 0 && <NotificationCart />}
        </div>
      )}
      <ul
        className={`${menu
          ? "opacity-100 duration-700"
          : "max-[640px]:opacity-0 right-[-100%] duration-700"
          } max-[640px]:h-[calc(70vh_-_4rem)] max-[640px]:rounded flex flex-col w-[70%] bg-slate-700 absolute top-14 z-50 right-0 p-4 gap-3 sm:flex-row sm:static sm:p-0 text-white`}
      >
        <li>
          <ActiveLink href="/">Home</ActiveLink>
        </li>
        <li>
          <ActiveLink href="/about">Sobre</ActiveLink>
        </li>
        <li className="w-[60px]">
          <Link
            className="flex relative py-2 px-4 hover:bg-red-500 hover:text-black rounded duration-300 focus:bg-red-500"
            href="/cart"
          >
            <ShoppingCart />
            <CartCount />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
