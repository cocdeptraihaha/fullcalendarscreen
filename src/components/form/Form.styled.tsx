import styled from "styled-components";

export const FormContainer=styled.div`
position:fixed;
z-index:1100;
top:0;
height:100vh;
width:100vw;
background-color: rgba(0, 0, 0, 0.5);
display:flex;
justify
`
export const FormModal=styled.div`
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width:500px;
  background-color:#fff;
  border-radius:6px;
`



export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
`;

export const Title = styled.input`
  font-size: 1.2rem;
  color: #333;

`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;

  cursor: pointer;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const FormGroup = styled.div<{ full?: boolean }>`
  flex: ${(props) => (props.full ? "100%" : "1")};
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 6px;
    font-size: 0.9rem;
    color: #555;
  }

  input, select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.95rem;
  }
`;

export const VideoBtn = styled.button`
  width: 100%;
  padding: 12px;
  background: #0b355e;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 20px;
`;

export const CancelBtn = styled.button`
  background: #f3f3f3;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
`;

export const CreateBtn = styled.button`
  background: #0b355e;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
`;