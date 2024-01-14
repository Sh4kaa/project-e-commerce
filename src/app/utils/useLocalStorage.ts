export default function useLocalStorage(key: string) {
  const setItem = (value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  const getItem = () => {
    try {
      const localData = localStorage.getItem(key)
      return localData ? JSON.parse(localData) : null
    } catch (error) {
      console.log(error)
    }
  }
  return {
    setItem,
    getItem
  }
}