import { useQuery } from '@tanstack/react-query';
import { fetchAllData } from '../services/api';

export const useAllData = () => useQuery({
  queryKey: ['allData'],
  queryFn: fetchAllData,
  staleTime: 5 * 60 * 1000, // 5 minutes
});