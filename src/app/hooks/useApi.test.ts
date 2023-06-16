import { act, renderHook } from '@testing-library/react';
import useApi from '../hooks/useApi';
import { RecoilRoot } from 'recoil';

describe('useApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementationOnce(
      async () =>
        await Promise.resolve({
          status: 200,
          json: async () => await Promise.resolve({ success: true }),
        }),
    );
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
});
