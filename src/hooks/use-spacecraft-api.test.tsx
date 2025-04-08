import { mockData } from '@src/data/spacecraft';
import keycloak from '@src/utils/keycloak';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import useSpacecraftApi from './use-spacecraft-api';

interface ContextWrapperProps {
  children: React.ReactNode;
}

describe('useSpacecraftApi', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  const contextWrapper = ({ children }: ContextWrapperProps) => (
    <AuthProvider {...keycloak}>
      <QueryClientProvider client={queryClient}>
        <Provider>{children}</Provider>
      </QueryClientProvider>
    </AuthProvider>
  );

  test('should call getItems successfully', async () => {
    const { result } = renderHook(() => useSpacecraftApi(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.getItems.refetch();
    });
    expect(result.current.getItems).toBeDefined();
  });

  test('should call createItem successfully', async () => {
    const { result } = renderHook(() => useSpacecraftApi(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.createItem.mutate(mockData.items[0]);
    });
    expect(result.current.createItem).toBeDefined();
  });

  test('should call updateItem successfully', async () => {
    const { result } = renderHook(() => useSpacecraftApi(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.updateItem.mutate(mockData.items[0]);
    });
    expect(result.current.updateItem).toBeDefined();
  });

  test('should call deleteItem successfully', async () => {
    const { result } = renderHook(() => useSpacecraftApi(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.deleteItem.mutate(1);
    });
    expect(result.current.deleteItem).toBeDefined();
  });
});
