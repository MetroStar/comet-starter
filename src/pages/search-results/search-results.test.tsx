import { mockData } from '@src/data/spacecraft';
import { User } from '@src/types/user';
import axios from '@src/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { SearchResults } from './search-results';

describe('SearchResults', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <SearchResults />
          </QueryClientProvider>
        </BrowserRouter>
      </RecoilRoot>
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
  });

  test('should render with 0 results', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 0 search results for ""',
      );
    });
  });

  test('should render with 0 results with no search', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockReturnValue(null);

    mock.onGet(new RegExp('/search')).reply(200, mockData.items);
    queryClient.setQueryData(['results', 'test'], mockData.items.slice(0, 1));
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 0 search results for ""',
      );
    });
  });

  test('should render with 0 results with bad search', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockReturnValue('abcd');

    mock.onGet(new RegExp('/search')).reply(200, mockData.items);
    queryClient.setQueryData(['results', 'test'], mockData.items.slice(0, 1));
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 0 search results for "abcd"',
      );
    });
  });

  test('should render with 1 results', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockReturnValue('test');

    mock.onGet(new RegExp('/search')).reply(200, mockData.items);
    queryClient.setQueryData(['results', 'test'], mockData.items.slice(0, 1));
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 1 search result for "test"',
      );
    });
  });

  test('should render with multiple results', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockReturnValue('test');

    mock.onGet(new RegExp('/search')).reply(200, mockData.items);
    queryClient.setQueryData(['results', 'test'], mockData.items);
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 11 search results for "test"',
      );
    });
  });

  test('should render with error', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockReturnValue('test');

    mock
      .onGet(new RegExp('/search'))
      .reply(500, { message: 'Internal Server Error' });
    queryClient.setQueryData(['results', 'test'], null);

    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 0 search results for "test"',
      );
    });
  });
});
