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

export const contactSchema = yup.object({
  first_name: yup
    .string()
    .trim()
    .matches(/^[^0-9]*$/, "First name cannot contain numbers")
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  last_name: yup
    .string()
    .trim()
    .matches(/^[^0-9]*$/, "Last name cannot contain numbers")
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: yup
    .string()
    .trim()
    .matches(/^\+?[1-9][0-9]{7,14}$/, {
      message:
        "Please enter a valid international phone number (e.g., +84123456789)",
      excludeEmptyString: true,
    })
    .required("Phone number is required"),
});