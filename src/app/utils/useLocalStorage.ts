'use client'

import { TypeProducts } from "@/types/prods"


export default function useLocalStorage(key: string) {

  function getLocalData() {
    const localData = localStorage.getItem(key)
    if (localData) {
      const data = JSON.parse(localData)
      return data
    }
  }

  function addLocalStorage(value: TypeProducts) {
    const data = localStorage.getItem(key);
    const existingData = data ? JSON.parse(data) : []
    const objectInArray = existingData.some((item: TypeProducts) => item.id === value.id)
    if (!objectInArray) {
      const newArray = [...existingData, value]
      localStorage.setItem(key, JSON.stringify(newArray));
    }
  }

  return {
    getLocalData,
    addLocalStorage
  }
}