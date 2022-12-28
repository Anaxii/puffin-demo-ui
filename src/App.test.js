import {render, screen} from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
<<<<<<< HEAD
    render(<App/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
=======
  render(<App/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
>>>>>>> 96484fa7466b56bb07d153f118cb026e90455b47
});
