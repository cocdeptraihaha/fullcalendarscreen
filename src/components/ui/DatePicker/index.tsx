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

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
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
    console.log("Date selected:", date);
    // Use local date string to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    const currentValue = field.value || "";
    const timeStr = currentValue.includes("T")
      ? currentValue.split("T")[1]
      : "09:00:00";

    const newValue = `${dateStr}T${timeStr}`;
    console.log("Setting date value:", newValue);
    field.onChange(newValue);

    if (name === "start") {
      const endTime = endValue?.split("T")[1] || "10:00:00";
      const newEndValue = `${dateStr}T${endTime}`;
      console.log("Setting end date:", newEndValue);
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
        const selectedDate = field.value ? new Date(field.value) : null;
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
