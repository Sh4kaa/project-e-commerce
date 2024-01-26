"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type ActiveLinkProps = LinkProps & {
  children: React.ReactNode;
};
export default function ActiveLink({
  href,
  children,
  ...rest
}: ActiveLinkProps) {
  const path = usePathname();
  const isActive = path === href.toString();
  return (
    <>
      <Link
        href={href}
        {...rest}
        className={
          isActive
            ? "bg-red-500 block py-2 px-4 hover:bg-red-500 text-black hover:text-white duration-300 font-bold rounded"
            : "block py-2 px-4 hover:bg-red-500 hover:text-white hover:rounded duration-300"
        }
      >
        {children}
      </Link>
    </>
  );
}
