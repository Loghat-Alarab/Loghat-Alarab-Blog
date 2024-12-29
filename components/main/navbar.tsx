import { ChevronDown } from "lucide-react";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { getCategories } from "@/lib/actions";
import { Button } from "@/components/ui/button";

import Logo from "./logo";
import MobileNav from "./mobile-nav";
import SearchInput from "./search-input";

const Navbar = async () => {
  const [blogs, characters, stories] = await Promise.all([
    getCategories("blogs"),
    getCategories("characters"),
    getCategories("stories"),
  ]);

  return (
    <header>
      <nav className="container p-4 flex justify-between items-center">
        <Link href="/">
          <div>
            <Logo />
          </div>
        </Link>

        <div className="flex gap-4">
          <nav className="md:flex items-center gap-2 lg:gap-4 hidden">
            <Button variant="ghost" asChild>
              <Link href="/">الرئيسية</Link>
            </Button>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  مقالات
                  <ChevronDown size={15} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>المقالات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/blogs">
                  <DropdownMenuItem className="cursor-pointer">
                    جميع المقالات
                  </DropdownMenuItem>
                </Link>
                {blogs.map((blog) => (
                  <Link
                    key={blog.fields.slug}
                    href={`/blogs/${blog.fields.slug}`}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      {blog.fields.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  شخصيات
                  <ChevronDown size={15} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>الشخصيات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/characters">
                  <DropdownMenuItem className="cursor-pointer">
                    جميع الشخصيات
                  </DropdownMenuItem>
                </Link>
                {characters.map((character) => (
                  <Link
                    key={character.fields.slug}
                    href={`/characters/${character.fields.slug}`}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      {character.fields.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  قصص و عبر
                  <ChevronDown size={15} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>القصص و العبر</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/stories">
                  <DropdownMenuItem className="cursor-pointer">
                    جميع القصص و العبر
                  </DropdownMenuItem>
                </Link>
                {stories.map((story) => (
                  <Link
                    key={story.fields.slug}
                    href={`/stories/${story.fields.slug}`}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      {story.fields.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <ThemeToggle />

          <SearchInput />

          <MobileNav blogs={blogs} characters={characters} stories={stories} />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
