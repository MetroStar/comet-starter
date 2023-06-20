import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Details } from './details';
import { RecoilRoot } from 'recoil';
import MockAdapter from 'axios-mock-adapter';
import * as useAuthMock from '../../hooks/useAuth';
import axios from '../../api/axios';
import { launchData } from '../../api/__mocks__/launch';
import { User } from '../../auth/types';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

describe('Details', () => {
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  test('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      </RecoilRoot>,
    );
    expect(baseElement).toBeTruthy();
  });

  test('should render with mock data', async () => {
    mock.onGet().reply(200, launchData[0]);
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
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('h1')?.textContent).toEqual('Launch Details');
    expect(baseElement.querySelectorAll('#details-card li')).toHaveLength(5);
  });

  test('should render with error', async () => {
    mock.onGet().networkError();
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      </RecoilRoot>,
    );
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('h1')?.textContent).toEqual('Launch Details');
    expect(baseElement.querySelector('.usa-alert')).toBeDefined();
    expect(baseElement.querySelector('.usa-alert--error')).toBeDefined();
  });
});
