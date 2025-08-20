import {useForm} from 'react-hook-form'
import { FormContainer, FormModal, ModalHeader, TitleInput, CloseBtn, ModalBody, VideoButton, FormFotter, AddButton, CancelButton } from './Form.styled'
import ContactSection from './components/ContactSection';
import StaffSection from './components/StaffSection';
import ServiceSection from './components/ServiceSection';
import DateTimeSection from './components/DateTimeSection';
import { Video } from 'react-feather';

type FormFeilds ={
  title:string;
  type:string;
  contact:string;
  staff:string;
  service:string;
  start:string;
  end:string;
  color:string;
}

//not complete
//use as few parameters as possible here

function Form() {
  const {register}=useForm<FormFeilds>();
  return (
    <FormContainer>
      <FormModal>
        <ModalHeader>
          <TitleInput {...register('title')} type='text' placeholder='Add Title'/>
          <CloseBtn/>
        </ModalHeader>
        <ModalBody>
          <ContactSection/>
          <StaffSection/>
          <ServiceSection/>
          <DateTimeSection/>
          <VideoButton>
            <Video/>Add teleheatlh video conference
          </VideoButton>
        </ModalBody>
        <FormFotter>
          <CancelButton>
            Cancel
          </CancelButton>
          <AddButton>
            Add
          </AddButton>
        </FormFotter>
      </FormModal>
    </FormContainer>
  )
}

export default Form