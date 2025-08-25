import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: #184561;
  display: flex;
  top: 0;
  width: 100%;
  height: 45px;
  z-index: 1001;
`;
export const NavbarContainer = styled.div`
  position: absolute;
  width: 30%;
  height: 35px;
  margin: 2.5px 0 2.5px 10px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;
interface NavItemProps {
  active?: boolean;
}
export const NavItem = styled.div<NavItemProps>`
  position: relative;
  color: ${({ active }) => (active ? "#fff" : "#c6dce0")};
  background-color: ${({ active }) =>
    active ? "rgba(255,255,255,0.1)" : "transparent"};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const Badge = styled.span`
  background-color: #ccc;
  color: #333;
  border-radius: 50%;
  font-size: 10px;
  padding: 2px 6px;
  margin-left: 6px;
`;

export const RightContainer = styled.div`
  right: 10px;
  position: absolute;
  width: 300px;
  height: 35px;
  margin: 2.5px 0 2.5px 10px;
  justify-content: center;
  display: flex;
  align-items: center;
`;
export const AvatarContainer = styled.img`
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 2.5px 10px 2.5px;
  margin-left: auto;
  background-image: url("https://www.w3schools.com/howto/img_avatar.png");
  background-size: cover;
`;
export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #1d4f6d; /* nền xanh */
  width: 200px; /* tuỳ chỉnh */
  border-radius: 6px;
  margin: none;
  margin-left: auto;
  height: 27px;
  font-size: 12px;
`;
export const SearchIcon = styled.i`
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  margin: 0 5px 0 5px;
`;
export const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  font-size: 14px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;
export const AddButton = styled.div`
  background-color: #fff;
  background-image: url("public/plus.svg"); /* svg icon from local assets */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 17px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;
