import Link from "next/link";
export const dynamic = "force-static";
import Counter from "./components/Counter";
//serverComponent, fileBasedRouting, appDirectory
// useState,useClient
//dynamicExport, forceStaticOrDynamic
// metadata, generateMetadata
export default function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <Counter />
    </main>
  );
}