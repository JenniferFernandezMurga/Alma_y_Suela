import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';

describe('Navbar', () => {
  test('renders Navbar component with search and login', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check for the logo image with the correct alt text
    expect(screen.getByAltText('StepWise Logo')).toBeInTheDocument();

    // Check for the search input placeholder
    expect(screen.getByPlaceholderText('Buscar por todo...')).toBeInTheDocument();

    // Check for the search button with the correct text
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();

    // Check for the login link (styled as a button) with the correct text
    expect(screen.getByRole('link', { name: 'Accede' })).toBeInTheDocument();
  });
});
