'use client'
import { usePurchaseProducts } from "@/contexts/cart-context";





export default async function Home() {
  const { addToCart } = usePurchaseProducts()
  return (
    <>
      <h1>Pagina Home</h1>

    </>
  );
}
