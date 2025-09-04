import { useQuery } from "@tanstack/react-query";
import {
  fetchStaff,
  fetchContacts,
  fetchActiveAppointmentTypes,
} from "../services/api";

// Global cache - fetch once, use everywhere
export const useGlobalStaff = () =>
  useQuery({
    queryKey: ["staff"],
    queryFn: fetchStaff,
    staleTime: Infinity, // Cache forever
  });

export const useGlobalContacts = () =>
  useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
    staleTime: Infinity,
  });

export const useGlobalAppointmentTypes = () =>
  useQuery({
    queryKey: ["appointmentTypes"],
    queryFn: fetchActiveAppointmentTypes, // Only get active types
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

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
    queryFn: () => fetchContacts(),
    enabled: searchTerm.length > 0,
    select: (data) =>
      data
        .filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5),
  });
