import React, { useState } from "react";
import left from "../assets/icons8-left-50 (1).png";
import right from "../assets/icons8-right-50 (1).png";
import sliderData from "../pages/sliderData"; // এখানে data import করো

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides || slides.length === 0) {
    return <p className="text-center mt-10 text-xl">No slides available</p>;
  }

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full overflow-hidden h-[400px] md:h-[500px] lg:h-[600px] mb-16">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="w-full flex-shrink-0 relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-wide">
                {slide.title}
              </h2>
              <p className="mt-3 text-lg md:text-2xl text-white drop-shadow-md opacity-90">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 backdrop-blur-md p-2 md:p-3 rounded-full transition-all shadow-md cursor-pointer"
      >
        <img src={left} alt="Prev" className="w-5 md:w-7" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 backdrop-blur-md p-2 md:p-3 rounded-full transition-all shadow-md cursor-pointer"
      >
        <img src={right} alt="Next" className="w-5 md:w-7" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition-all ${
              idx === currentIndex
                ? "bg-gradient-to-r from-[#2ee3aa] to-[#73f262] scale-110"
                : "bg-white/40 hover:bg-white/70"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

const HeroSlider = () => {
  return (
    <div className="mt-6">
      <ImageSlider slides={sliderData} />
    </div>
  );
};

export default HeroSlider;
