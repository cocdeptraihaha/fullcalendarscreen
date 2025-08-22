import { useState, useEffect } from "react";
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
  TagsContainer,
  ServiceTag,
  TagRemoveBtn,
  StaffContainer,
  SearchContainer,
  SearchInput,
} from "./styled";
import { X } from "react-feather";
import StaffSection from "../../form/components/StaffSection";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { InputContainer, InputLabel } from "../../form/components/styled";
import { fetchServices } from "../../../services/api";

interface ServiceItem {
  id: number;
  name: string;
}

interface ServiceSectionProps {
  control?: any; // Form control passed from parent
}

const ServiceSection = ({ control }: ServiceSectionProps) => {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Get current staff and services values from main form context
  const mainForm = useFormContext();
  const currentStaff = mainForm?.watch("staff") || "";
  const currentServices = mainForm?.watch("services") || [];

  // Fetch services and sync selected services with form values
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);

        // Always sync selectedServices with currentServices from form
        if (currentServices.length > 0) {
          const selectedIds = data
            .filter((service) => currentServices.includes(service.name))
            .map((service) => service.id);
          setSelectedServices(selectedIds);
        } else {
          // Clear selectedServices when form is reset
          setSelectedServices([]);
        }
      } catch (error) {
        console.error("Error loading services:", error);
      }
    };
    loadServices();
  }, [currentServices]);

  // Filter services based on search term
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create a temporary form context for StaffSection with current staff value
  const methods = useForm({
    defaultValues: {
      staff: currentStaff, // Initialize with current staff from main form
    },
  });
  const { watch } = methods;
  const selectedStaff = watch("staff"); // Watch for staff selection

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
    setSearchTerm("");
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent event bubbling
    setOpen(false);
  };

  const handleAdd = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    // Transfer selected staff to main form
    if (mainForm && selectedStaff) {
      mainForm.setValue("staff", selectedStaff);
    }
    
    // Transfer selected services to main form
    const selectedServiceNames = selectedServices
      .map((id) => {
        const service = services.find((s) => s.id === id);
        return service?.name;
      })
      .filter(Boolean);
    
    if (mainForm) {
      console.log("Setting services:", selectedServiceNames);
      mainForm.setValue("services", selectedServiceNames);
      // Trigger form validation/update
      mainForm.trigger("services");
      console.log("Form values after setting services:", mainForm.getValues());
    }
    
    setOpen(false);
  };

  return (
    <InputContainer>
      <InputLabel>Service</InputLabel>

      <ServiceModalToggle
        onClick={() => {
          // Reset form with current staff value when opening modal
          const staffValue = mainForm?.getValues("staff") || "";
          methods.reset({ staff: staffValue });
          setOpen(true);
        }}
      >
        {/* Display selected services as tags inside toggle */}
        {selectedServices.length > 0 ? (
          <TagsContainer>
            {selectedServices.map((serviceId) => {
              const service = services.find((s) => s.id === serviceId);
              return service ? (
                <ServiceTag key={serviceId}>
                  {service.name}
                  <TagRemoveBtn
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceToggle(serviceId);
                    }}
                  >
                    ×
                  </TagRemoveBtn>
                </ServiceTag>
              ) : null;
            })}
          </TagsContainer>
        ) : (
          <span style={{ color: "#999", padding: "10px" }}>
            Select services...
          </span>
        )}
        {open && (
          <ServiceModal onClick={(e) => e.stopPropagation()}>
            <ServiceModalHeader>
              <ServiceModalTitle>Choose Services</ServiceModalTitle>
              <CloseBtn onClick={(e) => handleClose(e)}>
                <X color="#184561" />
              </CloseBtn>
            </ServiceModalHeader>
            <StaffContainer>
              <FormProvider {...methods}>
                <StaffSection />
              </FormProvider>
            </StaffContainer>

            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                color: "#184561",
                marginTop: "15px",
              }}
            >
              Services interested in
            </div>
            <div
              style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}
            >
              Choose the service that the user is interested in
            </div>

            <SearchContainer>
              {selectedServices.map((serviceId) => {
                const service = services.find((s) => s.id === serviceId);
                return service ? (
                  <ServiceTag key={serviceId}>
                    {service.name}
                    <TagRemoveBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceToggle(serviceId);
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>

            <ServiceMenu>
              <ServiceList>
                {filteredServices.map((service) => (
                  <Service
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <Checkbox
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={(e) => e.stopPropagation()} // Prevent double toggle
                    />
                    {service.name}
                  </Service>
                ))}
              </ServiceList>
            </ServiceMenu>
            <ServiceFormFotter>
              <CancelButton onClick={(e) => handleClose(e)}>
                Cancel
              </CancelButton>
              <AddButton onClick={(e) => handleAdd(e)}>Add Services</AddButton>
            </ServiceFormFotter>
          </ServiceModal>
        )}
      </ServiceModalToggle>
    </InputContainer>
  );
};
export default ServiceSection;
