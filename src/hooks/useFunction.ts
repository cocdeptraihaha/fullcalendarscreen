import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchStaff, searchContacts } from "../services/api";

// Search functions - fetch from server
export const useSearchStaff = (searchTerm: string) =>
  useQuery({
    queryKey: ["searchStaff", searchTerm],
    queryFn: () => fetchStaff(), // In real app: fetchStaffBySearch(searchTerm)
    enabled: searchTerm.length > 0,
    select: (data) =>
      data
        .filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5), // Only 5 results
  });

export const useSearchContacts = (searchTerm: string) =>
  useQuery({
    queryKey: ["searchContacts", searchTerm],
    queryFn: () => searchContacts(searchTerm),
    enabled: searchTerm.length > 0,
    select: (data) => (data || []).slice(0, 5),
    placeholderData: keepPreviousData,
  });
