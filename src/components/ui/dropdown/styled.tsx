import styled from "styled-components";

export const StyledDropdownWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  font-size: 14px;
  color: #184561;
`;
export const StyledDropdownToggle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  gap: 5px;
  border: 1px solid #dedede;
  padding-left: 4px;
`;
export const StyledDropdownMenu = styled.div`
  display: flex;
  position: absolute;
  background: white;
  top: 110%;
  left: 0;
  right: 0;
  border: 1px solid #dedede;
  z-index: 100;
  width: 100%;
`;
export const StyledDropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  input {
    margin: 4px;
    border: 1px solid #dedede;
  }

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
export const StyledDropdownItem = styled.li`
  display: flex;
  padding: 4px 8px;
  width: 95%;
  align-items: center;
  gap: 5px;
  &:hover {
    background: #dedede;
    cursor: pointer;
  }
`;
export const StyledDropdownIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 1%;
`;
export const StyledSearchDropdownItem = styled.input`
  width: 100%;
  display:flex;
  box-sizing: border-box;
  padding: 8px 12px;
  border: none;
  outline: none;
  font-size: 16px;
  }
`;
export const StyledDropdownAvatar = styled.img`
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
