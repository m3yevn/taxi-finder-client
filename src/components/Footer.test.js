import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer component testing', () => {
  it('renders text', () => {
    const { getByText } = render(<Footer />);
    const footerNote = getByText(/Crafted with/i);
    expect(footerNote).toBeInTheDocument();
  });
  
  it('renders github user link', () => {
    const { getByText } = render(<Footer />);
    const link = getByText(/Kevin Moe Myint Myat/i);
    expect(link).toBeInTheDocument();
  });
  
  it('renders github link with href to github', () => {
    const { getByText } = render(<Footer />);
    const link = getByText(/Kevin Moe Myint Myat/i);
    expect(link.closest('a')).toHaveAttribute('href', 'https://github.com/m3yevn');
  });
});