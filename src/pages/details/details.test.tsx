import { mockData } from '@src/data/spacecraft';
import axios from '@src/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { User } from '../../types/user';
import { Details } from './details';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

describe('Details', () => {
  const queryClient = new QueryClient();
  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Details />
          </QueryClientProvider>
        </BrowserRouter>
      </RecoilRoot>
    </AuthProvider>
  );

  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
    queryClient.setDefaultOptions({
      queries: {
        retry: false, // Disable retries for tests
      },
    });
  });

  beforeEach(() => {
    queryClient.clear();
  });

  test('should render successfully', async () => {
    mock.onGet(new RegExp('/spacecraft/*')).reply(200, mockData.items[0]);
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
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
