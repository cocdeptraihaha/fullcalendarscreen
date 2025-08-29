import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentSchema } from "../../utils/validationSchema";
import { useEffect, useState, useMemo, useCallback } from "react";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import {
  FormContainer,
  FormModal,
  ModalHeader,
  TitleInput,
  CloseBtn,
  ModalBody,
  FormFotter,
  AddButton,
  CancelButton,
  DeleteButton,
  ToastButton,
  ToastContainer,
} from "./Form.styled";
import ContactSection from "./components/ContactSection";
import StaffSection from "./components/StaffSection";
import DateTimeSection from "./components/DateTimeSection";
import { X, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearEventData, closeForm } from "../../store/formSlice";
import ServiceSection from "./components/ServiceSection";
import { generateAppointmentId } from "../../utils/idGenerator";
import {
  useCreateAppointment,
  useUpdateAppointment,
  useDeleteAppointment,
} from "../../hooks/useAppointments";

type FormFields = {
  id: string;
  title: string;
  type_id: string;
  contact_id: string;
  staff_id: string;
  service_ids: string[];
  start: string;
  end: string;
  color: string;
};

// Default time utils - Luxon implementation
const roundToNearest5Minutes = (dateTime: DateTime) => {
  const minutes = dateTime.minute;
  const roundedMinutes = Math.round(minutes / 5) * 5;
  return dateTime.set({ minute: roundedMinutes, second: 0, millisecond: 0 });
};

const getCurrentDateTime = () => {
  const now = DateTime.local();
  return (
    roundToNearest5Minutes(now).toISO({ suppressMilliseconds: true }) || ""
  );
};

const addMinutesToDateTime = (dateTime: string, minutes: number) => {
  return (
    DateTime.fromISO(dateTime)
      .plus({ minutes })
      .toISO({ suppressMilliseconds: true }) || ""
  );
};

