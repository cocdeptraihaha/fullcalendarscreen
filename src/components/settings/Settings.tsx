import { useState, useCallback, useEffect, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  closeSettings,
  toggleStaffVisibility,
  loadSettings,
} from "../../store/settingsSlice";
import { useAppointmentTypes, useStaff } from "../../hooks/useData";
import {
  useCreateAppointmentType,
  useUpdateAppointmentType,
  useDeleteAppointmentType,
} from "../../hooks/useAppointmentTypes";
import { useUpdateStaffVisible } from "../../hooks/useSettings";
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
import { useSettings } from "../../hooks/useData";

export default function Settings() {
  const dispatch = useDispatch();
  const { open, visibleStaff, isLoaded } = useSelector(
    (state: RootState) => state.settings
  );
  const { data: staff = [] } = useStaff();
  const { data: appointmentTypes = [] } = useAppointmentTypes();
  const { data: settings } = useSettings();
  const updateStaffVisibleMutation = useUpdateStaffVisible();

  const createMutation = useCreateAppointmentType();
  const updateMutation = useUpdateAppointmentType();
  const deleteMutation = useDeleteAppointmentType();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeColor, setNewTypeColor] = useState("#3498db");

  const [activeSection, setActiveSection] = useState("staff");
  // Collect per-staff visibility updates; will be sent after debounce
  const [staffVisibilityUpdates, setStaffVisibilityUpdates] = useState<{
    [id: string]: 0 | 1;
  }>({});
  const [colorUpdates, setColorUpdates] = useState<{
    [key: string]: { label: string; color: string };
  }>({});

  const debouncedStaffVisibilityUpdates = useDebounce(staffVisibilityUpdates, 400);
  const debouncedColorUpdates = useDebounce(colorUpdates, 500);

  const colorProcessedRef = useRef<string>("");
  const staffProcessedRef = useRef<string>("");

  const sections = [
    { id: "staff", label: "Staff visibility" },
    { id: "types", label: "Appointment types" },
  ];

  // Load settings once when not loaded yet
  useEffect(() => {
    if (!isLoaded && settings) {
      dispatch(loadSettings(settings));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, settings]);

  const handleContactToggle = useCallback(
    (contactId: string) => {
      setTimeout(() => {
        dispatch(toggleStaffVisibility(contactId));
        const nextVisible: 0 | 1 = visibleStaff.includes(contactId) ? 0 : 1;
        setStaffVisibilityUpdates((prev) => ({ ...prev, [contactId]: nextVisible }));
      }, 0);
    },
    [dispatch, visibleStaff]
  );

  const isContactVisible = (contactId: string) => {
    return visibleStaff.includes(contactId);
  };

  const handleClose = () => {
    dispatch(closeSettings());
    setShowAddForm(false);
    setNewTypeName("");
    setNewTypeColor("#3498db");
  };

  const handleCreateType = async () => {
    toast.dismiss();

    if (!newTypeName.trim()) {
      toast.error("Please enter a type name");
      return;
    }

    // Check for duplicate name
    const existingType = appointmentTypes.find(
      (type: any) =>
        !type.deleted_at &&
        type.label.toLowerCase() === newTypeName.trim().toLowerCase()
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

  // Debounced mutate for staff visibility updates
  useEffect(() => {
    const staffKey = JSON.stringify(debouncedStaffVisibilityUpdates);
    if (
      Object.keys(debouncedStaffVisibilityUpdates).length > 0 &&
      staffProcessedRef.current !== staffKey
    ) {
      staffProcessedRef.current = staffKey;
      const entries = Object.entries(debouncedStaffVisibilityUpdates);
      Promise.all(
        entries.map(([id, visible]) =>
          updateStaffVisibleMutation.mutateAsync({ id, visible: visible as 0 | 1 })
        )
      ).finally(() => {
        setStaffVisibilityUpdates({});
      });
    }
  }, [debouncedStaffVisibilityUpdates, updateStaffVisibleMutation]);

  // Handle debounced color updates - batch all changes
  useEffect(() => {
    const colorKey = JSON.stringify(debouncedColorUpdates);
    if (
      Object.keys(debouncedColorUpdates).length > 0 &&
      colorProcessedRef.current !== colorKey
    ) {
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

  const handleColorChange = useCallback(
    (id: string, label: string, color: string) => {
      setColorUpdates((prev) => ({ ...prev, [id]: { label, color } }));
    },
    []
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
              {activeSection === "staff" && (
                <Section>
                  <ContactItem>
                    <ContactName style={{ fontWeight: "bold" }}>
                      Show All
                    </ContactName>
                    <ContactCheckbox
                      type="checkbox"
                      checked={visibleStaff.length === staff.length}
                      onChange={() => {
                        setTimeout(() => {
                          if (visibleStaff.length === staff.length) {
                            // Uncheck Show All - hide all contacts
                            visibleStaff.forEach((contactId: string) => {
                              dispatch(toggleStaffVisibility(contactId));
                              setStaffVisibilityUpdates((prev) => ({
                                ...prev,
                                [contactId]: 0,
                              }));
                            });
                          } else {
                            // Check all - set to all contact IDs
                            // Update Redux for each contact
                            staff.forEach((member: any) => {
                              if (!visibleStaff.includes(member.id)) {
                                dispatch(toggleStaffVisibility(member.id));
                                setStaffVisibilityUpdates((prev) => ({
                                  ...prev,
                                  [member.id]: 1,
                                }));
                              }
                            });
                          }
                        }, 0);
                      }}
                    />
                  </ContactItem>
                  {staff.map((member: any) => (
                    <ContactItem key={member.id}>
                      <ContactName>{member.name}</ContactName>
                      <ContactCheckbox
                        type="checkbox"
                        checked={isContactVisible(member.id)}
                        onChange={() => handleContactToggle(member.id)}
                      />
                    </ContactItem>
                  ))}
                </Section>
              )}

              {activeSection === "types" && (
                <Section>
                  {appointmentTypes
                    .filter((type: any) => !type.deleted_at)
                    .map((type: any) => (
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
