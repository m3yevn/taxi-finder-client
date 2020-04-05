import React from 'react';
import { render } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar component testing', () => {
  it('renders logo', () => {
    const { getByText } = render(<Navbar />);
    const logo = getByText(/taxi finder/i);
    expect(logo).toBeInTheDocument();
  });
  
  it('renders github link', () => {
    const { getByText } = render(<Navbar />);
    const link = getByText(/Github/i);
    expect(link).toBeInTheDocument();
  });
  
  it('renders github link with href to github', () => {
    const { getByText } = render(<Navbar />);
    const link = getByText(/Github/i);
    expect(link.closest('a')).toHaveAttribute('href', 'https://github.com/m3yevn/taxi-finder-client');
  });

  it('renders github link with github icon', () => {
    const { container } = render(<Navbar />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});