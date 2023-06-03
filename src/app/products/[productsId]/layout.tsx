import Link from "next/link";
import { ReactNode } from "react";
export const metadata = {
  title: "Products details",
};

export default function ProductDetails({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-10 flex flex-col items-center mt-32">
      {children}
      <Link className="bg-red-500 py-2 px-4 rounded text-center w-40 mt-9 text-white" href={"/products"}>
        Voltar para Home
      </Link>
    </div>
  );
}
