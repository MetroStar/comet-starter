import { mockData } from '@src/data/case';
import axios from '@src/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../../components/header/header';
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
      <Provider>
        <BrowserRouter>
          <Header />
          <QueryClientProvider client={queryClient}>
            <SearchResults />
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

  afterEach(() => {
    vi.restoreAllMocks();
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
        'Found 0 search results for "All Cases"',
      );
    });
  });

  test('should render with 0 results with no search', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockReturnValue(null);
    mock.onGet(new RegExp('/cases')).reply(200, null);
    queryClient.setQueryData(['cases', null], null);

    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 0 search results for "All Cases"',
      );
    });
  });

  test('should render with 0 results with bad search', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'q') return 'abcd';
      return null;
    });
    mock.onGet(new RegExp('/cases')).reply(200, null);
    queryClient.setQueryData(['cases', 'abcd'], null);

    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 0 search results for "Search: abcd"',
      );
    });
  });

  // test('should render with 1 results', async () => {
  //   const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
  //   mockSearchParamsGet.mockImplementation((key: string) => {
  //     if (key === 'q') return 'sarah';
  //     return null;
  //   });

  //   mock.onGet(new RegExp('/cases')).reply(200, mockData.items.slice(0, 1));
  //   queryClient.setQueryData(['cases', 'sarah'], mockData.items.slice(0, 1));

  //   const { baseElement } = render(componentWrapper);
  //   await act(async () => {
  //     expect(baseElement.querySelector('h1')?.textContent).toEqual(
  //       'Found 1 search result for "Search: sarah"',
  //     );
  //   });
  // });

  test('should render with multiple results', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'q') return 's';
      return null;
    });
    //mock.onGet(new RegExp('/cases')).reply(200, mockData.items);
    queryClient.setQueryData(['cases', { q: 's' }], mockData.items);

    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 10 search results for "Search: s"',
      );
    });
  });

  test('should render with error', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'q') return 'test';
      return null;
    });
    mock.onGet(new RegExp('/cases')).networkError();
    queryClient.setQueryData(['cases'], null);

    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 0 search results for "Search: test"',
      );
    });
  });

  test('should filter results by multiple status values', async () => {
    const { baseElement } = render(componentWrapper);

    const statusApproved = await screen.findByLabelText('Approved');
    const statusDenied = await screen.findByLabelText('Denied');
    fireEvent.click(statusApproved);
    fireEvent.click(statusDenied);

    await act(async () => {
      // You may want to check for the correct number of cards or summary text
      expect(baseElement.querySelector('h1')?.textContent).toContain(
        'Status: Approved,Denied',
      );
    });
  });

  test('should filter results by multiple gender values', async () => {
    const { baseElement } = render(componentWrapper);

    const genderMale = await screen.findByLabelText('Male');
    const genderFemale = await screen.findByLabelText('Female');
    fireEvent.click(genderMale);
    fireEvent.click(genderFemale);

    await act(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toContain(
        'Gender: Male,Female',
      );
    });
  });

  test('should clear all filters when Clear is clicked', async () => {
    const { baseElement } = render(componentWrapper);

    const statusApproved = await screen.findByLabelText('Approved');
    fireEvent.click(statusApproved);

    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    fireEvent.click(clearBtn);

    // All filters should be reset
    await act(async () => {
      expect((statusApproved as HTMLInputElement).checked).toBe(false);
      // Optionally check other fields are cleared
      expect(baseElement.querySelector('input#id')?.textContent).toBe('');
    });
  });
});
