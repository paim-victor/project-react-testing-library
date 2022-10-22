import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente NotFound', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found && Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/teste'));
    const tituloNot = screen.getByText(/Page requested not found/i);
    expect(tituloNot).toBeInTheDocument();
    expect(history.location.pathname).toBe('/teste');
    const imagem = screen.getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imagem.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
