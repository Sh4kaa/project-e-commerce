'use client'
import { PurchasedProductsProvider } from "@/contexts/cart-context"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PurchasedProductsProvider>
      {children}
    </PurchasedProductsProvider>
  )
}