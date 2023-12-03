import { useEffect, useState } from "react"


export default function useMedia(media: string) {
  const [match, setMatch] = useState<boolean | null>(null)

  useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media)
      setMatch(matches)
    }
    window.addEventListener('resize', changeMatch)
    return () => {
      window.removeEventListener('resize', changeMatch)
    }
  }, [media])


  return match

}
