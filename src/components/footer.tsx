import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link href="https://github.com/tabletop-generator">
          <Image
            className="dark:invert"
            src="./github-mark.svg"
            alt="GitHub logo"
            width={24}
            height={24}
          />
        </Link>
      </nav>
    </footer>
  );
}
