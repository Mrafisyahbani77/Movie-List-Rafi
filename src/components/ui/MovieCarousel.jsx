import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsiveConfig = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 3 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const MovieCarousel = ({ children }) => {
  return (
    <Carousel
      responsive={responsiveConfig}
      swipeable={true}
      draggable={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      transitionDuration={500}
      containerClass="carousel-container py-4"
      itemClass="px-2"
      customTransition="transform 500ms ease-in-out"
    >
      {children}
    </Carousel>
  );
};

export default MovieCarousel;
