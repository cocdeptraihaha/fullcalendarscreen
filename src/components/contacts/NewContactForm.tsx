import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { X } from 'react-feather';
import { useCreateContact } from '../../hooks/useContact';
import PhoneNumberInput from '../ui/PhoneNumberInput';
import { contactSchema } from '../../utils/validationSchema';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  Form,
  FormRow,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  ErrorMessage
} from './NewContactForm.styled';

interface NewContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

const NewContactForm: React.FC<NewContactFormProps> = ({ isOpen, onClose }) => {
  const createContactMutation = useCreateContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<ContactFormData>({
    mode: 'onSubmit',
    resolver: yupResolver(contactSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const contactData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        avatar: 'https://www.w3schools.com/howto/img_avatar.png'
      };

      await createContactMutation.mutateAsync(contactData);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>New Contact</ModalTitle>
          <CloseButton onClick={handleClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Row 1: First Name and Last Name */}
            <FormRow>
              <FormGroup>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  type="text"
                  {...register('first_name')}
                  placeholder="Enter first name"
                />
                {errors.first_name && <ErrorMessage>{errors.first_name.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  type="text"
                  {...register('last_name')}
                  placeholder="Enter last name"
                />
                {errors.last_name && <ErrorMessage>{errors.last_name.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            {/* Row 2: Email and Phone Number */}
            <FormRow>
              <FormGroup>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="text"
                  {...register('email')}
                  placeholder="Enter email address"
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone_number">Phone Number *</Label>
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <PhoneNumberInput
                      id="phone_number"
                      name="phone_number"
                      value={field.value}
                      onChange={(value) => field.onChange(value || '')}
                      placeholder="Enter phone number"
                      defaultCountry="VN"
                    />
                  )}
                />
                {errors.phone_number && <ErrorMessage>{errors.phone_number.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <ButtonGroup>
              <CancelButton type="button" onClick={handleClose}>
                Cancel
              </CancelButton>
              <SubmitButton type="submit" disabled={createContactMutation.isPending}>
                {createContactMutation.isPending ? 'Creating...' : 'Create Contact'}
              </SubmitButton>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default NewContactForm;
