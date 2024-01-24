import { TypeProducts } from "@/types/prods"

export function getFromLocalStorage(key: string): TypeProducts[] {
  const localData = localStorage.getItem(key)
  return localData ? JSON.parse(localData) : []
}

export function addToLocalStorage(value: TypeProducts[]) {
  localStorage.setItem('cart', JSON.stringify(value))
}

