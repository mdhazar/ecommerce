import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import productSlide1 from "@/assets/productSlide1.jpg";

const collections = [
  {
    season: "Summer 2020",
    title: "New Collection",
    description:
      "We know how large objects will act, but things on a small scale.",
    image: productSlide1,
  },
  {
    season: "Autumn 2020",
    title: "Cozy Essentials",
    description: "Discover our warm and stylish pieces for the cooler months.",
    image: productSlide1,
  },
  {
    season: "Winter 2021",
    title: "Frosty Favorites",
    description: "Stay chic and warm with our latest winter collection.",
    image: productSlide1,
  },
];

const NewCollection = () => {
  return (
    <Carousel className="w-full h-screen">
      <CarouselContent>
        {collections.map((collection, index) => (
          <CarouselItem key={index}>
            <Card className="border-none">
              <CardContent className="p-0">
                <div className="relative h-screen flex items-center justify-center text-white">
                  <div className="absolute inset-0 z-0">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="relative z-10 text-center">
                    <p className="text-sm uppercase tracking-wider mb-2">
                      {collection.season}
                    </p>
                    <h1 className="text-5xl font-bold uppercase mb-4">
                      {collection.title}
                    </h1>
                    <p className="text-lg mb-8">{collection.description}</p>
                    <button className="bg-[#2DC071] text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl bg-white/10 hover:bg-white/20">
        <ChevronLeft className="h-6 w-6 text-white" />
      </CarouselPrevious>
      <CarouselNext className="absolute right-5 top-1/2 transform -translate-y-1/2 text-2xl bg-white/10 hover:bg-white/20">
        <ChevronRight className="h-6 w-6 text-white" />
      </CarouselNext>
    </Carousel>
  );
};

export default NewCollection;
