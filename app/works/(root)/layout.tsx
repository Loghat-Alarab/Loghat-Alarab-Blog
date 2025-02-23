import { Metadata } from "next";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import books from "@/public/books.png";

export const metadata: Metadata = {
  title: "الأعمال",
  alternates: {
    canonical: "/works",
  },
};

interface WorksLayoutProps {
  children: React.ReactNode;
}

const WorksLayout = ({ children }: Readonly<WorksLayoutProps>) => {
  return (
    <section className="relative pt-14 md:pt-20 flex">
      {/* TODO: loading page */}
      <div className="w-1/3">{children}</div>
      <div
        className="[clip-path:_polygon(0%_0%,50%_0%,100%_100%,0%_100%)] bg-[url('/books-bg.svg')]
        w-2/3 bg-primary"
      />
      <div className="absolute w-1/3 right-1/3 bottom-0">
        <AspectRatio ratio={5 / 7}>
          <Image src={books} alt="Image" className="rounded-md object-cover" />
        </AspectRatio>
      </div>
    </section>
  );
};
export default WorksLayout;
