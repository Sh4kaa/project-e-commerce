
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/products">Produtos</Link>
    </>
  );
}
