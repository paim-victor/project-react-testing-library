import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente About:', () => {
  renderWithRouter(<About />);
  test('1) Teste se a página contém as informações sobre a Pokédex.', () => {
    const titulo = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(titulo).toBeInTheDocument();
  });
  test('2) Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const tst1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
    const tst2 = 'One can filter Pokémons by type, and see more details for each one of them';
    expect(screen.getByText(tst1)).toBeInTheDocument();
    expect(screen.getByText(tst2)).toBeInTheDocument();
  });
  test('3) Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const imagem = getByAltText('Pokédex');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagem).toHaveAttribute('src', url);
  });
});
