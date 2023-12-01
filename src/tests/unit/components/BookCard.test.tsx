import '@testing-library/jest-dom'
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoadingSpinner } from '~/components/Loading';
import BookCard from '~/components/BookCard';

describe('Book Card', () => {
  it('should return bookcard', () => {
    const props = {
      isProgress: true,
      isRating: true,
      isRatingWithReview: true,
      bookName: 'Sample Book',
      bookAuthor: ['Author 1', 'Author 2'],
      bookImage: 'https://example.com/sample-image.jpg',
      id: 'sample-id',
      ratingValue: 4.5,
      progressValue: 75,
    };

    render(<BookCard {...props} />)

    expect(screen.getByText('Sample Book')).toBeInTheDocument();
    expect(screen.getByText('Author 1, Author 2')).toBeInTheDocument();
    expect(screen.getByAltText('book-image')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  })
})