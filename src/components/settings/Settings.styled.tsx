import styled from "styled-components";

export const SettingsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: #184561;
`;

export const SettingsModal = styled.div`
  position: absolute;
  background: white;
  border-radius: 8px;
  width: 800px;
  height: 550px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

export const ModalContent = styled.div`
  display: flex;
  height: 400px;
  flex: 1;
  overflow: hidden;
  color: #184561;
`;

export const SettingsSidebar = styled.div`
  width: 200px;
  background: #f8f8f8;
  border-right: 1px solid #eee;
  padding: 20px 0;
`;

export const SidebarItem = styled.div<{ $active?: boolean }>`
  padding: 12px 15px;
  margin-left: 10px;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#184561" : "#666")};
  background: ${(props) => (props.$active ? "#e3f2fd" : "transparent")};
  border-radius: 3px;
  border-left: ${(props) => (props.$active ? "3px solid #184561" : "none")};

  &:hover {
    background: #e3f2fd;
    color: #184561;
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #f8f8f8;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    color: #184561;
  }
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const Section = styled.div`
  margin-bottom: 30px;

  p {
    color: #666;
    margin: 10px 0;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const ContactCheckbox = styled.input`
  position: absolute;
  margin-right: 12px;
  accent-color: #184561;
  cursor: pointer;
  right: 10px;
`;

export const ContactName = styled.span``;

export const TypeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0px;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
  s span {
    margin-left: 12px;
  }
`;

export const ColorPicker = styled.input`
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffffff;
  color: #cccccc;
  border: 1px solid #cccccc;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    color: #184561;
    border: 1px solid #184561;
  }
`;

export const CancelButton = styled.button`
  position: absolute;
  background: #fff;
  color: #184561;
  border: none;
  right: 20px;
  padding: 12px 24px;
  border-radius: 4px;
  border: 1px solid #184561;
  cursor: pointer;
  width: 80px;
  justify-content: center;
  allign-item: center;
  display: flex;
  &:hover {
    background: #dedede;
  }
`;

export const TypeInput = styled.input`
  margin-left: 12px;
  flex: 1;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const TypeLabel = styled.span`
  margin-left: 12px;
  flex: 1;
`;

export const IconButton = styled.div<{ color?: string }>`
  cursor: pointer;
  margin-left: 8px;
  color: ${(props) => props.color || "#666"};
  &:first-of-type {
    margin-left: auto;
  }
  &:last-of-type {
    margin-left: 4px;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 40px;
  border-top: 1px solid #eee;
`;
