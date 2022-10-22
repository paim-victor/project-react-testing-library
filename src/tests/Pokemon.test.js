import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/electric/i);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/pikachu/i);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(/Average weight: 6.0 kg/i);

    const imagem = screen.getByAltText('Pikachu sprite');
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se em more details contém o favoritar', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByText(/more details/i);
    userEvent.click(btnDetails);

    const favButton = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favButton);

    const favIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const btnDetails = screen.getByText(/more details/i);
    userEvent.click(btnDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
