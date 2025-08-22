import axios from '@src/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
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

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await waitFor(async () => {
      expect(baseElement).toBeTruthy();
    });
  });

  test('should render with 0 results', async () => {
    const { baseElement } = render(componentWrapper);
    await waitFor(async () => {
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
    await waitFor(async () => {
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
    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 0 search results for "Search: abcd"',
      );
    });
  });

  test('should render with 1 results', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'q') return 'sarah';
      return null;
    });

    //mock.onGet(new RegExp('/cases')).reply(200, mockData.items.slice(0, 1));
    // queryClient.setQueryData(
    //   ['cases', { q: 'sarah' }],
    //   mockData.items.slice(0, 1),
    // );

    const { baseElement } = render(componentWrapper);
    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 1 search result for "Search: sarah"',
      );
    });
  });

  test('should render with multiple results', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'q') return 's';
      return null;
    });
    // mock.onGet(new RegExp('/cases')).reply(200, mockData.items);
    // queryClient.setQueryData(['cases', { q: 's' }], mockData.items);

    const { baseElement } = render(componentWrapper);
    await waitFor(async () => {
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
    // mock.onGet(new RegExp('/cases')).networkError();
    // queryClient.setQueryData(['cases'], null);

    const { baseElement } = render(componentWrapper);
    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 0 search results for "Search: test"',
      );
    });
  });

  test('should filter results by multiple status values', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'status') return ['Approved', 'Denied'].join(',');
      return null;
    });

    const { baseElement } = render(componentWrapper);

    const statusApproved = await screen.findByLabelText('Approved');
    const statusDenied = await screen.findByLabelText('Denied');
    fireEvent.click(statusApproved);
    fireEvent.click(statusDenied);

    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 1 search result for "Status: Approved,Denied"',
      );
    });

    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    fireEvent.click(clearBtn);
  });

  test('should filter results by multiple status values', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'status') return ['Approved', 'Denied'].join(',');
      return null;
    });

    const { baseElement } = render(componentWrapper);

    const statusApproved = await screen.findByLabelText('Approved');
    const statusDenied = await screen.findByLabelText('Denied');
    fireEvent.click(statusApproved);
    fireEvent.click(statusDenied);

    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'Found 1 search result for "Status: Approved,Denied"',
      );
    });

    fireEvent.click(statusApproved);
    fireEvent.click(statusDenied);
  });

  test('should filter results by multiple gender values', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'gender') return ['Male', 'Female'].join(',');
      return null;
    });

    const { baseElement } = render(componentWrapper);

    const genderMale = await screen.findByLabelText('Male');
    const genderFemale = await screen.findByLabelText('Female');
    fireEvent.click(genderMale);
    fireEvent.click(genderFemale);

    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toContain(
        'Found 19 search results for "Gender: Male,Female"',
      );
    });
  });

  test('should filter results by male gender', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'gender') return 'Male';
      return null;
    });

    const { baseElement } = render(componentWrapper);

    const genderFemale = await screen.findByLabelText('Female');
    fireEvent.click(genderFemale); //Deselect Female checkbox from previous test

    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toContain(
        'Found 9 search results for "Gender: Male"',
      );
    });

    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    fireEvent.click(clearBtn);
  });

  test('should clear all filters when Clear is clicked', async () => {
    const { baseElement } = render(componentWrapper);

    const statusApproved = await screen.findByLabelText('Approved');
    fireEvent.click(statusApproved);

    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    fireEvent.click(clearBtn);

    await waitFor(async () => {
      expect((statusApproved as HTMLInputElement).checked).toBe(false);
      expect(baseElement.querySelector('input#id')?.textContent).toBe('');
      expect(baseElement.querySelector('h1')?.textContent).toContain(
        'Found 19 search results for "All Cases"',
      );
    });
  });

  test('should filter results by case ID', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'case_id') return '123';
      return null;
    });

    const { baseElement } = render(componentWrapper);

    const caseIdInput = await screen.findByLabelText('Case ID');
    fireEvent.change(caseIdInput, { target: { defaultValue: '123' } });

    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toContain(
        'Found 0 search results for "Case ID: 123"',
      );
    });

    fireEvent.change(caseIdInput, { target: { defaultValue: '' } });
  });

  test('should filter results by created after date', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'created_after') return '2024-01-01';
      return null;
    });

    const { baseElement } = render(componentWrapper);

    const createdAfterInput = await screen.findByLabelText('Created After');
    fireEvent.change(createdAfterInput, {
      target: { defaultValue: '2024-01-01' },
    });

    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toContain(
        'Found 5 search results for "Created After: 2024-01-01"',
      );
    });

    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    fireEvent.click(clearBtn);
  });

  test('should filter results by created before date', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'created_before') return '2023-12-31';
      return null;
    });

    const { baseElement } = render(componentWrapper);

    const createdBeforeInput = await screen.findByLabelText('Created Before');
    fireEvent.change(createdBeforeInput, {
      target: { defaultValue: '2023-12-31' },
    });

    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toContain(
        'Found 14 search results for "Created Before: 2023-12-31"',
      );
    });

    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    fireEvent.click(clearBtn);
  });

  test('should clear created after and created before dates', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'created_after') return '';
      if (key === 'created_before') return '';
      return null;
    });
    const { baseElement } = render(componentWrapper);

    const createdAfterInput = await screen.findByLabelText('Created After');
    fireEvent.change(createdAfterInput, {
      target: { defaultValue: '2023-01-01' },
    });
    fireEvent.change(createdAfterInput, { target: { defaultValue: '' } });

    const createdBeforeInput = await screen.findByLabelText('Created Before');
    fireEvent.change(createdBeforeInput, {
      target: { defaultValue: '2023-01-01' },
    });
    fireEvent.change(createdBeforeInput, { target: { defaultValue: '' } });

    await waitFor(() => {
      // Your assertion here, e.g.:
      expect(baseElement.querySelector('h1')?.textContent).toContain(
        'Found 19 search results for "All Cases"',
      );
    });

    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    fireEvent.click(clearBtn);
  });

  test('should filter results based on multiple filters', async () => {
    const mockSearchParamsGet = vi.spyOn(URLSearchParams.prototype, 'get');
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === 'case_id') return '100001';
      if (key === 'gender') return 'Male';
      if (key === 'status') return 'Not Started';
      if (key === 'created_after') return '2024-01-01';
      if (key === 'created_before') return '2024-03-01';
      return null;
    });

    const { baseElement } = render(componentWrapper);

    const caseIdInput = await screen.findByLabelText('Case ID');
    fireEvent.change(caseIdInput, { target: { defaultValue: '100001' } });

    const genderMale = await screen.findByLabelText('Male');
    fireEvent.click(genderMale);

    const statusNotStarted = await screen.findByLabelText('Not Started');
    fireEvent.click(statusNotStarted);

    const createdAfterInput = await screen.findByLabelText('Created After');
    fireEvent.change(createdAfterInput, {
      target: { defaultValue: '2024-01-01' },
    });

    const createdBeforeInput = await screen.findByLabelText('Created Before');
    fireEvent.change(createdBeforeInput, {
      target: { defaultValue: '2024-03-01' },
    });

    await waitFor(async () => {
      expect(baseElement.querySelector('h1')?.textContent).toContain(
        'Found 1 search result for "Case ID: 100001; Gender: Male; Status: Not Started; Created Before: 2024-03-01; Created After: 2024-01-01"',
      );
    });

    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    fireEvent.click(clearBtn);
  });
});
