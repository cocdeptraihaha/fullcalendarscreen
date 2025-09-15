import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: #184561;
  display: flex;
  top: 0;
  width: 100%;
  min-width: 1200px;
  height: 45px;
  z-index: 1000;
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
  $active?: boolean;
}
export const NavItem = styled.div<NavItemProps>`
  position: relative;
  color: ${({ $active }) => ($active ? "#fff" : "#c6dce0")};
  background-color: ${({ $active }) =>
    $active ? "rgba(255,255,255,0.1)" : "transparent"};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
  font-size: 12px;
  align-items: center;
  text-decoration: none;
  gap: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const Badge = styled.span`
  background-color: rgb(255, 0, 0, 0.9);
  color: #fff;
  border-radius: 50%;
  font-size: 11px;
  height: 20px;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: relative;
  display: flex;
  align-items: center;
  background-color: #1d4f6d; /* nền xanh */
  width: 200px; /* tuỳ chỉnh */
  border-radius: 6px;
  margin: none;
  margin-left: auto;
  height: 27px;
  font-size: 12px;
  gap: 5px;
  padding-left: 5px;
`;
export const SearchIcon = styled.i`
  margin: 0 5px;
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
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
    transition: all 0.2s ease;
  }

  &:active {
    background-color: #e0e0e0;
  }
`;

export const SearchResults = styled.ul`
  position: absolute;
  top: 32px;
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  padding: 6px 0;
  margin: 6px 0 0 0;
  list-style: none;
  z-index: 1200;
  max-height: 240px;
  overflow-y: auto;
`;

export const SearchResultItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  cursor: pointer;
  color: #184561;
  font-size: 13px;

  &:hover {
    background: #f2f7fb;
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
