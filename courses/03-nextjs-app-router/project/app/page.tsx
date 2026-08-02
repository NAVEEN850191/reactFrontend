import Link from "next/link";
export const dynamic = "force-static";
import Counter from "./components/Counter";
import Image from 'next/image'
//serverComponent, fileBasedRouting, appDirectory
// useState,useClient
//dynamicExport, forceStaticOrDynamic
// metadata, generateMetadata
// nextImage, nextFont
export default function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <Counter />
      <Image
        src="https://placehold.co/300x200"
        alt="Placeholder image"
        width={300}
        height={200}
      />
    </main>
  );
}