import { fetchAppointments } from "../services/api";

// Generate next appointment ID by finding max ID + 1
export const generateAppointmentId = async (): Promise<string> => {
  try {
    const appointments = await fetchAppointments();
    const maxId = Math.max(...appointments.map((apt) => Number(apt.id) || 0));
    return String(maxId + 1);
  } catch (error) {
    return "1"; // fallback to 1 if error
  }
};
