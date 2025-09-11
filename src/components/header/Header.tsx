import { menuItems } from "./HeaderConstants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSection } from "../../store/headerSlice";
import { useCallback } from "react";
import { Plus, Search } from "react-feather";
import { Container, NavbarContainer, NavItem, Badge, RightContainer, AddButton, SearchBox, SearchInput, AvatarContainer } from "./Header.styled";
export default function Header() {
  const dispatch = useDispatch()
  const activeSection =useSelector((state: RootState) => state.header.section)
    const handleClick = useCallback(
      (item: string) => {
        dispatch(setSection(item));
      },
      [dispatch]
    );
  return (
    <Container>
      <NavbarContainer>
        {menuItems.map((item) => (
          <NavItem
            key={item}
            $active={activeSection === item}
            onClick={() => handleClick(item)}
          >
            {item}
            {item === "Inbox" && <Badge>0</Badge>}
          </NavItem>
        ))}
      </NavbarContainer>

      <RightContainer>
        <AddButton><Plus color="#184561" size={16}/></AddButton>
        <SearchBox>
          <Search color={"#ffffff4d"} size={14} />
          <SearchInput type="text" placeholder="Search Contact" />
        </SearchBox>
        <AvatarContainer></AvatarContainer>
      </RightContainer>
    </Container>
  );
}
