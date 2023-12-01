import '@testing-library/jest-dom'
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserSessionPage } from '~/components/UserSession';

describe('Error page', () => {


  it('should return not logged text', () => {
    render(<UserSessionPage />)

    const textElement = screen.getByText('Você precisa estar logado para acessar essa página');
    expect(textElement).toBeInTheDocument();
  })
  it('should go to login page', () => {
    render(<UserSessionPage />)

    const loginButton = screen.getByRole("button", { name: 'Login' });    
    expect(loginButton).toBeInTheDocument();
  })
  it('should go to last page', () => {
    render(<UserSessionPage />)

    const returnButton = screen.getByRole("button", { name: 'Retornar' });    
    expect(returnButton).toBeInTheDocument();
  })
})