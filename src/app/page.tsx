import { PurchasedProductsContext } from "@/contexts/cart-context";
import { useContext } from "react";






export default async function Home() {
  const { addToCart } = useContext(PurchasedProductsContext)
  return (
    <>
      <h1>Pagina Home</h1>
      <button onClick={() => addToCart}>COmprar</button>
    </>
  );
}
