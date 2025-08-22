import { useFormContext, Controller } from "react-hook-form";
import { DateInput } from "./styled";

export default function CustomDatePicker() {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="start"
      render={({ field }) => (
        <DateInput
          type="date"
          value={field.value ? field.value.split("T")[0] : ""}
          onChange={(e) => field.onChange(e.target.value + "T00:00:00")}
        />
      )}
    />
  );
}
