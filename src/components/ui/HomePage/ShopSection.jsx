import React from "react";
import cover2 from "@/assets/cover2.png";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/common/Carousel";

const ProductCard = ({ image, title, description, price }) => {
  return (
    <div className="relative bg-[#23856D] text-white p-6 rounded-lg ">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="text-center container lg:text-left flex-1 mb-8 ">
          <p className="uppercase text-sm tracking-wide">Summer 2020</p>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-lg mb-4">{description}</p>
          <p className="text-2xl font-semibold mb-6">${price}</p>
        </div>

        <div className="flex-1">
          <img
            src={image}
            alt={title}
            className="object-contain w-full h-auto rounded-b-lg"
          />
        </div>
      </div>
    </div>
  );
};

const ShopSection = () => {
  const slides = [
    {
      backgroundUrl: cover2,
      content: {
        title: "Vita Classic Product",
        description:
          "We know how large objects will act, but things on a small scale.",
        price: "16.48",
      },
    },
    {
      backgroundUrl: cover2,
      content: {
        title: "Another Product",
        description: "This is another example product.",
        price: "20.99",
      },
    },
  ];

  return (
    <div className="p-4 bg-gray-100">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full h-full">
              <ProductCard
                image={slide.backgroundUrl}
                title={slide.content.title}
                description={slide.content.description}
                price={slide.content.price}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20">
          <ChevronLeft className="h-6 w-6 text-white" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20">
          <ChevronRight className="h-6 w-6 text-white" />
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default ShopSection;
