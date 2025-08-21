import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
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
} from "./Form.styled";
import ContactSection from "./components/ContactSection";
import StaffSection from "./components/StaffSection";
import ServiceSection from "./components/ServiceSection";
import DateTimeSection from "./components/DateTimeSection";
import { Video } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeForm } from "../../store/formSlice";

type FormFields = {
  title: string;
  type: string;
  contact: string;
  staff: string;
  service: string;
  start: string;
  end: string;
  color: string;
};

function Form() {
  const handleClose = () => {
    dispatch(closeForm());
  };
  const { open, eventData } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  // Initialize react-hook-form with default empty values
  // This form handles both create and edit modes
  const methods = useForm<FormFields>({
    defaultValues: {
      title: "",
      type: "",
      contact: "",
      staff: "",
      service: "",
      start: "",
      end: "",
      color: "",
    },
  });
  const { register, reset, handleSubmit } = methods;

  useEffect(() => {
    if (eventData) {
      reset(eventData); // populate form with eventData when available
    }
  }, [eventData, reset]);

  const onSubmit = handleSubmit((data: FormFields) => {
    reset();
    console.log("Submit:", data);
  });

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
                />
                <CloseBtn onClick={() => handleClose()} />
              </ModalHeader>
              <ModalBody>
                <ContactSection />
                <StaffSection />
                <ServiceSection />
                <DateTimeSection />
                <VideoButton>
                  <Video />
                  Add telehealth video conference
                </VideoButton>
              </ModalBody>
              <FormFotter>
                <CancelButton onClick={() => handleClose()}>
                  Cancel
                </CancelButton>
                <AddButton type="submit">Submit</AddButton>
              </FormFotter>
            </form>
          </FormModal>
        </FormContainer>
      )}
    </FormProvider>
  );
}

export default Form;
