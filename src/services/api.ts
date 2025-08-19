export const fetchAppointments = async () => {
  const response = await fetch('http://localhost:4000/appointments');
  return response.json();
};