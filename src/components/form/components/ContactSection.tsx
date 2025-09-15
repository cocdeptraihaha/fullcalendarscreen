import Dropdown from "../../ui/dropdown";
import { InputContainer, InputLabel, ContactContainer } from "./styled";
import { ErrorMessage } from "../Form.styled";
import { useFormContext, Controller } from "react-hook-form";
import Avatar from "../../ui/avatar";
import { useAppointmentTypes } from "../../../hooks/useData";
import { useCallback, useMemo, useState, useRef } from "react";
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
  const selectedContactRef = useRef<any>(null);
  const debouncedSearchTerm = useDebounce(contactSearchTerm, 500);

  // Access preloaded event data (full objects) from store
  const { eventData } = useSelector((state: RootState) => state.form);

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

  const normalizedSearchResults = useMemo(
    () => normalizeContacts(searchResults),
    [searchResults, normalizeContacts]
  );

  // Memoize contact change handler
  const handleContactChange = useCallback(
    (val: any, field: any) => {
      field.onChange(val); // Store ID directly
      // Store selected contact in ref to prevent loss during rerender
      const selectedContact = normalizedSearchResults.find((c) => c.id === val);
      if (selectedContact) {
        selectedContactRef.current = selectedContact;
      }
      // Clear search term after a short delay
      setTimeout(() => {
        setContactSearchTerm("");
      }, 200);
    },
    [normalizedSearchResults]
  );

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
            // Use search results (server search)
            const baseList = normalizedSearchResults;

            // Find selected contact from various sources
            const selectedFromLists = baseList.find(
              (c) => c.id === field.value
            );
            const selectedFromRef =
              selectedContactRef.current?.id === field.value
                ? selectedContactRef.current
                : null;
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
              selectedFromRef ||
              (selectedFromEvent && selectedFromEvent.id === field.value
                ? selectedFromEvent
                : undefined);

            // Always include selected contact in display list
            const displayContacts =
              selectedContact &&
              !baseList.some((c) => c.id === selectedContact.id)
                ? [selectedContact, ...baseList]
                : baseList;

            return (
              <Dropdown
                hasSearch={1}
                Items={displayContacts}
                value={field.value}
                onChange={(val: any) => handleContactChange(val, field)}
                onSearch={setContactSearchTerm}
                renderTitle={() => (
                  <>
                    {selectedContact ? (
                      <>
                        <Avatar
                          src={selectedContact.avatar}
                          name={selectedContact.name || "Unnamed"}
                          size={30}
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
