import { caseData } from '@src/data/cases';
import axios from '@src/utils/axios';
import keycloak from '@src/utils/keycloak';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import useCasesApi from './use-cases-api';

interface ContextWrapperProps {
  children: React.ReactNode;
}

describe('useCasesApi', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  beforeEach(() => {
    mock.reset();
  });

  const contextWrapper = ({ children }: ContextWrapperProps) => (
    <AuthProvider {...keycloak}>
      <QueryClientProvider client={queryClient}>
        <Provider>{children}</Provider>
      </QueryClientProvider>
    </AuthProvider>
  );

  test('should call getCases successfully', async () => {
    const { result } = renderHook(() => useCasesApi(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.getCases.refetch();
    });
    expect(result.current.getCases).toBeDefined();
  });

  test('should call createCase successfully', async () => {
    const { result } = renderHook(() => useCasesApi(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.createCase.mutate(caseData.items[0]);
    });
    expect(result.current.createCase).toBeDefined();
  });

  test('should call updateCase successfully', async () => {
    const { result } = renderHook(() => useCasesApi(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.updateCase.mutate(caseData.items[0]);
    });
    expect(result.current.updateCase).toBeDefined();
  });

  test('should call deleteCase successfully', async () => {
    const { result } = renderHook(() => useCasesApi(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.deleteCase.mutate(1);
    });
    expect(result.current.deleteCase).toBeDefined();
  });
});
