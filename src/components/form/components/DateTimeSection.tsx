import { DateTimeContainer, InputContainer, InputLabel } from "./styled";
import { ErrorMessage } from "../Form.styled";
import { useFormContext } from "react-hook-form";
import DatePicker from "../../ui/DatePicker";
import TimePicker from "../../ui/TimePicker";

const DateTimeSection = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <DateTimeContainer>
      <InputContainer>
        <InputLabel>Date and time</InputLabel>
        <DatePicker name="start" placeholder="Select Date" />
      </InputContainer>

      <InputContainer>
        <InputLabel>Date & Time</InputLabel>
        <TimePicker />
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
