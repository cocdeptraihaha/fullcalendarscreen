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
import { useDebounce } from "../../../hooks/useDebounce";

interface ServiceSectionProps {
  initialStaffId: string;
}

const ServiceSection = ({ initialStaffId }: ServiceSectionProps) => {
  const [open, setOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
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

  // Track appointment changes, reset flags, and sync services
  useEffect(() => {
    // Track appointment changes
    if (appointmentId !== currentAppointmentId) {
      setCurrentAppointmentId(appointmentId);
      setHasReset(false);
    } else if (appointmentId === "" && currentAppointmentId !== "") {
      setHasReset(false);
    }

    // Clear services for new form
    if (!appointmentId || appointmentId === "") {
      setSelectedServices([]);
      return;
    }

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
    appointmentId,
    currentAppointmentId,
    currentServiceIds,
    currentStaffId,
    initialStaffId,
    hasReset,
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
      {(!errors.service_ids && <InputLabel>Service</InputLabel>) ||
        (errors.service_ids && (
          <ErrorMessage>{(errors.service_ids as any)?.message}</ErrorMessage>
        ))}
      <ServiceForm
        open={open}
        services={services}
        selectedServices={selectedServices}
        searchTerm={debouncedSearchTerm}
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
