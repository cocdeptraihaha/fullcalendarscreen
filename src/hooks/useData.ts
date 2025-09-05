import { useQuery } from "@tanstack/react-query";
import {
  fetchAppointments,
  fetchStaff,
  fetchServices,
  fetchContacts,
  fetchSettings,
  fetchActiveAppointmentTypes,
} from "../services/api";

// Query keys
export const QUERY_KEYS = {
  appointments: ["appointments"],
  appointmentTypes: ["appointmentTypes"],
  contacts: ["contacts"],
  staff: ["staff"],
  services: ["services"],
  settings: ["settings"],
} as const;

// Appointments query
export const useAppointments = () => {
  return useQuery({
    queryKey: QUERY_KEYS.appointments,
    queryFn: fetchAppointments,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
// AppointmentTypes query
export const useAppointmentTypes = () => {
  return useQuery({
    queryKey: QUERY_KEYS.appointmentTypes,
    queryFn: fetchActiveAppointmentTypes,
    staleTime: 5 * 60 * 1000,
  });
};
// Contacts query
export const useContacts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.contacts,
    queryFn: fetchContacts,
    staleTime: 5 * 60 * 1000,
  });
};

// Staff query (needed for useServicesByStaff)
export const useStaff = () => {
  return useQuery({
    queryKey: QUERY_KEYS.staff,
    queryFn: fetchStaff,
    staleTime: 5 * 60 * 1000,
  });
};

// Services query
export const useServices = () => {
  return useQuery({
    queryKey: QUERY_KEYS.services,
    queryFn: fetchServices,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    staleTime: 5 * 60 * 1000,
  });
};
// Services by staff query - filter from local data
export const useServicesByStaff = (staffId: string) => {
  const { data: allServices = [] } = useServices();
  const { data: staffList = [] } = useStaff();

  const selectedStaff = staffList.find((s) => s.id === staffId);
  const filteredServices = selectedStaff?.service_ids
    ? allServices.filter((service) =>
        selectedStaff.service_ids.includes(service.id)
      )
    : [];

  return {
    data: filteredServices,
    isLoading: false,
    error: null,
  };
};
