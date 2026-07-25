import Link from "next/link";
import Counter from "./components/Counter";
//serverComponent, fileBasedRouting, appDirectory
// useState,useClient
export default function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <Counter />
    </main>
  );
}