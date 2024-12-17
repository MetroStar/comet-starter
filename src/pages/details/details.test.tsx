import { mockData } from '@src/data/spacecraft';
import axios from '@src/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import * as useAuthMock from '../../hooks/use-auth';
import { User } from '../../types/user';
import { Details } from './details';

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
    queryClient.setQueryData(['details'], mockData.items[0]);
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    const { baseElement } = render(componentWrapper);
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('h1')?.textContent).toEqual('Details');
    await waitFor(async () => {
      expect(baseElement.querySelectorAll('#details-card li')).toHaveLength(5);
    });
  });

  test('should render with error', async () => {
    mock
      .onGet(new RegExp('/spacecraft/*'))
      .reply(500, { message: 'Internal Server Error' });
    queryClient.setQueryData(['details'], null);

    const { baseElement } = render(componentWrapper);
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('h1')?.textContent).toEqual('Details');
    await waitFor(async () => {
      expect(baseElement.querySelectorAll('#details-card li')).toHaveLength(0);
      expect(baseElement.querySelector('.usa-alert')).toBeDefined();
      expect(baseElement.querySelector('.usa-alert--error')).toBeDefined();
    });
  });
});
