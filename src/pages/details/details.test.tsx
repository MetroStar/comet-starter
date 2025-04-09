import { mockData } from '@src/data/spacecraft';
import axios from '@src/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { Details } from './details';

const itemId = 1;
vi.mock('react-router-dom', async () => {
  // Require the actual module to spread its properties
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ id: '1' }),
  };
});

describe('Details', () => {
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
            <Details />
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
    mock.onGet(new RegExp('/spacecraft/*')).reply(200, mockData.items[0]);
    queryClient.setQueryData(['spacecraft', itemId], mockData.items[0]);
    const { baseElement } = render(componentWrapper);
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('h1')?.textContent).toEqual(
      'Millenium Falcon',
    );
  });

  test('should render loading state while fetching data', async () => {
    // Set up a delayed response to simulate loading
    mock.onGet(new RegExp('/spacecraft/*')).reply(200, () => {
      return new Promise((resolve) => {
        // Don't resolve immediately to ensure loading state is shown
        setTimeout(() => resolve([200, mockData.items[1]]), 100);
      });
    });

    queryClient.clear();

    const { baseElement } = render(componentWrapper);
    expect(baseElement).toBeTruthy();

    // Check for loading spinner or indicator
    expect(baseElement.querySelector('#spinner')).toBeDefined();

    // Wait for the data to load
    await waitFor(() => {
      expect(baseElement.querySelector('#spinner')).toBeNull();
    });
  });

  test('should render with error', async () => {
    mock.onGet(new RegExp('/spacecraft/*')).networkError();
    queryClient.setQueryData(['spacecraft', itemId], null);

    const { baseElement } = render(componentWrapper);
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('h1')?.textContent).not.toEqual(
      'Millenium Falcon',
    );
    await waitFor(async () => {
      expect(baseElement.querySelector('.usa-alert')).toBeDefined();
      expect(baseElement.querySelector('.usa-alert--error')).toBeDefined();
    });
  });
});
