import { getData } from "@/api/fetchProducts";
import { Metadata } from "next";
import { Suspense } from "react";
import Product from "./components/Product";

export const metadata: Metadata = {
  title: "Home 😊",
};

export default async function Home() {
  const productApi = await getData()
  const products = productApi.map(prod => ({ ...prod, quantity: 1 }))
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
