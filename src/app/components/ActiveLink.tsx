"use client"
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

type ActiveLinkProps = LinkProps & {
  children: React.ReactNode
}
export default function ActiveLink({ href, children, ...rest }: ActiveLinkProps) {
  const path = usePathname()
  console.log(path)
  const isActive = path === href.toString()
  return (
    <>
      <Link href={href} {...rest}
        className={isActive ? 'bg-blue-200 block py-2 px-4 hover:bg-white hover:rounded duration-300 font-bold rounded' : 'block py-2 px-4 hover:bg-white hover:rounded duration-300'}>
        {children}
      </Link>
    </>
  )
}
