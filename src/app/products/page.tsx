import { getData } from "@/api/fetchProducts";


import React, { Suspense } from "react";
import Product from "../components/Product";

export const metadata = {
  title: 'Produtos 👌',
  description: 'Página de produtos'
}

export default async function Products() {
  const productApi = await getData()
  const products = productApi.map(prod => ({ ...prod, quantity: 1 }))
  console.log(products)

  return (
    <>
      <Suspense fallback={<p>Carregando...</p>}>
        <Product>
          {products}
        </Product>
      </Suspense>
    </>
  );
}
