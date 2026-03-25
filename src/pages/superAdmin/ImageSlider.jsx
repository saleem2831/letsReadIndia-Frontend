import { useState } from "react";

import "../../styles/ImageSlider.css";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no images
  if (!images || images.length === 0) {
    return <p>No Image</p>;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    // <div className="relative w-16 h-16">
    //   <img
    //     src={images[currentIndex]}
    //     alt="product"
    //     className="w-16 h-16 object-cover rounded"
    //   />

    //   {images.length > 1 && (
    //     <>
    //       <button
    //         onClick={prevSlide}
    //         className="absolute left-0 top-1/2 -translate-y-1/2 text-xs bg-black text-white px-1 rounded"
    //       >
    //         ◀
    //       </button>

    //       <button
    //         onClick={nextSlide}
    //         className="absolute right-0 top-1/2 -translate-y-1/2 text-xs bg-black text-white px-1 rounded"
    //       >
    //         ▶
    //       </button>
    //     </>
    //   )}
    // </div>

    <div className="image-slider">
  <img src={images[currentIndex]} alt="product" />

  {images.length > 1 && (
    <>
      <button
        onClick={prevSlide}
        className="slider-btn left"
      >
        ◀
      </button>

      <button
        onClick={nextSlide}
        className="slider-btn right"
      >
        ▶
      </button>
    </>
  )}
</div>

  );
};

export default ImageSlider;
