"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { links } from "@/constants";
import { Button } from "@/components/ui/button";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex gap-x-1 lg:gap-x-4 hidden">
      {links.map((link) => (
        <li key={link.label}>
          <Button
            variant="ghost"
            className={`text-md font-bold ${
              pathname === link.href && "text-primary"
            }`}
            asChild
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};
export default NavLinks;
