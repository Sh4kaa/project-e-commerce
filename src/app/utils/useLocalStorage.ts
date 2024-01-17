'use client'

export default function useLocalStorage(key: string) {
  const getLocalData = () => {
    try {
      const localData = localStorage.getItem(key)
      return localData ? JSON.parse(localData) : ''
    } catch (error) {
      console.log(error)
    }
  }

  function setItem(value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }
  return {
    getLocalData,
    setItem
  }
}