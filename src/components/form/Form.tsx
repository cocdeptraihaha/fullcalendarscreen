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
  ErrorMessage,
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
  type: string;
  contact: string;
  staff: string;
  services: string[];
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
  // Memoize default values để tránh tạo object mới mỗi render
  const defaultVal: FormFields = useMemo(() => {
    const currentDateTime = getCurrentDateTime();
    console.log(currentDateTime);
    console.log(addMinutesToDateTime(currentDateTime, 30));

    return {
      id: "",
      title: "",
      type: "",
      contact: "",
      staff: "",
      services: [],
      start: currentDateTime,
      end: addMinutesToDateTime(currentDateTime, 30),
      color: "",
    };
  }, []);
  const [loading, setLoading] = useState(false);
  const { open, eventData } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const createMutation = useCreateAppointment();
  const updateMutation = useUpdateAppointment();
  const deleteMutation = useDeleteAppointment();

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const handleClose = useCallback(() => {
    dispatch(clearEventData());
    dispatch(closeForm());
  }, [dispatch]);

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

  // Watch the ID field to determine edit mode dynamically
  const currentId = watch("id");
  const isEditMode = Boolean(currentId);

  useEffect(() => {
    if (open) {
      if (eventData && eventData.id) {
        reset(eventData);
      } else if (eventData && eventData.start && !eventData.id) {
        reset({
          ...defaultVal,
          start: eventData.start,
          end: eventData.end,
        });
      } else {
        reset({ ...defaultVal });
      }
    }
  }, [open, eventData]);

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
    if (!eventData?.id) return;

    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this appointment?</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
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
                }
                closeToast?.();
              }}
              style={{
                padding: "5px 10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Delete
            </button>
            <button
              onClick={closeToast}
              style={{
                padding: "5px 10px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  }, [eventData?.id, deleteMutation, dispatch]);

  return (
    // FormProvider makes form methods available to all child components
    <FormProvider {...methods}>
      {open && ( // Only render modal when form is open
        <FormContainer>
          <FormModal>
            <form onSubmit={onSubmit}>
              <ModalHeader>
                <TitleInput
                  {...register("title")}
                  type="text"
                  placeholder="Add Title"
                  style={{
                    borderColor: errors.title ? "#e74c3c" : "#ddd",
                  }}
                />
                {errors.title && (
                  <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}
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
