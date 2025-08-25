import { DateTimeContainer, InputContainer, InputLabel } from "./styled";
import DatePicker from "../../ui/DatePicker";
import TimePicker from "../../ui/TimePicker";

const DateTimeSection = () => {
  return (
    <DateTimeContainer>
      <InputContainer>
        <InputLabel>Date and time</InputLabel>
        <DatePicker name="start" placeholder="Select Date" />
      </InputContainer>

      <InputContainer>
        <InputLabel></InputLabel>
        <TimePicker />
      </InputContainer>
    </DateTimeContainer>
  );
};

export default DateTimeSection;
