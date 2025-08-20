import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { fetchContacts, fetchAppointmentTypes } from "../../../services/api";

export default function ContactSection() {
  const [contacts, setContacts] = useState<{ id: number; name: string }[]>([]);
  const [appointmentTypes, setAppointmentTypes] = useState<
    { id: number; label: string; color: string }[]
  >([]);

  const [selectedContact, setSelectedContact] = useState<number | "">("");
  const [selectedType, setSelectedType] = useState<number | "">("");

  useEffect(() => {
    fetchContacts().then(setContacts).catch(console.error);
    fetchAppointmentTypes().then(setAppointmentTypes).catch(console.error);
  }, []);

  return (
    <Box display="flex" gap={2}>
      {/* Contact Dropdown */}
      <FormControl fullWidth size="small">
        <InputLabel id="contact-label">Search Contact</InputLabel>
        <Select
          labelId="contact-label"
          value={selectedContact}
          label="Search Contact"
          onChange={(e) => setSelectedContact(Number(e.target.value))}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {contacts.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Appointment Type Dropdown */}
      <FormControl fullWidth size="small">
        <InputLabel id="type-label">Appointment Type</InputLabel>
        <Select
          labelId="type-label"
          value={selectedType}
          label="Appointment Type"
          onChange={(e) => setSelectedType(Number(e.target.value))}
          renderValue={(value) => {
            const type = appointmentTypes.find((t) => t.id === value);
            if (!type) return "None";
            return (
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: type.color,
                  }}
                />
                {type.label}
              </Box>
            );
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {appointmentTypes.map((t) => (
            <MenuItem key={t.id} value={t.id}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: t.color,
                  }}
                />
                <ListItemText primary={t.label} />
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
