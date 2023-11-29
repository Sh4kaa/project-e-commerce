import getProduct from "@/api/getProduct";
import ProductDetails from "@/app/components/ProductDetails";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Produto detalhes ❤️'
}

type Params = {
  params: {
    productsId: string;
  };
};


export default async function Product({ params: { productsId } }: Params) {
  const product = await getProduct(productsId);

  if (!product) return null
  return (
    <>
      <ProductDetails product={product} />
    </>
  );
}
