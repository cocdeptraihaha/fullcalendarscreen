// TanStack Query API functions
const BASE_URL = "http://127.0.0.1:8000/api";

// Fetch all data in one request
export const fetchAllData = async (): Promise<{
  appointments: any[];
  appointment_types: any[];
  contacts: any[];
  staff: any[];
  services: any[];
  settings: any;
}> => {
  try {
    const res = await fetch(`${BASE_URL}/data`);
    if (!res.ok) throw new Error(`Failed to fetch all data: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching all data:", error);
    throw error;
  }
};

// Fetch functions for TanStack Query
export const fetchAppointments = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${BASE_URL}/appointments`);
    if (!res.ok) throw new Error(`Failed to fetch appointments: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const fetchAppointmentTypes = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/appointment_types`);
  if (!res.ok)
    throw new Error(`Failed to fetch appointment types: ${res.status}`);
  return await res.json(); // đã chỉ trả loại chưa bị soft delete
};

export const fetchContacts = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${BASE_URL}/contacts`);
    if (!res.ok) throw new Error(`Failed to fetch contacts: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const fetchStaff = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${BASE_URL}/staff`);
    if (!res.ok) throw new Error(`Failed to fetch staff: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error;
  }
};

export const fetchServices = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${BASE_URL}/services`);
    if (!res.ok) throw new Error(`Failed to fetch services: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Mutation functions for TanStack Query
export const createAppointment = async (appointment: any): Promise<any> => {
  console.log(appointment)
  try {
    const res = await fetch(`${BASE_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    });
    if (!res.ok) throw new Error(`Failed to create appointment: ${res.status}`);
    return await res.json();
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
  const res = await fetch(`${BASE_URL}/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment), // có thể chứa start/end, backend tự map
  });
  if (!res.ok) throw new Error(`Failed to update appointment: ${res.status}`);
  return await res.json();
};

export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete appointment: ${res.status}`);
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
    const res = await fetch(`${BASE_URL}/appointment_types`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(type),
    });
    if (!res.ok)
      throw new Error(`Failed to create appointment type: ${res.status}`);
    return await res.json();
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
    const res = await fetch(`${BASE_URL}/appointment_types/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...type, id }),
    });
    if (!res.ok)
      throw new Error(`Failed to update appointment type: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error updating appointment type:", error);
    throw error;
  }
};

// 2) Xóa type: dùng DELETE (server đã soft delete)
export const deleteAppointmentType = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/appointment_types/${id}`, {
    method: "DELETE",
  });
  if (!res.ok)
    throw new Error(`Failed to delete appointment type: ${res.status}`);
};
export const fetchActiveAppointmentTypes = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${BASE_URL}/appointment_types`);
    if (!res.ok)
      throw new Error(`Failed to fetch appointment types: ${res.status}`);
    const types = await res.json();
    return types.filter((type: any) => !type.deleted_at);
  } catch (error) {
    console.error("Error fetching active appointment types:", error);
    throw error;
  }
};

// Settings API
export const fetchSettings = async (): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/settings`);
    if (!res.ok) throw new Error(`Failed to fetch settings: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};

export const updateSettings = async (settings: any): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error(`Failed to update settings: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
};
