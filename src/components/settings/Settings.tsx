import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  closeSettings,
  toggleContactVisibility,
} from "../../store/settingsSlice";
import {
  useGlobalContacts,
  useGlobalAppointmentTypes,
} from "../../hooks/useGlobalData";
import {
  useCreateAppointmentType,
  useUpdateAppointmentType,
  useDeleteAppointmentType,
} from "../../hooks/useAppointmentTypes";
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
  const { open } = useSelector((state: RootState) => state.settings);
  const { visibleContacts } = useSelector((state: RootState) => state.settings);
  const { data: contacts = [] } = useGlobalContacts();
  const { data: appointmentTypes = [] } = useGlobalAppointmentTypes();

  const createMutation = useCreateAppointmentType();
  const updateMutation = useUpdateAppointmentType();
  const deleteMutation = useDeleteAppointmentType();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeColor, setNewTypeColor] = useState("#3498db");

  const [activeSection, setActiveSection] = useState("contacts");

  const sections = [
    { id: "contacts", label: "General setting" },
    { id: "types", label: "Appointment types" },
  ];

  const handleContactToggle = (contactId: string) => {
    dispatch(toggleContactVisibility(contactId));
  };

  const isContactVisible = (contactId: string) => {
    return visibleContacts.length === 0 || visibleContacts.includes(contactId);
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

  const debouncedUpdateColor = useCallback(
    (() => {
      let timeoutId: number;
      return (id: string, label: string, color: string) => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          updateMutation.mutate({
            id,
            data: { label, color },
          });
        }, 300);
      };
    })(),
    [updateMutation]
  );

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
                  {appointmentTypes.map((type: any) => (
                    <TypeItem key={type.id}>
                      <TypeLabel>{type.label}</TypeLabel>
                      <ColorPicker
                        type="color"
                        value={type.color}
                        onChange={(e) => {
                          debouncedUpdateColor(
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
