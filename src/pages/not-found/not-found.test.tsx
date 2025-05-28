import { act, render } from '@testing-library/react';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from './not-found';

describe('NotFound', () => {
  const componentWrapper = (
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Page Not Found',
      );
    });
  });
});
