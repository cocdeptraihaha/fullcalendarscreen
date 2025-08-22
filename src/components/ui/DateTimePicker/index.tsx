import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";
import { DateTimeContainer, DateTimeRow, Label } from "./styled";

interface DateTimePickerProps {
  onDateTimeChange?: (start: string, end: string) => void;
  defaultStart?: string;
  defaultEnd?: string;
}

export default function DateTimePicker({
  onDateTimeChange,
  defaultStart,
  defaultEnd,
}: DateTimePickerProps) {
  const methods = useForm({
    defaultValues: {
      start: defaultStart || "",
      end: defaultEnd || "",
    },
  });

  const { watch } = methods;
  const startValue = watch("start");
  const endValue = watch("end");

  React.useEffect(() => {
    if (onDateTimeChange && startValue && endValue) {
      onDateTimeChange(startValue, endValue);
    }
  }, [startValue, endValue, onDateTimeChange]);

  return (
    <FormProvider {...methods}>
      <DateTimeContainer>
        <DateTimeRow>
          <Label>Date and Time</Label>
          <DatePicker name="start" />
        </DateTimeRow>

        <DateTimeRow>
          <Label></Label>
          <TimePicker />
        </DateTimeRow>
      </DateTimeContainer>
    </FormProvider>
  );
}
