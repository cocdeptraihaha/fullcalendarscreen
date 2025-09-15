import styled from "styled-components";
export const SidebarContainer = styled.div`
  position: fixed;
  background-color: white;
  left: 0;
  width: 65px;
  height: 100%;
  font-family: Roboto;
  top: 45px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 800;
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  height: 32%;
  margin: 0;
  margin-top: 5px;
  align-items: center;
  gap: 8px;
`;
interface ItemProps {
  $active?: boolean;
}
export const SidebarItem = styled.div<ItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  justify-content: center;
  color: #184561;
  background-color: ${({ $active }) =>
    $active ? "rgba(0, 0, 0, 0.1)" : "transparent"};
  height: 60px;
  width: 60px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
  transition: 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
