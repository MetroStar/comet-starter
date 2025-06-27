import axios from '@src/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const componentWrapper = (
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Dashboard />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );

  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  beforeEach(() => {
    queryClient.clear();
    mock.reset();
  });

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });

    expect(baseElement.querySelector('h1')?.textContent).toEqual(
      'My Dashboard',
    );
  });
});
