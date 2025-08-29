import styled from "styled-components";

export const TimeContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #dedede;
`;

export const TimePickerWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const TimeInput = styled.div`
  height: 35px;
  font-size: 14px;
  background-color: #fff;
  border: none;
  border-radius: 4px;
  padding: 3px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #184561;

  &:focus {
    outline: none;
    border-color: #184561;
    box-shadow: 0 0 0 2px rgba(24, 69, 97, 0.1);
  }

  &:hover {
    border-color: #184561;
  }
`;

export const ClockIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;

  svg {
    transform: rotate(90deg);
  }
`;

export const TimeDropdown = styled.div`
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
  max-height: 200px;
  overflow-y: auto;
`;

export const TimeOption = styled.div<{ isSelected?: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  background: ${(props) => (props.isSelected ? "#184561" : "transparent")};
  color: ${(props) => (props.isSelected ? "white" : "#333")};

  &:hover {
    background: ${(props) => (props.isSelected ? "#184561" : "#f0f0f0")};
  }
`;
