"use client";

import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useDotButton } from "@/hooks/useDotButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import crowImage from "@/public/crow.png";
import jerusalem from "@/public/jerusalem.png";
import blackLogo from "@/public/logo-black.svg";
// import carousalImage from "@/public/carousal2.png";

const MainCarousal = () => {
  const plugin = useRef(Autoplay({ delay: 5000 }));
  const [api, setApi] = useState<CarouselApi>();

  // const onNavButtonClick = useCallback((emblaApi: CarouselApi) => {
  //   const autoplay = emblaApi?.plugins()?.autoplay;
  //   if (!autoplay) return;

  //   const resetOrStop =
  //     autoplay.options.stopOnInteraction === false
  //       ? autoplay.reset
  //       : autoplay.stop;

  //   resetOrStop();
  // }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    api
    // onNavButtonClick
  );

  return (
    <section
      className="relative bg-gradient-to-b from-primary to-[#373526] max-w-screen min-h-[80dvh] 
  pt-2 pb-2 rounded-3xl flex flex-col items-center before:bg-[url('/books-bg.svg')] before:absolute before:h-full
  before:w-full lg:before:w-1/2 before:right-0 lg:after:hidden after:absolute after:h-full after:w-full
  after:right-0 after:top-0 after:bg-black/30 after:z-10"
    >
      <Carousel
        opts={{
          loop: true,
          direction: "rtl",
        }}
        setApi={setApi}
        plugins={[plugin.current]}
        dir="ltr"
        id="carousal"
        className="z-20"
      >
        <CarouselContent dir="rtl">
          <CarouselItem className="select-none lg:flex lg:flex-row">
            <div className="w-4/5 mx-auto px-2 sm:w-2/3 lg:w-1/2 lg:px-0 lg:flex lg:items-center">
              <AspectRatio ratio={758 / 1015}>
                <Image src={crowImage} alt="Crow library" fill />
              </AspectRatio>
            </div>
            <div className="w-3/4 mx-auto mt-2 sm:w-2/3 lg:w-1/2 lg:mt-0 lg:flex lg:items-center">
              <div className="space-y-2 lg:px-4">
                <Image className="w-3/5" src={blackLogo} alt="Logo" />
                {/* lg:[text-stroke:_thin_black] lg:[-webkit-text-stroke:_thin_black] */}
                <p className="text-white text-sm lg:text-4xl font-bold">
                  اكتشف عالمًا من القصص الشيقة والمقالات الملهمة والمعرفة
                  العميقة. انغمس في جمال اللغة العربية، واستمتع بروائع الأدب
                  والفكر والثقافة. سواء كنت تبحث عن الإلهام، التعلم، أو
                  الاستمتاع بقراءة ممتعة، فأنت في المكان الصحيح.
                </p>
                <a href="#special">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-md lg:text-lg text-white bg-black cursor-pointer"
                  >
                    ابدأ رحلتك الآن!
                    <ArrowLeft className="text-primary" />
                  </Button>
                </a>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="pt-4 lg:pt-0 select-none lg:flex lg:flex-row">
            <div className="w-4/5 mx-auto px-2 sm:w-2/3 lg:w-1/2 lg:px-0 lg:flex lg:items-center">
              <AspectRatio ratio={1 / 1}>
                <Image
                  className="object-contain"
                  src={jerusalem}
                  alt="Jerusalem "
                  fill
                />
              </AspectRatio>
            </div>
            <div className="w-3/4 mx-auto mt-2 sm:mt-4 sm:w-2/3 lg:w-1/2 lg:mt-0 lg:flex lg:items-center">
              <div className="space-y-2 lg:px-4">
                <Image className="w-3/5" src={blackLogo} alt="Logo" />
                {/* lg:[text-stroke:_thin_black] lg:[-webkit-text-stroke:_thin_black] */}
                <p className="text-white text-sm lg:text-4xl font-bold">
                  &ldquo;لَا يَهْمَنِي إِنْ سَرَقُوا أَفْكَارِي، مَا يَهْمَنِي
                  هُوَ أَنَّهُمْ لَا يَمْلِكُونَ
                  أَفْكَارَهُمْ الْخَاصَّة.&ldquo;
                </p>
                <p className="text-white text-sm lg:text-4xl font-bold">
                  نيكولا تسلا
                </p>
                <a href="#special">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-md lg:text-lg text-white bg-black cursor-pointer"
                  >
                    ابدأ رحلتك الآن!
                    <ArrowLeft className="text-primary" />
                  </Button>
                </a>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <div className="mt-4 md:my-10 flex justify-center items-center gap-x-4 z-20">
        {scrollSnaps.map((_, index) => (
          <div
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`rounded-full cursor-pointer w-6 h-6 ${
              index === selectedIndex ? "bg-primary" : "bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
export default MainCarousal;
