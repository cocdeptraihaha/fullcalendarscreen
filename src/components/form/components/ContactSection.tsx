import Dropdown from "../../ui/dropdown";
import { InputContainer, InputLabel, ContactContainer } from "./styled";
import { ErrorMessage } from "../Form.styled";
import { useFormContext, Controller } from "react-hook-form";
import { StyledDropdownAvatar } from "../../ui/dropdown/styled";
import { useContacts, useAppointmentTypes } from "../../../hooks/useFormData";
import { useCallback } from "react";

export default function ContactSection() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { data: contacts = [], isLoading: contactsLoading } = useContacts();
  const { data: appointmentTypes = [], isLoading: typesLoading } =
    useAppointmentTypes();

  // Memoize contact change handler
  const handleContactChange = useCallback(
    (val: any, field: any) => {
      const selectedContact = contacts.find((c) => c.id === val);
      field.onChange(selectedContact?.name);
    },
    [contacts]
  );

  // Memoize appointment type change handler
  const handleTypeChange = useCallback(
    (val: any, field: any) => {
      const selectedType = appointmentTypes.find((t) => t.id === val);
      field.onChange(selectedType?.label);
      setValue("color", selectedType?.color);
      setValue("title", `${selectedType?.label} Appointment`);
    },
    [appointmentTypes, setValue]
  );

  return (
    <ContactContainer>
      <InputContainer>
        {(!errors.contact && <InputLabel>Search Contact</InputLabel>) ||
          (errors.contact && (
            <ErrorMessage>{(errors.contact as any)?.message}</ErrorMessage>
          ))}
        <Controller
          control={control}
          name="contact"
          render={({ field }) => (
            <Dropdown
              hasSearch={1}
              Items={contacts}
              value={field.value}
              onChange={(val: any) => handleContactChange(val, field)}
              renderTitle={() => (
                <>
                  {contactsLoading ? (
                    "Loading contacts..."
                  ) : field.value ? (
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
        {(!errors.type && <InputLabel>Appointment Type</InputLabel>) ||
          (errors.type && (
            <ErrorMessage>{(errors.type as any)?.message}</ErrorMessage>
          ))}

        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            // Find current type by label to get ID for dropdown value
            const currentType = appointmentTypes.find(
              (t) => t.label === field.value
            );
            return (
              <Dropdown
                Items={appointmentTypes}
                value={currentType?.id || ""}
                onChange={(val: any) => handleTypeChange(val, field)}
                renderTitle={() => (
                  <>
                    {typesLoading
                      ? "Loading types..."
                      : field.value || "Appointment Type"}
                  </>
                )}
              />
            );
          }}
        />
      </InputContainer>
    </ContactContainer>
  );
}
