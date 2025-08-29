import {
  useState,
  useEffect,
  useCallback,
  MouseEvent,
  useMemo,
  memo,
  useRef,
} from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface ServiceSectionProps {
  initialStaffId: string;
}

const ServiceSection = memo(({ initialStaffId }: ServiceSectionProps) => {
  const [open, setOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastFormOpenState, setLastFormOpenState] = useState(false);
  const [hasReset, setHasReset] = useState(false);
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

  // Redux state to track form open/close
  const { open: formOpen } = useSelector((state: RootState) => state.form);

  // TanStack Query hooks
  const { data: allServices = [], isLoading: servicesLoading } = useServices();
  const { data: staffServices = [] } = useServicesByStaff(
    selectedStaffId || ""
  );

  // Stable refs to prevent unnecessary rerenders
  const mainFormRef = useRef(mainForm);
  mainFormRef.current = mainForm;

  // Handle form open/close and data sync
  useEffect(() => {
    // Form just opened - clean first
    if (formOpen && !lastFormOpenState) {
      setSelectedServices([]);
      setSearchTerm("");
      setHasReset(false);
      setLastFormOpenState(true);
      return;
    }

    // Form closed - reset state
    if (!formOpen && lastFormOpenState) {
      setLastFormOpenState(false);
      return;
    }

    // Form is open - sync data
    if (formOpen && currentServiceIds.length > 0) {
      setSelectedServices(currentServiceIds);
    }

    // Reset when staff changes (update form only) - only once
    if (
      formOpen &&
      appointmentId &&
      initialStaffId &&
      currentStaffId !== initialStaffId &&
      !hasReset
    ) {
      setSelectedServices([]);
      setHasReset(true);
      if (mainFormRef.current) {
        mainFormRef.current.setValue("service_ids", []);
        mainFormRef.current.trigger("service_ids");
      }
    }
  }, [
    formOpen,
    lastFormOpenState,
    currentServiceIds,
    appointmentId,
    initialStaffId,
    currentStaffId,
  ]);

  // Sync staffMethods with currentStaffId
  useEffect(() => {
    staffMethods.reset({ staff_id: currentStaffId });
  }, [currentStaffId, staffMethods]);

  // Reset services when staff changes
  useEffect(() => {
    if (selectedStaffId && selectedStaffId !== currentStaffId) {
      setSelectedServices([]);
      if (mainFormRef.current) {
        mainFormRef.current.setValue("service_ids", []);
        mainFormRef.current.trigger("service_ids");
      }
    }
  }, [selectedStaffId, currentStaffId]);

  const services = selectedStaffId ? staffServices : allServices;

  // Optimize service lookup with memoized map
  const servicesMap = useMemo(() => {
    return services.reduce((acc, service) => {
      acc[service.id] = service;
      return acc;
    }, {} as Record<string, any>);
  }, [services]);

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
        mainForm.setValue("staff_id", selectedStaffId);
      }

      if (mainForm) {
        mainForm.setValue("service_ids", selectedServices);
        mainForm.trigger("service_ids");
      }

      setOpen(false);
    },
    [selectedStaffId, selectedServices, initialStaffId]
  );

  const handleServiceToggle = useCallback((serviceId: string) => {
    setSelectedServices((prev) => {
      const newServices = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];

      // Update main form
      if (mainFormRef.current) {
        mainFormRef.current.setValue("service_ids", newServices);
        mainFormRef.current.trigger("service_ids"); // Trigger validation and re-render
      }

      return newServices;
    });
    setSearchTerm("");
  }, []);

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
            const service = servicesMap[serviceId];
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
  }, [selectedServices, servicesMap, handleServiceToggle, servicesLoading]);

  return (
    <InputContainer>
      {errors.service_ids ? (
        <ErrorMessage>{(errors.service_ids as any)?.message}</ErrorMessage>
      ) : (
        <InputLabel>Service</InputLabel>
      )}
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
});

export default ServiceSection;
