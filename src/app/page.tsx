import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home 😊'
}

export default function Home() {
  return (
    <>
      <h1 className="text-center">Pagina Home</h1>
      <p className="text-center">Este site é um protótipo de um e-commerce</p>
    </>
  );
}
