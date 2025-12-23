import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar'; // Corrected import
import '@testing-library/jest-dom';

describe('Navbar', () => { // Corrected component name
  test('renders Navbar component with search and login', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check for the logo image
    expect(screen.getByAltText('StepWise Logo')).toBeInTheDocument();

    // Check for the search input placeholder
    expect(screen.getByPlaceholderText('Buscar por todo...')).toBeInTheDocument();

    // Check for the search button
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();

    // Check for the login button
    expect(screen.getByText('Accede')).toBeInTheDocument();
  });
});
