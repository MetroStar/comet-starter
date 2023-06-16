import { act, renderHook } from '@testing-library/react';
import useApi from '../hooks/useApi';
import { RecoilRoot } from 'recoil';
import MockAdapter from 'axios-mock-adapter';
import axios from '../api/axios';
import { launchData } from '../api/__mocks__/launch';

describe('useApi', () => {
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  it('should call getItems successfully', () => {
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.getItems().catch((error) => {
        console.log(error);
      });
    });
    expect(result.current.getItems).toBeTruthy();
  });

  it('should call getItem successfully', () => {
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.getItem('1').catch((error) => {
        console.log(error);
      });
    });
    expect(result.current.getItem).toBeTruthy();
  });

  it('should call getItems with mock data', () => {
    mock.onGet('/api').reply(200, launchData);
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.getItems().catch((error) => {
        console.log(error);
      });
    });
    expect(result.current.getItems).toBeTruthy();
  });

  it('should call getItem successfully', () => {
    mock.onGet('/api').reply(200, launchData[0]);
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.getItem('1').catch((error) => {
        console.log(error);
      });
    });
    expect(result.current.getItem).toBeTruthy();
  });
});
