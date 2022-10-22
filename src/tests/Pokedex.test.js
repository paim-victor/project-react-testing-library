import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokedex', () => {
  test('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByTestId('next-pokemon');
    expect(btnNext).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    userEvent.click(btnNext);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    const pesoPoke = screen.getAllByTestId('pokemon-weight');
    expect(pokemon.length).toBe(1);
    expect(pesoPoke.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const total = new Set();

    pokemons.forEach((el) => {
      total.add(el.type);
    });

    const btn = screen.getAllByTestId('pokemon-type-button');
    const tamanho = total.size;
    expect(btn).toHaveLength(tamanho);

    total.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      expect(button).toBeInTheDocument();
    });
  });
  test('É possível clicar no botão de filtragem All', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAll);
  });
});
