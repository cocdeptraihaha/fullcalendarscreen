import { useState, useRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Minus } from "react-feather";
import {
  TimeContainer,
  TimePickerWrapper,
  TimeInput,
  TimeDropdown,
  TimeOption,
} from "./styled";

interface TimePickerComponentProps {
  name: string;
  placeholder?: string;
}

const formatTimeDisplay = (hour: number, minute: number) => {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${period}`;
};

const getDefaultStartTime = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 5) * 5;
  const hour = roundedMinutes >= 60 ? now.getHours() + 1 : now.getHours();
  const finalMinutes = roundedMinutes >= 60 ? 0 : roundedMinutes;
  return `${hour.toString().padStart(2, "0")}:${finalMinutes
    .toString()
    .padStart(2, "0")}`;
};

const getDefaultEndTime = (startTime: string) => {
  const [hour, minute] = startTime.split(":").map(Number);
  const totalMinutes = hour * 60 + minute + 30;
  const endHour = Math.floor(totalMinutes / 60) % 24;
  const endMinute = totalMinutes % 60;
  return `${endHour.toString().padStart(2, "0")}:${endMinute
    .toString()
    .padStart(2, "0")}`;
};

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 8; hour < 20; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const timeStr = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      const displayTime = formatTimeDisplay(hour, minute);
      options.push({ value: timeStr, display: displayTime });
    }
  }
  return options;
};

function TimePickerComponent({ name }: TimePickerComponentProps) {
  const { control, watch, setValue } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const startValue = watch("start");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (name === "start" && !startValue) {
      const defaultStart = getDefaultStartTime();
      setValue("start", `${today}T${defaultStart}:00`);
    } else if (name === "end" && startValue && !watch("end")) {
      const startTime = startValue.split("T")[1]?.substring(0, 5);
      if (startTime) {
        const defaultEnd = getDefaultEndTime(startTime);
        setValue("end", `${today}T${defaultEnd}:00`);
      }
    }
  }, [name, startValue, setValue, watch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const timeOptions = generateTimeOptions();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const dateTime = field.value || "";
        const timeValue = dateTime.includes("T")
          ? dateTime.split("T")[1]?.substring(0, 5)
          : "";
        const displayTime = timeValue
          ? (() => {
              const [hour, minute] = timeValue.split(":").map(Number);
              return formatTimeDisplay(hour, minute);
            })()
          : "";

        const handleTimeSelect = (timeObj: {
          value: string;
          display: string;
        }) => {
          const date =
            dateTime.split("T")[0] || new Date().toISOString().split("T")[0];
          field.onChange(`${date}T${timeObj.value}:00`);

          if (name === "start") {
            const defaultEnd = getDefaultEndTime(timeObj.value);
            setValue("end", `${date}T${defaultEnd}:00`);
          }

          setIsOpen(false);
        };

        return (
          <TimePickerWrapper ref={wrapperRef}>
            <TimeInput onClick={() => setIsOpen(!isOpen)}>
              {displayTime}
            </TimeInput>
            {isOpen && (
              <TimeDropdown>
                {timeOptions.map((timeObj) => (
                  <TimeOption
                    key={timeObj.value}
                    isSelected={timeObj.value === timeValue}
                    onClick={() => handleTimeSelect(timeObj)}
                  >
                    {timeObj.display}
                  </TimeOption>
                ))}
              </TimeDropdown>
            )}
          </TimePickerWrapper>
        );
      }}
    />
  );
}

export default function TimePicker() {
  return (
    <TimeContainer>
      <TimePickerComponent name="start" />
      <Minus color="#184561" size={16} />
      <TimePickerComponent name="end" />
    </TimeContainer>
  );
}
