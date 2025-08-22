import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentSchema } from "../../utils/validationSchema";
import { useEffect, useState } from "react";
import {
  FormContainer,
  FormModal,
  ModalHeader,
  TitleInput,
  CloseBtn,
  ModalBody,
  VideoButton,
  FormFotter,
  AddButton,
  CancelButton,
  DeleteButton,
} from "./Form.styled";
import { X } from "react-feather";
import ContactSection from "./components/ContactSection";
import StaffSection from "./components/StaffSection";
import DateTimeSection from "./components/DateTimeSection";
import { Video, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeForm } from "../../store/formSlice";
import ServiceSection from "./components/ServiceSection";
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../services/api";
import { generateAppointmentId } from "../../utils/idGenerator";

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

function Form() {
  const [loading, setLoading] = useState(false);
  const { open, eventData } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeForm());
  };

  // Initialize react-hook-form with validation
  const methods = useForm<FormFields>({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      id: "",
      title: "",
      type: "",
      contact: "",
      staff: "",
      services: [],
      start: "",
      end: "",
      color: "",
    },
  });
  const { register, reset, handleSubmit, watch, formState: { errors } } = methods;
  
  // Watch the ID field to determine edit mode dynamically
  const currentId = watch("id");
  const isEditMode = Boolean(currentId);

  useEffect(() => {
    if (open) {
      if (eventData && Object.keys(eventData).length > 0) {
        console.log("Setting form data:", eventData);
        reset(eventData); // populate form with eventData when available
      } else {
        reset({
          id: "",
          title: "",
          type: "",
          contact: "",
          staff: "",
          services: [],
          start: "",
          end: "",
          color: "",
        }); // reset to default values for new appointment
      }
    }
  }, [open, eventData, reset]);

  const onSubmit = handleSubmit(async (data: FormFields) => {
    setLoading(true);
    console.log("Form data being submitted:", data);
    try {
      console.log("isEditMode:", isEditMode, "data.id:", data.id);
      if (data.id && data.id !== "") {
        await updateAppointment(String(data.id), data);
        alert("Appointment updated successfully!");
      } else {
        const newId = await generateAppointmentId();
        const newAppointment = { ...data, id: newId };
        await createAppointment(newAppointment);
        alert("Appointment created successfully!");
      }
      reset();
      dispatch(closeForm());
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Error saving appointment");
    } finally {
      setLoading(false);
    }
  });

  const handleDelete = async () => {
    if (!eventData?.id) return;

    if (confirm("Are you sure you want to delete this appointment?")) {
      setLoading(true);
      try {
        await deleteAppointment(String(eventData.id));
        alert("Appointment deleted successfully!");
        dispatch(closeForm());
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("Error deleting appointment");
      } finally {
        setLoading(false);
      }
    }
  };

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
                    borderColor: errors.title ? "#e74c3c" : "#ddd"
                  }}
                />
                {errors.title && (
                  <div style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px" }}>
                    {errors.title.message}
                  </div>
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
                <VideoButton type="button">
                  <Video />
                  Add telehealth video conference
                </VideoButton>
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
                <AddButton type="submit" disabled={loading}>
                  {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
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
