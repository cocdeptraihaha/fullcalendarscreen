import { useFormContext } from "react-hook-form";
import ServiceFormComponent from "../../ui/ServiceForm";

const ServiceSection = () => {
  const { control } = useFormContext(); // Get form control from context

  return <ServiceFormComponent control={control} />;
};

export default ServiceSection;
