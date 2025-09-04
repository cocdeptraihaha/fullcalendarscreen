import { useQuery } from "@tanstack/react-query";
import { fetchStaff, fetchServices } from "../services/api";

// Query keys
export const FORM_QUERY_KEYS = {
  services: ["services"],
  staff: ["staff"],
} as const;

// Services query
export const useServices = () => {
  return useQuery({
    queryKey: FORM_QUERY_KEYS.services,
    queryFn: fetchServices,
    staleTime: 10 * 60 * 1000,
  });
};

// Staff query (needed for useServicesByStaff)
const useStaff = () => {
  return useQuery({
    queryKey: FORM_QUERY_KEYS.staff,
    queryFn: fetchStaff,
    staleTime: 10 * 60 * 1000,
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
