import { useState, useEffect } from "react";
import { InputContainer, InputLabel } from "./styled";
import { fetchServices } from "../../../services/api";
import { useForm, useFormContext } from "react-hook-form";
import ServiceForm from "../../ui/ServiceForm";
import { TagsContainer, ServiceTag, TagRemoveBtn } from "../../ui/ServiceForm/styled";

interface ServiceItem {
  id: string;
  name: string;
}

const ServiceSection = () => {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const mainForm = useFormContext();
  const currentStaff = mainForm?.watch("staff") || "";
  const currentServices = mainForm?.watch("services") || [];

  // Staff form methods
  const staffMethods = useForm({
    defaultValues: { staff: currentStaff },
  });
  const selectedStaff = staffMethods.watch("staff");

  // Fetch services once
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        // Handle error silently
      }
    };
    loadServices();
  }, []);

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

  const handleToggle = () => {
    const staffValue = mainForm?.getValues("staff") || "";
    staffMethods.reset({ staff: staffValue });
    setOpen(true);
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpen(false);
  };

  const handleAdd = (e?: React.MouseEvent) => {
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
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
    setSearchTerm("");
  };

  const renderToggleContent = () => {
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
      <span style={{ color: "#999", padding: "10px" }}>
        Select services...
      </span>
    );
  };

  return (
    <InputContainer>
      <InputLabel>Service</InputLabel>
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
