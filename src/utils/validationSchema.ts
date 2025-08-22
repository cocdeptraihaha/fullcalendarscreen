import * as yup from "yup";

export const appointmentSchema = yup.object({
  id: yup.string().default(""),
  title: yup.string().required("Title is required"),
  type: yup.string().required("Appointment type is required"),
  contact: yup.string().required("Contact is required"),
  staff: yup.string().required("Staff is required"),
  services: yup.array().of(yup.string().required()).min(1, "At least one service is required").default([]),
  start: yup.string().required("Start date/time is required"),
  end: yup.string().required("End date/time is required"),
  color: yup.string().default(""),
});