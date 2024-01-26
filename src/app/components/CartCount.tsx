"use client";
import { useProductContext } from "@/contexts/CartContext";
import React from "react";

export default function CartCount() {
  const { countProduct } = useProductContext();
  return (
    <span
      className="absolute
      block py-1 px-2 bg-red-600
      rounded-full top-[-9px] right-[-10px]
    text-white"
    >
      {countProduct}
    </span>
  );
}
