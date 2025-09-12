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

const unixToDateTime = (timestamp: number): string => {
  return new Date(timestamp).toISOString().slice(0, 19);
};

interface DatePickerProps {
  name: string;
  onDateSelect: (date: Date, fieldName: string, currentValue: any) => void;
}

export default function DatePicker({ name, onDateSelect }: DatePickerProps) {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    const d = typeof date === "number" ? new Date(date) : new Date(date);
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
    if (date.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
    
    onDateSelect(date, name, field.value);
    setIsOpen(false);
  };

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const today = new Date();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const fieldValue =
          typeof field.value === "number"
            ? unixToDateTime(field.value)
            : field.value;
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
                          $isToday={isToday}
                          $isSelected={isSelected}
                          $isOtherMonth={isOtherMonth}
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
