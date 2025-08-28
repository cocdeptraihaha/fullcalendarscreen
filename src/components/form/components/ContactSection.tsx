import Dropdown from "../../ui/dropdown";
import { InputContainer, InputLabel, ContactContainer } from "./styled";
import { ErrorMessage } from "../Form.styled";
import { useFormContext, Controller } from "react-hook-form";
import { StyledDropdownAvatar } from "../../ui/dropdown/styled";
import {
  useGlobalContacts,
  useGlobalAppointmentTypes,
  useSearchContacts,
} from "../../../hooks/useGlobalData";
import { useCallback, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

export default function ContactSection() {
  const mainForm = useFormContext();
  const {
    control,
    setValue,
    formState: { errors },
  } = mainForm;
  const [contactSearchTerm, setContactSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(contactSearchTerm, 300);

  const { data: contacts = [], isLoading: contactsLoading } =
    useGlobalContacts();
  const { data: appointmentTypes = [], isLoading: typesLoading } =
    useGlobalAppointmentTypes(); // Only get active types for form
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
      setValue("color", selectedType?.color);
      setValue("title", `${selectedType?.label} Appointment`); // Luôn cập nhật title
    },
    [appointmentTypes, setValue]
  );

  return (
    <ContactContainer>
      <InputContainer>
        {(!errors.contact_id && <InputLabel>Search Contact</InputLabel>) ||
          (errors.contact_id && (
            <ErrorMessage>{(errors.contact_id as any)?.message}</ErrorMessage>
          ))}
        <Controller
          control={control}
          name="contact_id"
          render={({ field }) => {
            const displayContacts = debouncedSearchTerm
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
      </InputContainer>

      <InputContainer>
        {(!errors.type_id && <InputLabel>Appointment Type</InputLabel>) ||
          (errors.type_id && (
            <ErrorMessage>{(errors.type_id as any)?.message}</ErrorMessage>
          ))}

        <Controller
          control={control}
          name="type_id"
          render={({ field }) => {
            const selectedType = appointmentTypes.find(
              (t) => t.id === field.value
            );

            return (
              <Dropdown
                Items={appointmentTypes} // Hiển thị tất cả appointment types
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
      </InputContainer>
    </ContactContainer>
  );
}
