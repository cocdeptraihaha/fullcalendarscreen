import styled from "styled-components";
export const FormContainer = styled.div`
  position: fixed;
  z-index: 1100;
  top: 0;
  left:0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  input {
  border:5px;
  border-radius:3px;
  border-color: rgba(24, 69, 97, 0.3);
  }
`;

export const FormModal = styled.div`
  position: relative;
  height:500px;
  width:550px;
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  overflow-y: auto;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);
  }
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

export const CloseBtn = styled.button`
  background-color:#fff;
  background-image: url("src/assets/x.svg"); /* file svg trong public/icons */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 24px;
  border: none;
  height:44px;
  width:44px;
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
    height:400px;
  display: grid;
  grid-template-rows: repeat(5, 1fr); /* 4 dòng bằng nhau */
  gap: 8px;
  button {
  border-radius: 6px;
  background-color: #184561;
  
  }
  `
  export const VideoButton = styled.button`
  position:relative;
  display:flex;
  justify-content:center;
    align-items: center;
  border-radius: 6px;
  height:40px;
  background-color: #184561;
  gap:10px;
  color: #fff;
`

  export const FormFotter =styled.div`
  position:absolute;
  display:flex;
  width:200px;
  height:50px;
  bottom:15px;
  right:20px;
  gap:20px;
  justify-content:center;
  align-items: center;
  button {
  border-radius: 6px;
  background-color: #184561;
  }
  `
export const CancelButton = styled.button`
  height:40px;
  width:80px;
  color: rgba(255, 255, 255, 1);

`
export const AddButton = styled.button`
  height:40px;
  width:80px;
  color: rgba(255, 255, 255, 1);
`