import { getData } from "@/api/fetchProducts";


import React from "react";
import Product from "../components/Product";

export const metadata = {
  title: 'Produtos',
  description: 'Página de produtos'
}

export default async function Products() {
  const products = await getData()
  return (
    <>
      <Product>
        {products}
      </Product>
    </>
  );
}
