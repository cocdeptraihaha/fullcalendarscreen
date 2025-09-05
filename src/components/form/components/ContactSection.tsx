import Dropdown from "../../ui/dropdown";
import { InputContainer, InputLabel, ContactContainer } from "./styled";
import { ErrorMessage } from "../Form.styled";
import { useFormContext, Controller } from "react-hook-form";
import { StyledDropdownAvatar } from "../../ui/dropdown/styled";
import { useContacts, useAppointmentTypes } from "../../../hooks/useData";
import { useCallback, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSearchContacts } from "../../../hooks/useFunction";

export default function ContactSection() {
  const mainForm = useFormContext();
  const {
    control,
    setValue,
    formState: { errors },
  } = mainForm;
  const [contactSearchTerm, setContactSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(contactSearchTerm, 500);

  const { data: contacts = [], isLoading: contactsLoading } = useContacts();
  const { data: appointmentTypes = [], isLoading: typesLoading } =
    useAppointmentTypes(); // Only get active types for form
  const { data: searchResults = [] } = useSearchContacts(debouncedSearchTerm);

  // Memoize contact change handler
  const handleContactChange = useCallback((val: any, field: any) => {
    field.onChange(val); // Store ID directly
  }, []);

  // Memoize appointment type change handler
  const handleTypeChange = useCallback(
    (val: any, field: any) => {
      const selectedType = appointmentTypes.find((t) => t.id === val);
      field.onChange(val); // Store ID directly
      setValue("title", `${selectedType?.label} Appointment`); // Always update title
      mainForm.trigger("title"); // Trigger validation to clear error
    },
    [appointmentTypes, setValue]
  );

  return (
    <ContactContainer>
      <InputContainer>
        <InputLabel>Search Contact</InputLabel>
        <Controller
          control={control}
          name="contact_id"
          render={({ field }) => {
            const displayContacts = contactSearchTerm
              ? searchResults.slice(0, 5)
              : contacts.slice(0, 5);
            const selectedContact = contacts.find((c) => c.id === field.value);

            return (
              <Dropdown
                hasSearch={1}
                Items={displayContacts}
                value={field.value}
                onChange={(val: any) => handleContactChange(val, field)}
                onSearch={setContactSearchTerm}
                renderTitle={() => (
                  <>
                    {contactsLoading ? (
                      "Loading contacts..."
                    ) : selectedContact ? (
                      <>
                        <StyledDropdownAvatar
                          src={selectedContact.avatar}
                          alt="avatar"
                        />
                        {selectedContact.name}
                      </>
                    ) : (
                      "Search Contact"
                    )}
                  </>
                )}
              />
            );
          }}
        />
        {errors.contact_id && (
          <ErrorMessage>{(errors.contact_id as any)?.message}</ErrorMessage>
        )}
      </InputContainer>

      <InputContainer>
        <InputLabel>Appointment Type</InputLabel>
        <Controller
          control={control}
          name="type_id"
          render={({ field }) => {
            const selectedType = appointmentTypes.find(
              (t) => t.id === field.value
            );

            return (
              <Dropdown
                Items={appointmentTypes} // Display all appointment types
                value={field.value}
                onChange={(val: any) => handleTypeChange(val, field)}
                renderTitle={() => (
                  <>
                    {typesLoading
                      ? "Loading types..."
                      : selectedType?.label || "Appointment Type"}
                  </>
                )}
              />
            );
          }}
        />
        {errors.type_id && (
          <ErrorMessage>{(errors.type_id as any)?.message}</ErrorMessage>
        )}
      </InputContainer>
    </ContactContainer>
  );
}
