import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep cache in memory for 10 minutes after unmount
      gcTime: 10 * 60 * 1000,
      // Retry failed queries up to 3 times
      retry: 3,
      // Do not refetch automatically when window regains focus
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Retry mutations once if they fail
      retry: 1,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};