import { DateTimeContainer, InputContainer, InputLabel } from "./styled";
import { ErrorMessage } from "../Form.styled";
import { useFormContext } from "react-hook-form";
import DatePicker from "../../ui/DatePicker";
import TimePicker from "../../ui/TimePicker";

const unixToDateTime = (timestamp: number): string => {
  return new Date(timestamp).toISOString().slice(0, 19);
};

const DateTimeSection = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  
  const endValue = watch("end") as string;
  
  const handleDateSelect = (date: Date, fieldName: string, currentValue: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    let timeStr = "09:00:00";

    if (typeof currentValue === "number") {
      const currentDateTime = unixToDateTime(currentValue);
      timeStr = currentDateTime.includes("T")
        ? currentDateTime.split("T")[1]
        : "09:00:00";
    } else if (typeof currentValue === "string" && currentValue.includes("T")) {
      timeStr = currentValue.split("T")[1];
    }

    const newValue = `${dateStr}T${timeStr}`;
    setValue(fieldName, newValue);

    if (fieldName === "start") {
      let endTimeStr = "10:00:00";
      if (typeof endValue === "number") {
        const endDateTime = unixToDateTime(endValue);
        endTimeStr = endDateTime.includes("T")
          ? endDateTime.split("T")[1]
          : "10:00:00";
      } else if (typeof endValue === "string" && endValue?.includes("T")) {
        endTimeStr = endValue.split("T")[1];
      }
      const newEndValue = `${dateStr}T${endTimeStr}`;
      setValue("end", newEndValue);
    }
  };
  
  const handleTimeChange = (fieldName: string, value: string) => {
    if (fieldName === "start") {
      const [date, time] = value.split("T");
      const [hour, minute] = time.split(":").map(Number);
      const totalMinutes = hour * 60 + minute + 30;
      const newHour = Math.floor(totalMinutes / 60) % 24;
      const newMinute = totalMinutes % 60;
      const endTime = `${newHour.toString().padStart(2, "0")}:${newMinute.toString().padStart(2, "0")}:00`;
      setValue("end", `${date}T${endTime}`);
    }
  };

  return (
    <DateTimeContainer>
      <InputContainer>
        <InputLabel>Date and time</InputLabel>
        <DatePicker name="start" onDateSelect={handleDateSelect} />
      </InputContainer>

      <InputContainer>
        <InputLabel>Date & Time</InputLabel>
        <TimePicker onTimeChange={setValue} />
        {(errors.start || errors.end) && (
          <ErrorMessage>
            {(errors.start as any)?.message || (errors.end as any)?.message}
          </ErrorMessage>
        )}
      </InputContainer>
    </DateTimeContainer>
  );
};

export default DateTimeSection;
