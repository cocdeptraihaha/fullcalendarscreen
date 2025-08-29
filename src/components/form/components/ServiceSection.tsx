import { useState, useCallback, useEffect, MouseEvent } from "react";
import { InputContainer, InputLabel } from "./styled";
import { ErrorMessage } from "../Form.styled";
import { useFormContext } from "react-hook-form";
import { useServices, useServicesByStaff } from "../../../hooks/useFormData";
import ServiceForm from "../../ui/ServiceForm";
import {
  TagsContainer,
  ServiceTag,
  TagRemoveBtn,
} from "../../ui/ServiceForm/styled";

const ServiceSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const mainForm = useFormContext();
  const {
    formState: { errors },
  } = mainForm;
  
  const currentStaffId = mainForm.watch("staff_id");

  const { data: allServices = [], isLoading: servicesLoading } = useServices();
  const { data: staffServices = [], isLoading: staffServicesLoading } = useServicesByStaff(currentStaffId);
  
  // Use staff services if staff is selected, otherwise use all services
  const services = currentStaffId ? staffServices : allServices;
  const isLoading = currentStaffId ? staffServicesLoading : servicesLoading;

  // Sync with form data
  useEffect(() => {
    const currentServiceIds = mainForm.watch("service_ids") || [];
    setSelectedServices(currentServiceIds);
  }, [mainForm.watch("service_ids")]);

  const handleToggle = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((e?: MouseEvent) => {
    e?.stopPropagation();
    setOpen(false);
  }, []);

  const handleAdd = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      
      mainForm.setValue("service_ids", selectedServices);
      mainForm.trigger("service_ids");
      setOpen(false);
    },
    [selectedServices, mainForm]
  );

  const handleServiceToggle = useCallback((serviceId: string) => {
    setSelectedServices((prev) => {
      const newServices = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
      
      mainForm.setValue("service_ids", newServices);
      mainForm.trigger("service_ids");
      
      return newServices;
    });
    setSearchTerm("");
  }, [mainForm]);

  const renderToggleContent = useCallback(() => {
    if (isLoading) {
      return (
        <span style={{ color: "#999", padding: "10px" }}>
          Loading services...
        </span>
      );
    }
    if (selectedServices.length > 0) {
      return (
        <TagsContainer>
          {selectedServices.map((serviceId) => {
            const service = services.find(s => s.id === serviceId);
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
      );
    }
    return (
      <span style={{ color: "#999", padding: "10px" }}>Select services...</span>
    );
  }, [selectedServices, services, handleServiceToggle, isLoading]);

  return (
    <InputContainer>
      <InputLabel>Service</InputLabel>
      <ServiceForm
        open={open}
        services={services}
        selectedServices={selectedServices}
        searchTerm={searchTerm}
        onToggle={handleToggle}
        onClose={handleClose}
        onAdd={handleAdd}
        onServiceToggle={handleServiceToggle}
        onSearchChange={setSearchTerm}
        renderToggleContent={renderToggleContent}
      />
      {errors.service_ids && (
        <ErrorMessage>{(errors.service_ids as any)?.message}</ErrorMessage>
      )}
    </InputContainer>
  );
};

export default ServiceSection;