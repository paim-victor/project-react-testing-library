import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(' Teste o componente App:', () => {
  test('1) Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent(/home/i);
    expect(links[1]).toHaveTextContent(/about/i);
    expect(links[2]).toHaveTextContent(/Favorite Pokémons/i);
    // console.log(links);
  });
  test('2) Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[0]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  test('3)Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[1]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  test('4)Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[2]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  test('5)Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina-aleatoria');
    });
    const titulo = screen.getByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(titulo).toBeInTheDocument();
  });
});
