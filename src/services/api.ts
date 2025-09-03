// TanStack Query API functions
const BASE_URL = "http://127.0.0.1:8000/api/data";

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
  try {
    const res = await fetch(`${BASE_URL}/appointment_types`);
    if (!res.ok)
      throw new Error(`Failed to fetch appointment types: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching appointment types:", error);
    throw error;
  }
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

export const getServicesByStaffId = async (staffId: string): Promise<any[]> => {
  try {
    const services = await fetchServices();
    const staff = await fetchStaff();

    const selectedStaff = staff.find((s: any) => s.id === staffId);
    if (!selectedStaff || !selectedStaff.service_ids) {
      return [];
    }

    return services.filter((service: any) =>
      selectedStaff.service_ids.includes(service.id)
    );
  } catch (error) {
    console.error("Error fetching services by staff ID:", error);
    throw error;
  }
};

// Mutation functions for TanStack Query
export const createAppointment = async (appointment: any): Promise<any> => {
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

export const updateAppointment = async (
  id: string,
  appointment: any
): Promise<any> => {
  try {
    const appointmentWithId = { ...appointment, id };
    const res = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentWithId),
    });
    if (!res.ok) throw new Error(`Failed to update appointment: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
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

export const deleteAppointmentType = async (id: string): Promise<void> => {
  try {
    // Get current data first
    const getRes = await fetch(`${BASE_URL}/appointment_types/${id}`);
    if (!getRes.ok)
      throw new Error(`Failed to fetch appointment type: ${getRes.status}`);
    const currentType = await getRes.json();

    // Update with deleted_at, keep all other properties
    const res = await fetch(`${BASE_URL}/appointment_types/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...currentType,
        deleted_at: new Date().toISOString(),
      }),
    });
    if (!res.ok)
      throw new Error(`Failed to delete appointment type: ${res.status}`);
  } catch (error) {
    console.error("Error deleting appointment type:", error);
    throw error;
  }
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
