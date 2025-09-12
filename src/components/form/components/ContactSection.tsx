import Dropdown from "../../ui/dropdown";
import { InputContainer, InputLabel, ContactContainer } from "./styled";
import { ErrorMessage } from "../Form.styled";
import { useFormContext, Controller } from "react-hook-form";
import { StyledDropdownAvatar } from "../../ui/dropdown/styled";
import { useContacts, useAppointmentTypes } from "../../../hooks/useData";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
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

  // Access preloaded event data (full objects) from store
  const { eventData } = useSelector((state: RootState) => state.form);

  const { data: contacts = [], isLoading: contactsLoading } = useContacts();
  const { data: appointmentTypes = [], isLoading: typesLoading } =
    useAppointmentTypes(); // Only get active types for form
  const { data: searchResults = [] } = useSearchContacts(debouncedSearchTerm);

  // Normalize contact shape to include a unified `name`
  const normalizeContacts = useCallback(
    (list: any[]) =>
      (list || []).map((c: any) => ({
        ...c,
        name: c.name ?? [c.first_name, c.last_name].filter(Boolean).join(" "),
      })),
    []
  );

  const normalizedContacts = useMemo(
    () => normalizeContacts(contacts),
    [contacts, normalizeContacts]
  );
  const normalizedSearchResults = useMemo(
    () => normalizeContacts(searchResults),
    [searchResults, normalizeContacts]
  );

  // Memoize contact change handler
  const handleContactChange = useCallback((val: any, field: any) => {
    field.onChange(val); // Store ID directly
    setContactSearchTerm("");
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
            let baseList = contactSearchTerm
              ? normalizedSearchResults
              : normalizedContacts;
            // Ensure selected item is present in list for title consistency
            const selectedFromLists = [
              ...normalizedContacts,
              ...normalizedSearchResults,
            ].find((c) => c.id === field.value);
            const selectedFromEvent = eventData?.contact
              ? {
                  ...eventData.contact,
                  name:
                    eventData.contact.name ??
                    [eventData.contact.first_name, eventData.contact.last_name]
                      .filter(Boolean)
                      .join(" "),
                }
              : undefined;
            const selectedContact =
              selectedFromLists ||
              (selectedFromEvent && selectedFromEvent.id === field.value
                ? selectedFromEvent
                : undefined);
            const displayContacts = (
              selectedContact &&
              !baseList.some((c) => c.id === selectedContact.id)
                ? [selectedContact, ...baseList]
                : baseList
            ).slice(0, 5);

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
                        {selectedContact.name || "Unnamed"}
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
