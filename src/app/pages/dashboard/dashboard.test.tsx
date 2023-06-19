import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './dashboard';
import { RecoilRoot } from 'recoil';
import MockAdapter from 'axios-mock-adapter';
import * as useAuthMock from '../../hooks/useAuth';
import axios from '../../api/axios';
import { launchData } from '../../api/__mocks__/launch';
import { User } from '../../auth/types';

describe('Dashboard', () => {
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </RecoilRoot>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render with mock data', async () => {
    mock.onGet().reply(200, { results: launchData });
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    await act(async () => {
      const { baseElement } = render(
        <RecoilRoot>
          <BrowserRouter>
            <Dashboard />
          </BrowserRouter>
        </RecoilRoot>,
      );
      expect(baseElement).toBeTruthy();
    });
  });
});
