import styled from "styled-components";

export const PhoneNumberContainer = styled.div`
  .PhoneInput {
      padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;
  &:focus {
    outline: none;
    border-color: #184561;
  }

  &::placeholder {
    color: #999;
  }
  }

  .PhoneInputInput {
  border: none;
  outline: none;
  font-size: 14px;
  color: #184561;
  }
  .PhoneInputCountrySelect {
  color: #184561;
  border: none;
  outline: none;
  font-size: 14px;
  border-radius: 6px;
  }
  .PhoneInputCountrySelectArrow {
  none;
}
`;
