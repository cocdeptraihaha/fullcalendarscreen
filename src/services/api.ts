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

// Fetch functions for TanStack Query
export const fetchAppointments = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get("/appointments");
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const fetchAppointmentTypes = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get("/appointment_types");
    return response.data; // đã chỉ trả loại chưa bị soft delete
  } catch (error) {
    console.error("Error fetching appointment types:", error);
    throw error;
  }
};

export const fetchContacts = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get("/contacts");
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// Search contacts with query parameter
export const searchContacts = async (searchTerm: string): Promise<any[]> => {
  try {
    const params = searchTerm.trim() ? { search: searchTerm } : {};
    const response = await apiClient.get("/contacts", { params });
    return response.data;
  } catch (error) {
    console.error("Error searching contacts:", error);
    throw error;
  }
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
}> => {
  try {
    const response = await apiClient.get("/contacts/paginated", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated contacts:", error);
    throw error;
  }
};

// Create new contact API
export const createContact = async (contactData: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar?: string;
}): Promise<any> => {
  try {
    const response = await apiClient.post("/contacts", contactData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating contact:", error);
    const errorMessage = error.response?.data?.message || "Unknown error";
    throw new Error(
      `Failed to create contact: ${
        error.response?.status || 500
      } - ${errorMessage}`
    );
  }
};

export const fetchStaff = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get("/staff");
    return response.data;
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error;
  }
};

export const fetchServices = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get("/services");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Mutation functions for TanStack Query
export const createAppointment = async (appointment: any): Promise<any> => {
  try {
    const response = await apiClient.post("/appointments", appointment);
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

// 3) Cập nhật appointment: không cần gửi id trong body; gửi start/end nếu dùng từ React
export const updateAppointment = async (
  id: string,
  appointment: any
): Promise<any> => {
  try {
    const response = await apiClient.put(`/appointments/${id}`, appointment);
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};

export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/appointments/${id}`);
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

// Appointment Types API
export const createAppointmentType = async (type: {
  label: string;
  color: string;
}): Promise<any> => {
  try {
    const response = await apiClient.post("/appointment_types", type);
    return response.data;
  } catch (error) {
    console.error("Error creating appointment type:", error);
    throw error;
  }
};

export const updateAppointmentType = async (
  id: string,
  type: { label: string; color: string }
): Promise<any> => {
  try {
    const response = await apiClient.put(`/appointment_types/${id}`, {
      ...type,
      id,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating appointment type:", error);
    throw error;
  }
};

// 2) Xóa type: dùng DELETE (server đã soft delete)
export const deleteAppointmentType = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/appointment_types/${id}`);
  } catch (error) {
    console.error("Error deleting appointment type:", error);
    throw error;
  }
};
export const fetchActiveAppointmentTypes = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get("/appointment_types");
    const types = response.data;
    return types.filter((type: any) => !type.deleted_at);
  } catch (error) {
    console.error("Error fetching active appointment types:", error);
    throw error;
  }
};

// Settings API
export const fetchSettings = async (): Promise<any> => {
  try {
    const response = await apiClient.get("/settings");
    return response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};

// Staff visibility API
export const updateStaffVisible = async (
  id: string,
  visible: 0 | 1
): Promise<any> => {
  try {
    const response = await apiClient.put(`/staff/${id}`, { visible });
    return response.data;
  } catch (error) {
    console.error("Error updating staff visibility:", error);
    throw error;
  }
};
