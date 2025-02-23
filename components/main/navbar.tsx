export const experimental_ppr = true;

import { Suspense } from "react";

import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/main/theme-toggle";

import Logo from "@/components/main/logo";
import NavLinks from "@/components/main/nav-links";
import MobileNav from "@/components/main/mobile-nav";
import UserButton from "@/components/auth/user-button";
import SearchInput from "@/components/main/search-input";

const Navbar = async () => {
  return (
    <header className="container sticky top-0 z-40 bg-background sm:py-4">
      <nav
        className="relative p-0 flex justify-between items-center before:absolute
      before:w-full before:h-8 md:before:h-14 before:bg-primary before:top-full sm:before:rounded-b-3xl"
      >
        <div className="flex gap-x-6 lg:gap-x-8">
          <Link href="/">
            <div className="mx-4">
              <Logo />
            </div>
          </Link>

          <NavLinks />
        </div>

        <div className="flex items-center gap-x-2 lg:gap-x-4 mr-2">
          <div
            className="hidden md:flex max-w-32 lg:max-w-40 *:nth-[2]:hidden 
          xl:max-w-64 xl:*:nth-[2]:flex gap-4"
          >
            <Suspense
              fallback={<Skeleton className="md:w-32 lg:w-40 xl:w-44 h-10" />}
            >
              <UserButton />
            </Suspense>
          </div>
          <div
            className="relative flex gap-4 bg-primary p-3.5 rounded-tr-3xl sm:rounded-t-3xl before:absolute before:bottom-0
          before:left-full before:w-10 before:h-10 before:bg-transparent before:rounded-3xl
          before:[box-shadow:_-20px_20px_0_0_var(--primary)]"
          >
            <SearchInput />

            <ThemeToggle />

            <MobileNav>
              <Suspense fallback={<Skeleton className="w-full h-10" />}>
                <UserButton />
              </Suspense>
            </MobileNav>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
