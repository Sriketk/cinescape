"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useId, useEffect } from "react";
import Image from "next/image";

interface SlideData {
  title: string;
  button: string;
  src: string;
  url: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);



  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-80 h-96 mx-4 z-10"
        onClick={() => handleSlideClick(index)}
        style={{
          transform:
            current !== index
              ? "scale(0.98)"
              : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "center",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
        >
          <a
            href={slide.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              className="w-full h-full object-contain opacity-100 transition-opacity duration-600 ease-in-out rounded-lg"
              style={{
                opacity: current === index ? 1 : 0.5,
              }}
              alt={title}
              src={src}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              priority={index === 0}
              onLoad={imageLoaded}
            />
          </a>

        </div>


      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className="w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200"
      title={title}
      onClick={handleClick}
    >
      {type === "previous" ? (
        <ChevronLeft className="text-neutral-600 dark:text-neutral-200" />
      ) : (
        <ChevronRight className="text-neutral-600 dark:text-neutral-200" />
      )}
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-80 h-96 mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-1rem] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+0.5rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
