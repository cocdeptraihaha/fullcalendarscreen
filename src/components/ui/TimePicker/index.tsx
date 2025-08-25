import { useState, useRef, useEffect, useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Minus } from "react-feather";
import {
  TimeContainer,
  TimePickerWrapper,
  TimeInput,
  TimeDropdown,
  TimeOption,
} from "./styled";

// Utils
const formatTime = (hour: number, minute: number) =>
  `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

const formatTimeDisplay = (hour: number, minute: number) => {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${period}`;
};

const addMinutes = (timeStr: string, minutes: number) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  const totalMinutes = hour * 60 + minute + minutes;
  const newHour = Math.floor(totalMinutes / 60) % 24;
  const newMinute = totalMinutes % 60;
  return formatTime(newHour, newMinute);
};

const getToday = () => new Date().toISOString().split("T")[0];

const parseDateTime = (dateTime: string) => {
  if (!dateTime?.includes("T")) return { date: getToday(), time: "" };
  const [date, timeWithSeconds] = dateTime.split("T");
  const time = timeWithSeconds?.substring(0, 5) || "";
  return { date, time };
};

interface TimePickerComponentProps {
  name: "start" | "end";
}

function TimePickerComponent({ name }: TimePickerComponentProps) {
  const { control, setValue } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Generate time options (8AM - 8PM, 5min intervals)
  const timeOptions = useMemo(() => {
    const options = [];
    for (let hour = 8; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const timeStr = formatTime(hour, minute);
        const display = formatTimeDisplay(hour, minute);
        options.push({ value: timeStr, display });
      }
    }
    return options;
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const { date, time } = parseDateTime(field.value);
        const displayTime = time
          ? (() => {
              const [hour, minute] = time.split(":").map(Number);
              return formatTimeDisplay(hour, minute);
            })()
          : "";

        const handleTimeSelect = (timeObj: {
          value: string;
          display: string;
        }) => {
          field.onChange(`${date}T${timeObj.value}:00`);

          // Auto-update end time when start time changes
          if (name === "start") {
            const newEndTime = addMinutes(timeObj.value, 30);
            setValue("end", `${date}T${newEndTime}:00`);
          }

          setIsOpen(false);
        };

        return (
          <TimePickerWrapper ref={wrapperRef}>
            <TimeInput onClick={() => setIsOpen(!isOpen)}>
              {displayTime || "Select time"}
            </TimeInput>
            {isOpen && (
              <TimeDropdown>
                {timeOptions.map((timeObj) => (
                  <TimeOption
                    key={timeObj.value}
                    isSelected={timeObj.value === time}
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
