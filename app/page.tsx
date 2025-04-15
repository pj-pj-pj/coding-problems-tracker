import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex gap-20 px-[22px] mb-10 justify-center">
      <div className="flex text-sm center content-center align-middle">
        <ChevronRight
          color="oklch(0.705 0.213 47.604)"
          size={19}
          className="self-center"
        />
        <Link
          href="/sign-in/"
          className="text-primary px-2 m-0 hover:bg-primary hover:text-background"
        >
          Sign in
        </Link>
      </div>
      <div className="flex text-sm center content-center">
        <ChevronRight
          color="oklch(0.637 0.237 25.331)"
          size={19}
          className="self-center "
        />
        <Link
          href="/sign-up/"
          className="text-destructive px-2 m-0 hover:bg-destructive hover:text-background"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
