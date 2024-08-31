"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import Logo from "./logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Entry } from "contentful";
import { CategoryEntrySkeleton } from "@/types";

type MobileNaveProps = {
  blogs: Entry<CategoryEntrySkeleton, undefined, string>[];
  characters: Entry<CategoryEntrySkeleton, undefined, string>[];
  stories: Entry<CategoryEntrySkeleton, undefined, string>[];
};

const MobileNav = ({ blogs, characters, stories }: MobileNaveProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu size={25} />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:hidden">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription>
            <Link href="/">
              <p
                onClick={() => setOpen(false)}
                className="text-start py-4 border-y hover:underline"
              >
                الرئيسية
              </p>
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>مقالات</AccordionTrigger>
                <AccordionContent>
                  <Link href="/blogs">
                    <p
                      onClick={() => setOpen(false)}
                      className="text-start py-4 hover:underline"
                    >
                      جميع المقالات
                    </p>
                  </Link>
                  {blogs.map((blog) => (
                    <Link
                      key={blog.fields.slug}
                      href={`/blogs/${blog.fields.slug}`}
                    >
                      <p
                        onClick={() => setOpen(false)}
                        className="text-start py-4 hover:underline"
                      >
                        {blog.fields.name}
                      </p>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>شخصيات</AccordionTrigger>
                <AccordionContent>
                  <Link href="/characters">
                    <p
                      onClick={() => setOpen(false)}
                      className="text-start py-4 hover:underline"
                    >
                      جميع الشخصيات
                    </p>
                  </Link>
                  {characters.map((character) => (
                    <Link
                      key={character.fields.slug}
                      href={`/characters/${character.fields.slug}`}
                    >
                      <p
                        onClick={() => setOpen(false)}
                        className="text-start py-4 hover:underline"
                      >
                        {character.fields.name}
                      </p>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>قصص و عبر</AccordionTrigger>
                <AccordionContent>
                  <Link href="/stories">
                    <p
                      onClick={() => setOpen(false)}
                      className="text-start py-4 hover:underline"
                    >
                      جميع القصص و العبر
                    </p>
                  </Link>
                  {stories.map((story) => (
                    <Link
                      key={story.fields.slug}
                      href={`/stories/${story.fields.slug}`}
                    >
                      <p
                        onClick={() => setOpen(false)}
                        className="text-start py-4 hover:underline"
                      >
                        {story.fields.name}
                      </p>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
