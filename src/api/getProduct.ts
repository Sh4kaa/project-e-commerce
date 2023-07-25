import { TypeProducts } from "@/types/prods";


export default async function getProduct(productId: string) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );
  if (!response.ok) throw new Error("Não foi possível encontrar os dados");
  const jsonResponse: TypeProducts = await response.json();
  return jsonResponse;
}
