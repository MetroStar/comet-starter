import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Details } from './details';
import { RecoilRoot } from 'recoil';
import MockAdapter from 'axios-mock-adapter';
import * as useAuthMock from '../../hooks/useAuth';
import axios from '../../api/axios';
import { launchData } from '../../api/__mocks__/launch';
import { User } from '../../auth/types';

describe('Details', () => {
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      </RecoilRoot>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render with mock data', () => {
    mock.onGet('/api').reply(200, launchData[0]);
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
          <Details />
        </BrowserRouter>
      </RecoilRoot>,
    );
    expect(baseElement).toBeTruthy();
  });
});
