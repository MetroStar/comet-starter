import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './dashboard';
import { RecoilRoot } from 'recoil';
import MockAdapter from 'axios-mock-adapter';
import * as useAuthMock from '../../hooks/useAuth';
import axios from '../../axios';
import { User } from '../../types/user';

describe('Dashboard', () => {
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  test('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </RecoilRoot>,
    );
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('h1')?.textContent).toEqual('My Dashboard');
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

    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </RecoilRoot>,
    );
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('h1')?.textContent).toEqual('My Dashboard');
    expect(baseElement.querySelectorAll('.VictoryContainer')).toHaveLength(2);
    expect(baseElement.querySelector('.usa-table')).toBeDefined();
    expect(baseElement.querySelectorAll('.usa-table > tbody > tr')).toHaveLength(0);
  });

  test('should render with error', async () => {
    mock.onGet().networkError();
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </RecoilRoot>,
    );
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('h1')?.textContent).toEqual('My Dashboard');
    expect(baseElement.querySelector('.usa-alert')).toBeDefined();
    expect(baseElement.querySelector('.usa-alert--error')).toBeDefined();
  });
});
