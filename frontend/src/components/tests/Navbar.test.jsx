import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { ShoeProvider } from '../../context/ShoeStore';
import { FavoritesProvider } from '../../context/FavoritesContext';
import '@testing-library/jest-dom';

describe('Navbar', () => {
  test('renders Navbar component with search and login', () => {
    render(
      <ShoeProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </FavoritesProvider>
      </ShoeProvider>
    );

    // Check for the logo image with the correct alt text
    expect(screen.getByAltText('runwise')).toBeInTheDocument();

    // Check for the search input placeholder
    expect(screen.getByPlaceholderText('Buscar zapatillas...')).toBeInTheDocument();

    // Check for the login link (styled as a button) with the correct text
    expect(screen.getByRole('link', { name: 'Acceder' })).toBeInTheDocument();
  });
});
