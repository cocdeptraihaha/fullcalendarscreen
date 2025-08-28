import { useState, useRef, useEffect } from "react";
import {
  useFormContext,
  Controller,
  ControllerRenderProps,
} from "react-hook-form";
import { Calendar, ChevronLeft, ChevronRight } from "react-feather";
import {
  DatePickerWrapper,
  DateInput,
  CalendarDropdown,
  CalendarHeader,
  CalendarNav,
  CalendarGrid,
  WeekDays,
  WeekDay,
  DaysGrid,
  DayCell,
} from "./styled";

// DateTime conversion utilities
const dateTimeToUnix = (dateTimeStr: string): number => {
  return new Date(dateTimeStr).getTime();
};

const unixToDateTime = (timestamp: number): string => {
  return new Date(timestamp).toISOString().slice(0, 19);
};

const unixToDateOnly = (timestamp: number): string => {
  return new Date(timestamp).toISOString().slice(0, 10);
};

interface DatePickerProps {
  name: string;
  placeholder?: string;
}

export default function DatePicker({ name }: DatePickerProps) {
  const { control, setValue, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const endValue = watch("end") as string;

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

  const formatDate = (date: string | number) => {
    if (!date) return "";
    const d = typeof date === 'number' ? new Date(date) : new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const handleDateSelect = (date: Date, field: ControllerRenderProps) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    const currentValue = field.value || "";
    let timeStr = "09:00:00";
    
    if (typeof currentValue === 'number') {
      // Unix timestamp - extract time part
      const currentDateTime = unixToDateTime(currentValue);
      timeStr = currentDateTime.includes("T") ? currentDateTime.split("T")[1] : "09:00:00";
    } else if (typeof currentValue === 'string' && currentValue.includes("T")) {
      // ISO string - extract time part
      timeStr = currentValue.split("T")[1];
    }

    const newValue = `${dateStr}T${timeStr}`;
    field.onChange(newValue);

    if (name === "start") {
      let endTimeStr = "10:00:00";
      if (typeof endValue === 'number') {
        const endDateTime = unixToDateTime(endValue);
        endTimeStr = endDateTime.includes("T") ? endDateTime.split("T")[1] : "10:00:00";
      } else if (typeof endValue === 'string' && endValue?.includes("T")) {
        endTimeStr = endValue.split("T")[1];
      }
      const newEndValue = `${dateStr}T${endTimeStr}`;
      setValue("end", newEndValue);
    }

    setIsOpen(false);
  };

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const today = new Date();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const fieldValue = typeof field.value === 'number' ? unixToDateTime(field.value) : field.value;
        const selectedDate = fieldValue ? new Date(fieldValue) : null;
        const days = getDaysInMonth(currentMonth);

        return (
          <DatePickerWrapper ref={wrapperRef}>
            <DateInput onClick={() => setIsOpen(!isOpen)}>
              <Calendar
                size={18}
                color="#184561"
                style={{ marginRight: "8px" }}
              />
              {field.value ? formatDate(field.value) : "Select Date"}
            </DateInput>

            {isOpen && (
              <CalendarDropdown>
                <CalendarHeader>
                  <CalendarNav
                    type="button"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1
                        )
                      )
                    }
                  >
                    <ChevronLeft size={16} />
                  </CalendarNav>

                  <span>
                    {currentMonth.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <CalendarNav
                    type="button"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1
                        )
                      )
                    }
                  >
                    <ChevronRight size={16} />
                  </CalendarNav>
                </CalendarHeader>

                <CalendarGrid>
                  <WeekDays>
                    {weekDays.map((day) => (
                      <WeekDay key={day}>{day}</WeekDay>
                    ))}
                  </WeekDays>

                  <DaysGrid>
                    {days.map((day, index) => {
                      const isToday =
                        day.toDateString() === today.toDateString();
                      const isSelected = Boolean(
                        selectedDate &&
                          day.toDateString() === selectedDate.toDateString()
                      );
                      const isOtherMonth =
                        day.getMonth() !== currentMonth.getMonth();

                      return (
                        <DayCell
                          key={index}
                          isToday={isToday}
                          isSelected={isSelected}
                          isOtherMonth={isOtherMonth}
                          onClick={() => handleDateSelect(day, field)}
                        >
                          {day.getDate()}
                        </DayCell>
                      );
                    })}
                  </DaysGrid>
                </CalendarGrid>
              </CalendarDropdown>
            )}
          </DatePickerWrapper>
        );
      }}
    />
  );
}
