import { useQuery } from '@tanstack/react-query';
import { 
  fetchStaff, 
  fetchServices, 
  fetchContacts, 
  fetchAppointmentTypes,
  fetchActiveAppointmentTypes
} from '../services/api';

// Global cache - fetch once, use everywhere
export const useGlobalStaff = () => useQuery({
  queryKey: ['staff'],
  queryFn: fetchStaff,
  staleTime: Infinity, // Cache forever
});

export const useGlobalServices = () => useQuery({
  queryKey: ['services'],
  queryFn: fetchServices,
  staleTime: Infinity,
});

export const useGlobalContacts = () => useQuery({
  queryKey: ['contacts'],
  queryFn: fetchContacts,
  staleTime: Infinity,
});

export const useGlobalAppointmentTypes = () => useQuery({
  queryKey: ['appointmentTypes'],
  queryFn: fetchActiveAppointmentTypes, // Chỉ lấy active types
  staleTime: Infinity,
});

export const useAllAppointmentTypes = () => useQuery({
  queryKey: ['appointmentTypes', 'all'],
  queryFn: fetchAppointmentTypes, // Lấy tất cả (cho settings)
  staleTime: Infinity,
});

// Search functions - fetch from server
export const useSearchStaff = (searchTerm: string) => useQuery({
  queryKey: ['searchStaff', searchTerm],
  queryFn: () => fetchStaff(), // In real app: fetchStaffBySearch(searchTerm)
  enabled: searchTerm.length > 0,
  select: (data) => data
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5), // Only 5 results
});

export const useSearchServices = (searchTerm: string) => useQuery({
  queryKey: ['searchServices', searchTerm],
  queryFn: () => fetchServices(),
  enabled: searchTerm.length > 0,
  select: (data) => data
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5),
});

export const useSearchContacts = (searchTerm: string) => useQuery({
  queryKey: ['searchContacts', searchTerm],
  queryFn: () => fetchContacts(),
  enabled: searchTerm.length > 0,
  select: (data) => data
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5),
});