

export default function useLocalStorage(key: string) {

  const getLocalData = () => {
    const localData = localStorage.getItem(key)
    return localData ? JSON.parse(localData) : null
  }

  function setItem(value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  return {
    getLocalData,
    setItem
  }
}