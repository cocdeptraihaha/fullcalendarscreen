import * as yup from "yup";

export const appointmentSchema = yup.object({
  id: yup.string().default(""),
  title: yup.string().trim().required("Title is required"),
  type_id: yup.string().required("Appointment type is required"),
  contact_id: yup.string().required("Contact is required"),
  staff_id: yup.string().required("Staff is required"),
  service_ids: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one service is required")
    .default([]),
  start: yup.string().required("Start date/time is required"),
  end: yup
    .string()
    .required("End date/time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { start } = this.parent;
        if (!start || !value) return true;
        return new Date(value) > new Date(start);
      }
    ),
});
