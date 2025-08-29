import { FC, useMemo } from "react";
import {
  AddButton,
  CancelButton,
  CloseBtn,
  ServiceFormFotter,
  ServiceModal,
  ServiceModalHeader,
  ServiceModalTitle,
  ServiceModalToggle,
  ServiceMenu,
  ServiceList,
  Service,
  Checkbox,
  ServiceTag,
  TagRemoveBtn,
  StaffContainer,
  SearchContainer,
  SearchInput,
  ServiceSectionTitle,
  ServiceSectionSubtitle,
} from "./styled";
import { X } from "react-feather";
import StaffSection from "../../form/components/StaffSection";
import { FormProvider } from "react-hook-form";

interface ServiceItem {
  id: string;
  name: string;
}

interface ServiceFormProps {
  open: boolean;
  services: ServiceItem[];
  selectedServices: string[];
  searchTerm: string;
  onToggle: () => void;
  onClose: (e?: React.MouseEvent) => void;
  onAdd: (e?: React.MouseEvent) => void;
  onServiceToggle: (serviceId: string) => void;
  onSearchChange: (value: string) => void;
  renderToggleContent: () => React.ReactNode;
}

const ServiceForm: FC<ServiceFormProps> = ({
  open,
  services,
  selectedServices,
  searchTerm,
  onToggle,
  onClose,
  onAdd,
  onServiceToggle,
  onSearchChange,
  renderToggleContent,
}) => {
  const filteredServices = useMemo(
    () =>
      services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [services, searchTerm]
  );

  return (
    <>
      <ServiceModalToggle onClick={onToggle}>
        {renderToggleContent()}
      </ServiceModalToggle>

      {open && (
        <ServiceModal onClick={(e) => e.stopPropagation()}>
          <ServiceModalHeader>
            <ServiceModalTitle>Choose Services</ServiceModalTitle>
            <CloseBtn onClick={onClose}>
              <X color="#184561" />
            </CloseBtn>
          </ServiceModalHeader>

          <StaffContainer>
            <StaffSection />
          </StaffContainer>
          
          <ServiceSectionTitle>Services interested in</ServiceSectionTitle>
          <ServiceSectionSubtitle>
            Choose the service that the user is interested in
          </ServiceSectionSubtitle>

          <SearchContainer>
            {selectedServices.map((serviceId) => {
              const service = services.find((s) => s.id === serviceId);
              return service ? (
                <ServiceTag key={serviceId}>
                  {service.name}
                  <TagRemoveBtn
                    onClick={(e) => {
                      e.stopPropagation();
                      onServiceToggle(serviceId);
                    }}
                  >
                    ×
                  </TagRemoveBtn>
                </ServiceTag>
              ) : null;
            })}
            <SearchInput
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </SearchContainer>

          <ServiceMenu>
            <ServiceList>
              {filteredServices.map((service) => (
                <Service
                  key={service.id}
                  onClick={() => onServiceToggle(service.id)}
                >
                  <Checkbox
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => {}} // Prevent warning
                    onClick={(e) => {
                      e.stopPropagation();
                      onServiceToggle(service.id);
                    }}
                  />
                  {service.name}
                </Service>
              ))}
            </ServiceList>
          </ServiceMenu>

          <ServiceFormFotter>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <AddButton onClick={onAdd}>Add Services</AddButton>
          </ServiceFormFotter>
        </ServiceModal>
      )}
    </>
  );
};

export default ServiceForm;
