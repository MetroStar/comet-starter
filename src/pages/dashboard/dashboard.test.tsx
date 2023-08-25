import axios from '@src/utils/axios';
import { act, render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { User } from '../../types/user';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </RecoilRoot>
    </AuthProvider>
  );

  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
      expect(baseElement.querySelector('h1')?.textContent).toEqual(
        'My Dashboard',
      );
    });
  });

  test('should render with mock data', async () => {
    mock.onGet().reply(200, { results: [] });
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('h1')?.textContent).toEqual(
      'My Dashboard',
    );
    expect(baseElement.querySelectorAll('.VictoryContainer')).toHaveLength(2);
    expect(baseElement.querySelector('.usa-table')).toBeDefined();
    expect(
      baseElement.querySelectorAll('.usa-table > tbody > tr'),
    ).toHaveLength(0);
  });

  test('should render with error', async () => {
    mock.onGet().networkError();
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('h1')?.textContent).toEqual(
      'My Dashboard',
    );
    expect(baseElement.querySelector('.usa-alert')).toBeDefined();
    expect(baseElement.querySelector('.usa-alert--error')).toBeDefined();
  });
});
