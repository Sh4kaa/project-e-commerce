import { TypeProducts } from "@/types/prods";


export async function getData(): Promise<TypeProducts[]> {
  const data = await fetch("https://fakestoreapi.com/products");
  const dataJson = await data.json();
  if (!data.ok) throw new Error('Não foi possivel encontrar Dados')
  return dataJson;
}