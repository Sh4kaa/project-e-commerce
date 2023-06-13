import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import Cart from "@/components/icons/Cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "home de produtos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} pt-20`}>
        <header className="h-16 w-full fixed bg-orange-500 top-0 shadow-md">
          <div className="h-full w-1/2 mx-auto px-8 flex justify-between items-center">
            <Link href="/">Mercado do Zé</Link>
            <ul className="flex gap-4">
              <li>
                <Link
                  className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
                  href="/products"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
                  href="#"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-4 hover:bg-white hover:rounded duration-300"
                  href="#"
                >
                  <Cart />
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <main className="w-2/3 mx-auto">{children}</main>
      </body>
    </html>
  );
}
