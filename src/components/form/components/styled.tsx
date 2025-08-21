import styled from "styled-components";

export const InputContainer = styled.div`
  display: grid;
  grid-template-rows: 20px 40px;
  gap: 5px;
`;
export const InputLabel = styled.div`
  display: block;
  font-size: 16px;
  color: #184561;
`;

// ***Container
//     InputContainer
//         InputLabel
//         Inputfield

export const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  width: 550px;
`;
export const DateTimeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;
export const ContactInput = styled.select`
  font-size: 20px;
  background-color: #fff;
  width: 300px;
`;
export const TypeInput = styled.input`
  font-size: 20px;
  background-color: #fff;
  width: 220px;
`;
export const StaffInput = styled.input`
  font-size: 20px;
  background-color: #fff;
`;
export const ServiceFormToggle = styled.button`
  border: 1px solid #dedede;
  background-color: #fff;
`;
export const DateInput = styled.input`
  height: 30px;
  font-size: 20px;
  background-color: #fff;
`;
export const TimeInput = styled.input`
  height: 30px;
  font-size: 20px;
  background-color: #fff;
`;
