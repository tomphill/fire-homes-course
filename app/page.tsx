import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen -mt-24 relative p-24 flex items-center justify-center">
      <Image fill className="object-cover" src="/hero.webp" alt="" />
      <div className="absolute top-0 left-0 size-full bg-black/50 backdrop-blur-sm" />
      <div className="flex flex-col gap-10 text-white relative z-10">
        <h1 className="uppercase tracking-widest font-semibold text-5xl max-w-screen-md text-center">
          Find your new home with Fire Homes
        </h1>
        <Button asChild className="mx-auto p-8 text-lg gap-5">
          <Link href="/property-search">
            <SearchIcon /> Search Properties
          </Link>
        </Button>
      </div>
    </main>
  );
}
