
import "./globals.css";
import { Inter } from "next/font/google";

import Header from "./components/Header";
import { PurchasedProductsProvider } from "@/contexts/cart-context";


const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} pt-20 bg-slate-200`}>
        <PurchasedProductsProvider>
          <Header />
          <main className="max-w-screen-xl mx-auto flex flex-col px-6">
            {children}
          </main>
        </PurchasedProductsProvider>
      </body>
    </html>
  );
}