function Form() {
  const [originalVal, setOriginalVal] = useState<FormFields | null>(null);

  // Memoize default values to avoid creating new object on each render
  const defaultVal: FormFields = useMemo(() => {
    const currentDateTime = getCurrentDateTime();
    return {
      id: "",
      title: "",
      type_id: "",
      contact_id: "",
      staff_id: "",
      service_ids: [],
      start: currentDateTime,
      end: addMinutesToDateTime(currentDateTime, 30),
      color: "",
    };
  }, []);
  const [loading, setLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { open, eventData } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const createMutation = useCreateAppointment();
  const updateMutation = useUpdateAppointment();
  const deleteMutation = useDeleteAppointment();

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  // Initialize react-hook-form with validation
  const methods = useForm<FormFields>({
    resolver: yupResolver(appointmentSchema),
    defaultValues: { ...defaultVal },
  });
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const handleClose = useCallback(() => {
    if (isConfirmOpen) return; // Prevent toast spam

    // Compare current data with initial data
    const hasChanges =
      originalVal && JSON.stringify(watch()) !== JSON.stringify(originalVal);

    // If no changes, close directly
    if (!hasChanges) {
      dispatch(clearEventData());
      dispatch(closeForm());
      return;
    }

    setIsConfirmOpen(true);
    toast.dismiss(); // Close all current toasts

    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to close without saving?</p>
          <ToastContainer>
            <ToastButton
              variant="danger"
              onClick={() => {
                dispatch(clearEventData());
                dispatch(closeForm());
                setIsConfirmOpen(false);
                closeToast?.();
              }}
            >
              Yes, Close
            </ToastButton>
            <ToastButton
              onClick={() => {
                setIsConfirmOpen(false);
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
        toastId: "confirm-close",
        onClose: () => setIsConfirmOpen(false), // Reset state when clicking X
      }
    );
  }, [dispatch, isConfirmOpen, originalVal, watch]);

  const currentId = watch("id");
  const isEditMode = Boolean(currentId);

  useEffect(() => {
    if (open) {
      let formValues;
      if (eventData && eventData.id) {
        formValues = {
          ...eventData,
          type_id: eventData.type_id || "",
          contact_id: eventData.contact_id || "",
          staff_id: eventData.staff_id || "",
          service_ids: eventData.service_ids || [],
        };
      } else if (eventData && eventData.start && !eventData.id) {
        formValues = {
          ...defaultVal,
          start: eventData.start,
          end: eventData.end,
        };
      } else {
        formValues = { ...defaultVal };
      }

      reset(formValues);
      setOriginalVal(formValues); // Save initial values

    }
  }, [open, eventData, defaultVal, reset]);

  const onSubmit = handleSubmit(async (data: FormFields) => {
    setLoading(true);
    try {
      // Convert datetime strings to Unix timestamps
      const appointmentData = {
        ...data,
        start: new Date(data.start).getTime(),
        end: new Date(data.end).getTime(),
      };

      if (eventData?.id) {
        await updateMutation.mutateAsync({
          id: eventData.id,
          data: appointmentData,
        });
        toast.success("Appointment updated successfully!");
      } else {
        const newId = await generateAppointmentId();
        const newAppointment = { ...appointmentData, id: newId };
        await createMutation.mutateAsync(newAppointment);
        toast.success("Appointment created successfully!");
      }
      reset({ ...defaultVal });
      dispatch(closeForm());
    } catch (error) {
      toast.error("Error saving appointment");
    } finally {
      setLoading(false);
    }
  });

  const handleDelete = useCallback(async () => {
    if (!eventData?.id || isDeleteConfirmOpen) return;

    setIsDeleteConfirmOpen(true);
    toast.dismiss();

    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this appointment?</p>
          <ToastContainer>
            <ToastButton
              variant="danger"
              onClick={async () => {
                setLoading(true);
                try {
                  await deleteMutation.mutateAsync(eventData.id);
                  toast.success("Appointment deleted successfully!");
                  dispatch(closeForm());
                } catch (error) {
                  toast.error("Error deleting appointment");
                } finally {
                  setLoading(false);
                  setIsDeleteConfirmOpen(false);
                }
                closeToast?.();
              }}
            >
              Delete
            </ToastButton>
            <ToastButton
              onClick={() => {
                setIsDeleteConfirmOpen(false);
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
        toastId: "confirm-delete",
        onClose: () => setIsDeleteConfirmOpen(false), // Reset state when clicking X
      }
    );
  }, [eventData?.id, deleteMutation, dispatch, isDeleteConfirmOpen]);

  return (
    // FormProvider makes form methods available to all child components
    <FormProvider {...methods}>
      {open && ( // Only render modal when form is open
        <FormContainer onClick={handleClose}>
          <FormModal onClick={(e) => e.stopPropagation()}>
            <form onSubmit={onSubmit}>
              <ModalHeader>
                <TitleInput
                  {...register("title")}
                  type="text"
                  placeholder="Add Title"
                  style={{
                    borderRadius: "6px",
                    border: errors.title ? "1px solid #e74c3c" : "none",
                  }}
                />
                <CloseBtn onClick={() => handleClose()}>
                  <X color="#184561" />
                </CloseBtn>
              </ModalHeader>
              <ModalBody>
                <ContactSection />
                <StaffSection />
                <ServiceSection />
                <DateTimeSection />
              </ModalBody>
              <FormFotter>
                {isEditMode && (
                  <DeleteButton
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    <Trash2 size={16} color="white" />
                  </DeleteButton>
                )}
                <CancelButton
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </CancelButton>
                <AddButton type="submit" disabled={loading || isMutating}>
                  {loading || isMutating
                    ? "Saving..."
                    : isEditMode
                    ? "Update"
                    : "Create"}
                </AddButton>
              </FormFotter>
            </form>
          </FormModal>
        </FormContainer>
      )}
    </FormProvider>
  );
}

export default Form;
