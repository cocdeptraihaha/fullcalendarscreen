import { useState, useEffect, useMemo, useCallback } from "react";
import { InputContainer, InputLabel } from "./styled";
import { ErrorMessage } from "../Form.styled";
import { useForm, useFormContext } from "react-hook-form";
import {
  useStaff,
  useServicesByStaff,
  useServices,
} from "../../../hooks/useFormData";
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
  const currentStaff = mainForm?.watch("staff") || "";
  const currentServices = mainForm?.watch("services") || [];

  // Staff form methods
  const staffMethods = useForm({
    defaultValues: { staff: currentStaff },
  });
  const selectedStaff = staffMethods.watch("staff");

  // TanStack Query hooks
  const { data: allStaff = [], isLoading: staffLoading } = useStaff();
  const { data: allServices = [], isLoading: servicesLoading } = useServices();

  // Find staff ID by name
  const staff = allStaff.find((s: any) => s.name === selectedStaff);
  const { data: staffServices = [] } = useServicesByStaff(staff?.id || "");

  // Use staff services if staff selected, otherwise all services
  const services = useMemo(
    () => (selectedStaff ? staffServices : allServices),
    [selectedStaff, staffServices, allServices]
  );

  // Sync selected services with form values
  useEffect(() => {
    if (services.length > 0) {
      if (currentServices.length > 0) {
        const selectedIds = services
          .filter((service) => currentServices.includes(service.name))
          .map((service) => service.id);
        setSelectedServices(selectedIds);
      } else {
        setSelectedServices([]);
      }
    }
  }, [currentServices, services]);

  const handleToggle = useCallback(() => {
    const staffValue = mainForm?.getValues("staff") || "";
    staffMethods.reset({ staff: staffValue });
    setOpen(true);
  }, [mainForm, staffMethods]);

  const handleClose = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpen(false);
  }, []);

  const handleAdd = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();

      if (mainForm && selectedStaff) {
        mainForm.setValue("staff", selectedStaff);
      }

      const selectedServiceNames = selectedServices
        .map((id) => services.find((s) => s.id === id)?.name)
        .filter(Boolean);

      if (mainForm) {
        mainForm.setValue("services", selectedServiceNames);
        mainForm.trigger("services");
      }

      setOpen(false);
    },
    [mainForm, selectedStaff, selectedServices, services]
  );

  const handleServiceToggle = useCallback((serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
    setSearchTerm("");
  }, []);

  const renderToggleContent = useCallback(() => {
    if (staffLoading || servicesLoading) {
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
      );
    }
    return (
      <span style={{ color: "#999", padding: "10px" }}>Select services...</span>
    );
  }, [
    selectedServices,
    services,
    handleServiceToggle,
    staffLoading,
    servicesLoading,
  ]);

  return (
    <InputContainer>
      {(!errors.services && <InputLabel>Service</InputLabel>) ||
        (errors.services && (
          <ErrorMessage>{(errors.services as any)?.message}</ErrorMessage>
        ))}
      <ServiceForm
        open={open}
        services={services}
        selectedServices={selectedServices}
        searchTerm={searchTerm}
        staffMethods={staffMethods}
        onToggle={handleToggle}
        onClose={handleClose}
        onAdd={handleAdd}
        onServiceToggle={handleServiceToggle}
        onSearchChange={setSearchTerm}
        renderToggleContent={renderToggleContent}
      />
    </InputContainer>
  );
};

export default ServiceSection;
