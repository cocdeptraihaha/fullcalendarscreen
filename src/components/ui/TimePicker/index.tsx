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
  if (!dateTime) return { date: getToday(), time: "" };

  let dateTimeStr: string;
  dateTimeStr = dateTime;
  if (!dateTimeStr.includes("T")) return { date: getToday(), time: "" };
  const [date, timeWithSeconds] = dateTimeStr.split("T");
  let time = timeWithSeconds?.substring(0, 5) || "";
  return { date, time };
};

interface TimePickerComponentProps {
  name: "start" | "end";
  onTimeChange: (fieldName: string, value: string) => void;
}

function TimePickerComponent({ name, onTimeChange }: TimePickerComponentProps) {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const timeOptions = useMemo(() => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
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

  // Scroll to selected time when dropdown opens
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const selectedOption = dropdownRef.current.querySelector(
        '[data-selected="true"]'
      );
      if (selectedOption) {
        selectedOption.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }
  }, [isOpen]);

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
          const newValue = `${date}T${timeObj.value}:00`;
          field.onChange(newValue);
          onTimeChange(name, newValue);
          
          setIsOpen(false);
        };

        return (
          <TimePickerWrapper ref={wrapperRef}>
            <TimeInput onClick={() => setIsOpen(!isOpen)}>
              {displayTime || "Select time"}
            </TimeInput>
            {isOpen && (
              <TimeDropdown ref={dropdownRef}>
                {timeOptions.map((timeObj) => (
                  <TimeOption
                    key={timeObj.value}
                    isSelected={timeObj.value === time}
                    data-selected={timeObj.value === time}
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

interface TimePickerProps {
  onTimeChange: (fieldName: string, value: string) => void;
}

export default function TimePicker({ onTimeChange }: TimePickerProps) {
  return (
    <TimeContainer>
      <TimePickerComponent name="start" onTimeChange={onTimeChange} />
      <Minus color="#184561" size={16} />
      <TimePickerComponent name="end" onTimeChange={onTimeChange} />
    </TimeContainer>
  );
}
