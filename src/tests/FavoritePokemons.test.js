import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente FavoritePokemons', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos;', () => {
    renderWithRouter(<App />);
    const favLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favLink).toBeInTheDocument();
    userEvent.click(favLink);
    const sobre = screen.getByRole('heading', { name: /Favorite pokémons/i, level: 2 });
    expect(sobre).toBeInTheDocument();
    const favNot = screen.getByText(/No favorite pokemon found/i);
    expect(favNot).toBeInTheDocument();
  });
});
