import axios from '@src/utils/axios';
import { act, renderHook } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { RecoilRoot } from 'recoil';
import { launchData } from '../data/launch';
import useApi from './use-api';

describe('useApi', () => {
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  test('should call getItems successfully', async () => {
    mock.onGet().reply(200, { results: [] });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  test('should call getItems with mock data', async () => {
    mock.onGet().reply(200, { results: launchData });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  test('should call getItems with error', async () => {
    mock.onGet().reply(500, { error: 'error' });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  test('should call getItem successfully', async () => {
    mock.onGet().reply(200, null);
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });

  test('should call getItem with mock data', async () => {
    mock.onGet().reply(200, launchData[0]);
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });

  test('should call getItem with error', async () => {
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
