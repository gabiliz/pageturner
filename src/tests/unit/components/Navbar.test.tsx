import '@testing-library/jest-dom'
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from '~/components/Navbar';

describe('Error page', () => {
  it('should return link', () => {
    render(<Navbar />)

    const homeTextElement = screen.getByText('Home');
    expect(homeTextElement).toBeInTheDocument();
  })
})