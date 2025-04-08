import { mockData } from '@src/data/spacecraft';
import axios from '@src/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, waitFor } from '@testing-library/react';
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
    mock.onGet(new RegExp('/spacecraft')).reply(200, mockData);
    queryClient.setQueryData(['spacecraft'], mockData.items);

    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });

    expect(baseElement.querySelector('h1')?.textContent).toEqual('Dashboard');
    expect(baseElement.querySelectorAll('.VictoryContainer')).toHaveLength(2);
    expect(baseElement.querySelector('.usa-table')).toBeDefined();
    expect(
      baseElement.querySelectorAll('.usa-table > tbody > tr'),
    ).toHaveLength(0);
  });

  test('should render loading state while fetching data', async () => {
    // Set up a delayed response to simulate loading
    mock.onGet(new RegExp('/spacecraft')).reply(() => {
      return new Promise((resolve) => {
        // Don't resolve immediately to ensure loading state is shown
        setTimeout(() => resolve([200, mockData]), 100);
      });
    });

    // Ensure there's no cached data
    queryClient.clear();

    const { baseElement } = render(componentWrapper);

    // Immediately after rendering, we should see the loading state
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('h1')?.textContent).toEqual('Dashboard');

    // Check for loading spinner or indicator
    expect(baseElement.querySelector('#spinner')).toBeDefined();
    expect(baseElement.querySelector('.usa-table')).toBeNull();

    // Wait for the data to load
    await waitFor(() => {
      expect(baseElement.querySelector('#spinner')).toBeNull();
      expect(baseElement.querySelector('.usa-table')).toBeDefined();
    });
  });

  test('should render with error', async () => {
    mock.onGet(new RegExp('/spacecraft')).networkError();
    queryClient.setQueryData(['spacecraft'], null);

    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('h1')?.textContent).toEqual('Dashboard');
    expect(baseElement.querySelector('.usa-alert')).toBeDefined();
    expect(baseElement.querySelector('.usa-alert--error')).toBeDefined();
  });
});
