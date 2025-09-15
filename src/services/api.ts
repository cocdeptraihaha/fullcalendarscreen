import axios from "axios";

// TanStack Query API functions
const BASE_URL = "https://appointment-api-dl8s.onrender.com/api";
//const BASE_URL = "http://127.0.0.1:8000/api";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Centralized response/error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || error?.message || "Request failed";
    const normalizedError: any = new Error(
      `${status || "Network"}: ${message}`
    );
    normalizedError.status = status;
    normalizedError.data = error?.response?.data;
    return Promise.reject(normalizedError);
  }
);

// Fetch functions for TanStack Query
export const fetchAppointments = (): Promise<any[]> =>
  apiClient.get("/appointments").then((res) => res.data);

export const fetchAppointmentTypes = (): Promise<any[]> =>
  apiClient.get("/appointment_types").then((res) => res.data);

export const fetchContacts = (): Promise<any[]> =>
  apiClient.get("/contacts").then((res) => res.data);

// Search contacts with query parameter
export const searchContacts = (searchTerm: string): Promise<any[]> => {
  const params = searchTerm.trim() ? { search: searchTerm } : {};
  return apiClient.get("/contacts", { params }).then((res) => res.data);
};

// Laravel paginated contacts API
export const fetchPaginatedContacts = async (
  page: number = 1
): Promise<{
  data: any[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}> =>
  apiClient
    .get("/contacts/paginated", { params: { page } })
    .then((res) => res.data);

// Create new contact API
export const createContact = (contactData: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar?: string;
}): Promise<any> =>
  apiClient.post("/contacts", contactData).then((res) => res.data);

export const fetchStaff = (): Promise<any[]> =>
  apiClient.get("/staff").then((res) => res.data);

export const fetchServices = (): Promise<any[]> =>
  apiClient.get("/services").then((res) => res.data);

// Mutation functions for TanStack Query
export const createAppointment = (appointment: any): Promise<any> =>
  apiClient.post("/appointments", appointment).then((res) => res.data);

// 3) Cập nhật appointment: không cần gửi id trong body; gửi start/end nếu dùng từ React
export const updateAppointment = async (
  id: string,
  appointment: any
): Promise<any> =>
  apiClient.put(`/appointments/${id}`, appointment).then((res) => res.data);

export const deleteAppointment = (id: string): Promise<void> =>
  apiClient.delete(`/appointments/${id}`).then(() => {});

// Appointment Types API
export const createAppointmentType = (type: {
  label: string;
  color: string;
}): Promise<any> =>
  apiClient.post("/appointment_types", type).then((res) => res.data);

export const updateAppointmentType = async (
  id: string,
  type: { label: string; color: string }
): Promise<any> =>
  apiClient
    .put(`/appointment_types/${id}`, { ...type, id })
    .then((res) => res.data);

// 2) Xóa type: dùng DELETE (server đã soft delete)
export const deleteAppointmentType = (id: string): Promise<void> =>
  apiClient.delete(`/appointment_types/${id}`).then(() => {});
export const fetchActiveAppointmentTypes = (): Promise<any[]> =>
  apiClient
    .get("/appointment_types")
    .then((res) => res.data.filter((type: any) => !type.deleted_at));

// Settings API
export const fetchSettings = (): Promise<any> =>
  apiClient.get("/settings").then((res) => res.data);

// Staff visibility API
export const updateStaffVisible = async (
  id: string,
  visible: 0 | 1
): Promise<any> =>
  apiClient.put(`/staff/${id}`, { visible }).then((res) => res.data);
