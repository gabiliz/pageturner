import '@testing-library/jest-dom'
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import CardCarousel from '~/components/CardCarousel';

describe('Card Carousel', () => {
  it('should return carousel', () => {
    const children = [
      <div key="1">Slide 1</div>,
      <div key="2">Slide 2</div>,
      <div key="3">Slide 3</div>,
    ];
    
    const { getByText } = render(<CardCarousel>{children}</CardCarousel>);
    
    const carouselElement = getByText('Slide 1');
    expect(carouselElement).toBeInTheDocument();
  })
})



