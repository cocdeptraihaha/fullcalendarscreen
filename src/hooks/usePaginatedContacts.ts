import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchPaginatedContacts } from "../services/api";

export const usePaginatedContacts = (page: number = 1) => {
  return useQuery({
    queryKey: ["paginatedContacts", page],
    queryFn: () => fetchPaginatedContacts(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData, // Keep previous data while fetching new page (v5)
  });
};
