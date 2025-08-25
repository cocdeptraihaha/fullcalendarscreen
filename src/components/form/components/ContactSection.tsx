import { useEffect, useState } from "react";
import Dropdown from "../../ui/dropdown";
import { fetchContacts, fetchAppointmentTypes } from "../../../services/api";
import { InputContainer, InputLabel, ContactContainer } from "./styled";
import { useFormContext, Controller } from "react-hook-form";
import { StyledDropdownAvatar } from "../../ui/dropdown/styled";

export default function ContactSection() {
  const [contacts, setContacts] = useState<
    { id: string; name: string; avatar: string }[]
  >([]);
  const [appointmentTypes, setAppointmentTypes] = useState<
    { id: string; label: string; color: string }[]
  >([]);

  const { control, setValue } = useFormContext(); // get context from FormProvider

  useEffect(() => {
    fetchContacts().then(setContacts).catch(console.error);
    fetchAppointmentTypes().then(setAppointmentTypes).catch(console.error);
  }, []);

  return (
    <ContactContainer>
      <InputContainer>
        <InputLabel>Search Contact</InputLabel>
        <Controller
          control={control}
          name="contact"
          render={({ field }) => (
            <Dropdown
              hasSearch={1}
              Items={contacts}
              value={field.value}
              onChange={(val: any) => {
                // Find selected contact by ID and update form with contact name
                const selectedContact = contacts.find((c) => c.id === val);
                field.onChange(selectedContact?.name); // Store name, not ID
              }}
              renderTitle={() => (
                <>
                  {field.value ? (
                    <>
                      <StyledDropdownAvatar
                        src={
                          contacts.find((c) => c.name === field.value)?.avatar
                        }
                        alt="avatar"
                      />
                      {field.value}
                    </>
                  ) : (
                    "Search Contact"
                  )}
                </>
              )}
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <InputLabel>Appointment Type</InputLabel>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Dropdown
              Items={appointmentTypes}
              value={field.value}
              onChange={(val: any) => {
                const selectedType = appointmentTypes.find((t) => t.id === val);
                field.onChange(selectedType?.label); // Update type field
                setValue("color", selectedType?.color); // Auto-set color based on type
                setValue("title", `${selectedType?.label} Appointment`); // Auto-generate title
              }}
              renderTitle={() => <>{field.value || "Appointment Type"}</>}
            />
          )}
        />
      </InputContainer>
    </ContactContainer>
  );
}
