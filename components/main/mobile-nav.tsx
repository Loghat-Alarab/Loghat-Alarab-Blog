"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import Link from "next/link";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import { links } from "@/constants";
import { Button } from "@/components/ui/button";

import Logo from "@/components/main/logo";

interface MobileNavProps {
  children: React.ReactNode;
}

const MobileNav = ({ children }: MobileNavProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="md:hidden py-4">
        <SheetHeader>
          <SheetTitle className="mx-auto">
            <Logo />
          </SheetTitle>
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              <p
                onClick={() => setOpen(false)}
                className={`text-start py-4 border-b hover:underline ${
                  pathname === link.href && "text-primary"
                }`}
              >
                {link.label}
              </p>
            </Link>
          ))}
          <div className="flex my-2 justify-evenly">{children}</div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
