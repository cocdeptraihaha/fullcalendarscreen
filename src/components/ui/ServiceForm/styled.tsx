import styled from "styled-components";

export const ServiceModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  height:500px;
  width:550px;
  background-color: #fff;
  border-radius: 6px;
  padding: 24px;
  overflow-y: auto;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);
  z-index:1100;
  }
`;
export const ServiceModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
`;
export const ServiceModalTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #184561;
  margin-left: 10px;
`;
export const ServiceModalToggle = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dedede;
  cursor: pointer;
  justify-content: center;
  box-sizing: border-box;
  padding: 4px;

  &:focus {
    outline: none;
    border-color: #184561;
  }
`;
export const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 36px;
  width: 36px;
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
export const SearchService = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: none;
  outline: none;
  font-size: 16px;
  height:40px;

    border: 1px solid #dedede;
  }
`;

export const StaffContainer = styled.div`
  height: 80px;

  width: 100%;
`;
export const ServiceMenu = styled.div`
  display: flex;
  position: relative;
  background: white;
  border: 1px solid #dedede;
  width: 100%;
  margin-top: 10px;
`;
export const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
  max-height: 100px;
  overflow-y: auto;
  overflow-x: auto
  list-style: none;

  /* optional: custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
`;
export const Service = styled.li`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  color: #184561;
  gap: 5px;
  &:hover {
    background: #dedede;
    cursor: pointer;
  }
`;
export const ServiceFormFotter = styled.div`
  position: absolute;
  display: flex;
  width: 200px;
  height: 50px;
  bottom: 15px;
  right: 20px;
  gap: 20px;
  justify-content: center;
  align-items: center;
  button {
    border-radius: 6px;
    background-color: #184561;
  }
`;
export const CancelButton = styled.button`
  height: 40px;
  width: 80px;
  color: rgba(255, 255, 255, 1);
`;
export const AddButton = styled.button`
  height: 40px;
  width: 80px;
  color: rgba(255, 255, 255, 1);
`;
export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #184561;
  border-radius: 4px;
  cursor: pointer;
  vvvvvv &:checked {
    background-color: #184561;
  }
`;
export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 5px;
  padding: 4px 0;
  width: 100%;
  align-items: center;
  height: 30px;
  min-height: 30px;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 2px;
  }
`;

export const ServiceTag = styled.span`
  background-color: #184561;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TagRemoveBtn = styled.span`
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
  }
`;
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  min-height: 40px;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 100px;
  font-size: 16px;
`;

export const ServiceSectionTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #184561;
  margin-top: 15px;
`;

export const ServiceSectionSubtitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;
