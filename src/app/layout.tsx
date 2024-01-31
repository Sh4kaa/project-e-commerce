import "./globals.css";
import { Inter } from "next/font/google";

import Header from "./components/Header";
import { PurchasedProductsProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} pt-20 bg-slate-500`}>
        <PurchasedProductsProvider>
          <Header />
          <main className="max-w-screen-xl mx-auto h-[calc(100vh_-_4rem)] p-4 ">
            {children}
          </main>
        </PurchasedProductsProvider>
      </body>
    </html>
  );
}
