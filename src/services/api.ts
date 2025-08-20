// JSON Server base URL (see db.json). Run with: `npm run json-server` (port 4000)
const BASE_URL = 'http://localhost:4000';

// Data fetching helpers for json-server endpoints.
// Keep API calls centralized to avoid scattering fetch logic across components.

export const fetchAppointments = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/appointments`);
  if (!res.ok) throw new Error('Failed to fetch appointments');
  return res.json();
};

export const fetchAppointmentTypes = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/appointment_types`);
  if (!res.ok) throw new Error('Failed to fetch appointment types');
  return res.json();
};

export const fetchContacts = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/contacts`);
  if (!res.ok) throw new Error('Failed to fetch contacts');
  return res.json();
};

export const fetchStaff = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/staff`);
  if (!res.ok) throw new Error('Failed to fetch staff');
  return res.json();
};

export const fetchServices = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
};