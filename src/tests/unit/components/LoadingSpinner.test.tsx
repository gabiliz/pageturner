import '@testing-library/jest-dom'
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from '~/components/Loading';

describe('Loading Spinner', () => {
  it('should return status', () => {
    render(<LoadingSpinner />)

    const loadingSpinner = screen.getByRole('status');
    expect(loadingSpinner).toBeInTheDocument();
  })
})