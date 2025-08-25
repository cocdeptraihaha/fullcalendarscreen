// JSON Server base URL (see db.json). Run with: `npm run server` (port 4000)
const BASE_URL = "https://json-server-io3p.onrender.com";

// Data fetching helpers for json-server endpoints.
// Keep API calls centralized to avoid scattering fetch logic across components.

export const fetchAppointments = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/appointments`);
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
};

export const fetchAppointmentTypes = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/appointment_types`);
  if (!res.ok) throw new Error("Failed to fetch appointment types");
  return res.json();
};

export const fetchContacts = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/contacts`);
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
};

export const fetchStaff = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/staff`);
  if (!res.ok) throw new Error("Failed to fetch staff");
  return res.json();
};

export const fetchServices = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/services`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
};

// CRUD operations for appointments
export const createAppointment = async (appointment: any): Promise<any> => {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment),
  });
  if (!res.ok) throw new Error("Failed to create appointment");
  return res.json();
};

export const updateAppointment = async (
  id: string,
  appointment: any
): Promise<any> => {
  // Keep ID as string to match database format
  const appointmentWithId = { ...appointment, id };
  const res = await fetch(`${BASE_URL}/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentWithId),
  });
  if (!res.ok) throw new Error("Failed to update appointment");
  return res.json();
};

export const deleteAppointment = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/appointments/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete appointment");
};
