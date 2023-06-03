import getProduct from "@/api/getProduct";
import Image from "next/image";
import React from "react";

type Params = {
  params: {
    productsId: string;
  };
};

export default async function Product({ params: { productsId } }: Params) {
  const product = await getProduct(productsId);
  console.log(productsId);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 place-items-end mx-4">
        <div>
          <h1 className="text-center font-bold">{product.title}</h1>
          <p>{product.description}</p>
          <p className="text-4xl font-bold">{product.price}</p>
        </div>
        <Image
          src={product.image}
          width={200}
          height={200}
          alt={product.category}
        />
      </div>
    </>
  );
}
