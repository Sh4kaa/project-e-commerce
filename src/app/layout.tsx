
import "./globals.css";
import { Inter } from "next/font/google";

import Header from "./components/Header";
import { PurchasedProductsProvider } from "@/contexts/cart-context";

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
        <PurchasedProductsProvider>
          <Header />
          <main className="max-w-screen-xl mx-auto flex flex-col items-center">
            {children}
          </main>
        </PurchasedProductsProvider>
      </body>
    </html>
  );
}
