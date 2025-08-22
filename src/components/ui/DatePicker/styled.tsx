import styled from "styled-components";

export const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const DateInput = styled.div`
  height: 40px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: 8px 40px 8px 12px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;

  &:focus {
    outline: none;
    border-color: #184561;
    box-shadow: 0 0 0 2px rgba(24, 69, 97, 0.1);
  }

  &:hover {
    border-color: #184561;
  }
`;

export const CalendarDropdown = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #dedede;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: block;
  margin-bottom: 4px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

export const CalendarNav = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background: #f5f5f5;
  }
`;

export const CalendarGrid = styled.div`
  padding: 12px;
`;

export const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
`;

export const WeekDay = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  padding: 8px 4px;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

export const DayCell = styled.button<{
  isToday?: boolean;
  isSelected?: boolean;
  isOtherMonth?: boolean;
}>`
  background: ${(props) =>
    props.isSelected ? "#184561" : props.isToday ? "#e3f2fd" : "transparent"};
  color: ${(props) =>
    props.isSelected
      ? "white"
      : props.isOtherMonth
      ? "#ccc"
      : props.isToday
      ? "#184561"
      : "#333"};
  border: none;
  border-radius: 4px;
  padding: 8px 4px;
  cursor: pointer;
  font-size: 14px;
  min-height: 32px;

  &:hover {
    background: ${(props) => (props.isSelected ? "#184561" : "#f0f0f0")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
