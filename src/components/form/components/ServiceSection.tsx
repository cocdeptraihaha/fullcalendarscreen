import { useState, useEffect, useCallback, MouseEvent } from "react";
import { InputContainer, InputLabel } from "./styled";
import { ErrorMessage } from "../Form.styled";
import { useForm, useFormContext } from "react-hook-form";
import { useServicesByStaff, useServices } from "../../../hooks/useFormData";
import ServiceForm from "../../ui/ServiceForm";
import {
  TagsContainer,
  ServiceTag,
  TagRemoveBtn,
} from "../../ui/ServiceForm/styled";

interface ServiceSectionProps {
  initialStaffId: string;
}

const ServiceSection = ({ initialStaffId }: ServiceSectionProps) => {
  const [open, setOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasReset, setHasReset] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState<string>("");

  const mainForm = useFormContext();
  const {
    formState: { errors },
  } = mainForm;
  const currentStaffId = mainForm?.watch("staff_id") || "";
  const currentServiceIds = mainForm?.watch("service_ids") || [];
  const appointmentId = mainForm?.watch("id") || "";

  // Staff form methods
  const staffMethods = useForm({
    defaultValues: { staff_id: currentStaffId },
  });
  const selectedStaffId = staffMethods.watch("staff_id");
  // TanStack Query hooks
  const { data: allServices = [], isLoading: servicesLoading } = useServices();
  const { data: staffServices = [] } = useServicesByStaff(
    selectedStaffId || ""
  );

  // Sync staffMethods with currentStaffId
  useEffect(() => {
    staffMethods.reset({ staff_id: currentStaffId });
  }, [currentStaffId, staffMethods]);

  // Track appointment changes and reset hasReset flag
  useEffect(() => {
    if (appointmentId !== currentAppointmentId) {
      setCurrentAppointmentId(appointmentId);
      setHasReset(false);
    } else if (appointmentId === "" && currentAppointmentId !== "") {
      setHasReset(false);
    }
  }, [appointmentId, currentAppointmentId]);

  // Sync selected services and handle reset logic
  useEffect(() => {
    // Sync services from form
    if (currentServiceIds.length > 0) {
      setSelectedServices(currentServiceIds);
    }

    // Reset when staff changes in same event
    if (
      initialStaffId &&
      currentStaffId &&
      currentStaffId !== initialStaffId &&
      !hasReset &&
      appointmentId === currentAppointmentId &&
      currentAppointmentId !== ""
    ) {
      setSelectedServices([]);
      if (mainForm) {
        mainForm.setValue("service_ids", []);
        mainForm.trigger("service_ids");
      }
      setHasReset(true);
    }
  }, [
    currentServiceIds,
    currentStaffId,
    initialStaffId,
    hasReset,
    appointmentId,
    currentAppointmentId,
    mainForm,
  ]);

  const services = selectedStaffId ? staffServices : allServices;

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

      if (mainForm && selectedStaffId) {
        // Đánh dấu đã reset để tránh double reset
        if (selectedStaffId !== initialStaffId) {
          setHasReset(true);
        }
        mainForm.setValue("staff_id", selectedStaffId);
      }

      if (mainForm) {
        mainForm.setValue("service_ids", selectedServices);
        mainForm.trigger("service_ids");
      }

      setOpen(false);
    },
    [mainForm, selectedStaffId, selectedServices, initialStaffId]
  );

  const handleServiceToggle = useCallback(
    (serviceId: string) => {
      setSelectedServices((prev) => {
        const newServices = prev.includes(serviceId)
          ? prev.filter((id) => id !== serviceId)
          : [...prev, serviceId];

        // Cập nhật form chính
        if (mainForm) {
          mainForm.setValue("service_ids", newServices);
        }

        return newServices;
      });
      setSearchTerm("");
    },
    [mainForm]
  );

  const renderToggleContent = useCallback(() => {
    if (servicesLoading) {
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
  }, [selectedServices, services, handleServiceToggle, servicesLoading]);

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
