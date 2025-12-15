import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { KeenSlider, KeenSliderSlide } from 'keen-slider/react';

export default function PropertyGallery({ images }) {
  if (!images?.length) return null;

  return (
    <div className="keen-slider h-64 rounded overflow-hidden">
      {images.map((img, idx) => (
        <div key={idx} className="keen-slider__slide">
          <img src={img.url} alt={`Property ${idx}`} className="w-full h-full object-cover"/>
        </div>
      ))}
    </div>
  );
}
