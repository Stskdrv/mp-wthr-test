import { render, screen } from '@testing-library/react';
import Navbar from '../navbar';
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/map'),
  useParams: jest.fn(() => ({})),
}));

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText('🗺️ Live location')).toBeInTheDocument();
    expect(screen.getByText('🔍 Search place')).toBeInTheDocument();
    expect(screen.getByText('🌤️ Weather')).toBeInTheDocument();
    expect(screen.getByText('📜 History')).toBeInTheDocument();
  });
});