import { useFormContext, Controller } from "react-hook-form";
import { TimeInput } from "./styled";

export default function TimeRangePicker() {
  const { control } = useFormContext();
  
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Controller
        control={control}
        name="start"
        render={({ field }) => {
          const dateTime = field.value || '';
          const timeValue = dateTime.includes('T') ? dateTime.split('T')[1]?.substring(0, 5) : '';
          
          return (
            <TimeInput
              type="time"
              value={timeValue}
              onChange={(e) => {
                const date = dateTime.split('T')[0] || new Date().toISOString().split('T')[0];
                field.onChange(`${date}T${e.target.value}:00`);
              }}
            />
          );
        }}
      />
      
      <span>-</span>
      
      <Controller
        control={control}
        name="end"
        render={({ field }) => {
          const dateTime = field.value || '';
          const timeValue = dateTime.includes('T') ? dateTime.split('T')[1]?.substring(0, 5) : '';
          
          return (
            <TimeInput
              type="time"
              value={timeValue}
              onChange={(e) => {
                const date = dateTime.split('T')[0] || new Date().toISOString().split('T')[0];
                field.onChange(`${date}T${e.target.value}:00`);
              }}
            />
          );
        }}
      />
    </div>
  );
}
