import { useState, useCallback, useEffect, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  closeSettings,
  toggleContactVisibility,
  loadSettings,
} from "../../store/settingsSlice";
import {
  useGlobalContacts,
  useAllAppointmentTypes,
} from "../../hooks/useGlobalData";
import {
  useCreateAppointmentType,
  useUpdateAppointmentType,
  useDeleteAppointmentType,
} from "../../hooks/useAppointmentTypes";
import { useSettings, useUpdateSettings } from "../../hooks/useSettings";
import { X, Plus, Check, Trash2 } from "react-feather";
import { toast } from "react-toastify";
import {
  SettingsContainer,
  SettingsModal,
  ModalHeader,
  CloseBtn,
  ModalContent,
  SettingsSidebar,
  SidebarItem,
  ContentArea,
  ModalBody,
  Section,
  ContactItem,
  ContactCheckbox,
  ContactName,
  TypeItem,
  ColorPicker,
  AddButton,
  CancelButton,
  TypeInput,
  TypeLabel,
  IconButton,
  FooterContainer,
} from "./Settings.styled";
import { ToastButton, ToastContainer } from "../form/Form.styled";

export default function Settings() {
  const dispatch = useDispatch();
  const { open, visibleContacts, isLoaded } = useSelector((state: RootState) => state.settings);
  const { data: contacts = [] } = useGlobalContacts();
  const { data: appointmentTypes = [] } = useAllAppointmentTypes();
  const { data: settings } = useSettings();
  const updateSettingsMutation = useUpdateSettings();

  const createMutation = useCreateAppointmentType();
  const updateMutation = useUpdateAppointmentType();
  const deleteMutation = useDeleteAppointmentType();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeColor, setNewTypeColor] = useState("#3498db");

  const [activeSection, setActiveSection] = useState("contacts");
  const [contactUpdates, setContactUpdates] = useState<string[] | null>(null);
  const [colorUpdates, setColorUpdates] = useState<{[key: string]: {label: string, color: string}}>({});
  
  const debouncedContactUpdates = useDebounce(contactUpdates, 500);
  const debouncedColorUpdates = useDebounce(colorUpdates, 500);
  
  const colorProcessedRef = useRef<string>("");
  const contactProcessedRef = useRef<string>("");

  const sections = [
    { id: "contacts", label: "General setting" },
    { id: "types", label: "Appointment types" },
  ];

  // Load settings from server on mount
  useEffect(() => {
    if (settings && !isLoaded) {
      dispatch(loadSettings(settings));
    }
  }, [settings, isLoaded, dispatch]);

  const handleContactToggle = useCallback((contactId: string) => {
    dispatch(toggleContactVisibility(contactId));
    
    const newVisibleContacts = visibleContacts.includes(contactId)
      ? visibleContacts.filter(id => id !== contactId)
      : [...visibleContacts, contactId];
    
    setContactUpdates(newVisibleContacts);
  }, [dispatch, visibleContacts]);

  const isContactVisible = (contactId: string) => {
    return visibleContacts.includes(contactId);
  };

  const handleClose = () => {
    dispatch(closeSettings());
    setShowAddForm(false);
    setNewTypeName("");
    setNewTypeColor("#3498db");
  };

  const handleCreateType = async () => {
    if (!newTypeName.trim()) {
      toast.error("Please enter a type name");
      return;
    }

    // Check for duplicate name
    const existingType = appointmentTypes.find(
      (type: any) => !type.deleted_at && type.label.toLowerCase() === newTypeName.trim().toLowerCase()
    );
    
    if (existingType) {
      toast.error("Type name already exists");
      return;
    }

    try {
      await createMutation.mutateAsync({
        label: newTypeName.trim(),
        color: newTypeColor,
      });
      setNewTypeName("");
      setNewTypeColor("#3498db");
      setShowAddForm(false);
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handleDeleteType = (typeId: string) => {
    toast.dismiss();
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this appointment type?</p>
          <ToastContainer>
            <ToastButton
              variant="danger"
              onClick={async () => {
                try {
                  await deleteMutation.mutateAsync(typeId);
                  closeToast?.();
                } catch (error) {
                  // Error handled in mutation
                }
              }}
            >
              Delete
            </ToastButton>
            <ToastButton
              onClick={() => {
                closeToast?.();
              }}
            >
              Cancel
            </ToastButton>
          </ToastContainer>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        toastId: "confirm-delete-type",
      }
    );
  };



  // Handle debounced contact updates
  useEffect(() => {
    const contactKey = JSON.stringify(debouncedContactUpdates);
    if (debouncedContactUpdates !== null && contactProcessedRef.current !== contactKey) {
      contactProcessedRef.current = contactKey;
      updateSettingsMutation.mutate({
        visibleContacts: debouncedContactUpdates
      });
    }
  }, [debouncedContactUpdates, updateSettingsMutation]);

  // Handle debounced color updates - batch all changes
  useEffect(() => {
    const colorKey = JSON.stringify(debouncedColorUpdates);
    if (Object.keys(debouncedColorUpdates).length > 0 && colorProcessedRef.current !== colorKey) {
      colorProcessedRef.current = colorKey;
      
      // Batch all color updates into single requests
      const promises = Object.entries(debouncedColorUpdates).map(([id, data]) => 
        updateMutation.mutateAsync({ id, data })
      );
      
      Promise.all(promises).then(() => {
        setColorUpdates({}); // Clear after all updates complete
      });
    }
  }, [debouncedColorUpdates, updateMutation]);



  const handleColorChange = useCallback((id: string, label: string, color: string) => {
    setColorUpdates(prev => ({ ...prev, [id]: { label, color } }));
  }, []);

  if (!open) return null;

  return (
    <SettingsContainer onClick={handleClose}>
      <SettingsModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Settings</h3>
          <CloseBtn onClick={handleClose}>
            <X color="#cccccc" />
          </CloseBtn>
        </ModalHeader>

        <ModalContent>
          <SettingsSidebar>
            {sections.map((section) => (
              <SidebarItem
                key={section.id}
                $active={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </SidebarItem>
            ))}
          </SettingsSidebar>

          <ContentArea>
            <ModalBody>
              {activeSection === "contacts" && (
                <Section>
                  <ContactItem>
                    <ContactName style={{ fontWeight: 'bold' }}>Show All</ContactName>
                    <ContactCheckbox
                      type="checkbox"
                      checked={visibleContacts.length === contacts.length}
                      onChange={() => {
                        if (visibleContacts.length === contacts.length) {
                          // Uncheck Show All - do nothing, just visual change
                        } else {
                          // Check all - set to all contact IDs
                          const allContactIds = contacts.map((contact: any) => contact.id);
                          setContactUpdates(allContactIds);
                          // Update Redux for each contact
                          contacts.forEach((contact: any) => {
                            if (!visibleContacts.includes(contact.id)) {
                              dispatch(toggleContactVisibility(contact.id));
                            }
                          });
                        }
                      }}
                    />
                  </ContactItem>
                  {contacts.map((contact: any) => (
                    <ContactItem key={contact.id}>
                      <ContactName>{contact.name}</ContactName>
                      <ContactCheckbox
                        type="checkbox"
                        checked={isContactVisible(contact.id)}
                        onChange={() => handleContactToggle(contact.id)}
                      />
                    </ContactItem>
                  ))}
                </Section>
              )}

              {activeSection === "types" && (
                <Section>
                  {appointmentTypes.filter((type: any) => !type.deleted_at).map((type: any) => (
                    <TypeItem key={type.id}>
                      <TypeLabel>{type.label}</TypeLabel>
                      <ColorPicker
                        type="color"
                        value={type.color}
                        onChange={(e) => {
                          handleColorChange(
                            type.id,
                            type.label,
                            e.target.value
                          );
                        }}
                      />

                      <IconButton
                        color="#e74c3c"
                        onClick={() => handleDeleteType(type.id)}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </TypeItem>
                  ))}

                  {showAddForm && (
                    <TypeItem>
                      <TypeInput
                        type="text"
                        placeholder="Enter type name"
                        value={newTypeName}
                        onChange={(e) => setNewTypeName(e.target.value)}
                      />
                      <ColorPicker
                        type="color"
                        value={newTypeColor}
                        onChange={(e) => setNewTypeColor(e.target.value)}
                      />
                      <IconButton color="#27ae60" onClick={handleCreateType}>
                        <Check size={16} />
                      </IconButton>
                      <IconButton
                        color="#e74c3c"
                        onClick={() => setShowAddForm(false)}
                      >
                        <X size={16} />
                      </IconButton>
                    </TypeItem>
                  )}

                  <AddButton onClick={() => setShowAddForm(true)}>
                    <Plus size={16} />
                    New Type
                  </AddButton>
                </Section>
              )}
            </ModalBody>
          </ContentArea>
        </ModalContent>

        <FooterContainer>
          <CancelButton
            onClick={handleClose}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            Cancel
          </CancelButton>
        </FooterContainer>
      </SettingsModal>
    </SettingsContainer>
  );
}
