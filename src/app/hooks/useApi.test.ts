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

  it('should call getItems successfully', async () => {
    mock.onGet().reply(200, { results: [] });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  it('should call getItems with mock data', async () => {
    mock.onGet().reply(200, { results: launchData });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  it('should call getItems with error', async () => {
    mock.onGet().reply(500, { error: 'error' });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  it('should call getItem successfully', async () => {
    mock.onGet().reply(200, null);
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });

  it('should call getItem with mock data', async () => {
    mock.onGet().reply(200, launchData[0]);
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });

  it('should call getItem with error', async () => {
    mock.onGet().reply(500, { error: 'error' });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });
});
