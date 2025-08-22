import { fetchAppointments } from "../services/api";

// Generate next appointment ID by finding max ID + 1
export const generateAppointmentId = async (): Promise<number> => {
  try {
    const appointments = await fetchAppointments();
    const maxId = Math.max(...appointments.map(apt => Number(apt.id) || 0));
    return maxId + 1;
  } catch (error) {
    console.error("Error generating ID:", error);
    return 1; // fallback to 1 if error
  }
};