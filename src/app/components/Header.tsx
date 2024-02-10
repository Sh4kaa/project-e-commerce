import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="h-16 w-full fixed bg-slate-700 top-0 shadow-md z-30">
      <div className="h-full mx-auto px-8 flex justify-between items-center max-w-5xl">
        <Link href="/">Mercado do Zé</Link>
        <Nav />
      </div>
    </header>
  );
}
