import styled from "styled-components";
export const FormContainer = styled.div`
  position: fixed;
  z-index: 1100;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
`;

export const FormModal = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width: 550px;
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
`;

export const TitleInput = styled.input`
  font-size: 24px;
  font-weight: 300;
  color: #333;
  border: none;
  background: transparent;
  flex: 1;
  padding: 8px 0;
  outline: none;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-bottom-color: #184561;
  }
`;

export const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 44px;
  width: 44px;
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f5f5f5;
  }
`;
export const ModalBody = styled.div`
  height: 400px;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
`;

export const FormFotter = styled.div`
  position: absolute;
  display: flex;
  height: 50px;
  bottom: 15px;
  right: 20px;
  gap: 10px;
  justify-content: center;
  align-items: center;
  button {
    border-radius: 6px;
    background-color: #184561;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  }
`;
export const CancelButton = styled.button`
  height: 40px;
  width: 80px;
  color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
export const DeleteButton = styled.button`
  height: 40px;
  width: 80px;
  background: #ff0000ff !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
export const AddButton = styled.button`
  height: 40px;
  width: 100px;
  color: rgba(255, 255, 255, 1);
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

export const ToastButton = styled.button<{ variant?: "danger" | "secondary" }>`
  padding: 5px 10px;
  background-color: ${(props) =>
    props.variant === "danger" ? "#fff" : "#184561"};
  color: ${(props) => (props.variant === "danger" ? "#ff0000ff" : "#fff")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  border: ${(props) =>
    props.variant === "danger" ? "1px solid #ff0000ff" : "1px solid #184561"};
  &:hover {
    opacity: 0.9;
  }
`;

export const ToastContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;
