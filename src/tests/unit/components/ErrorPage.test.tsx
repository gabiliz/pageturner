import '@testing-library/jest-dom'
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorPage } from "~/components/Error";

describe('Error page', () => {
  it('should return error text', () => {
    render(<ErrorPage />)

    const textElement = screen.getByText('Ocorreu um erro ao buscar os dados.');
    expect(textElement).toBeInTheDocument();
  })
})