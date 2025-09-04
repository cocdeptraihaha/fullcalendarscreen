import { useState, useCallback } from "react";
import * as S from "./Header.styled";
import { menuItems } from "./HeaderConstants";

export default function Header() {
  const [active, setActive] = useState("Calendar");
  const handleClick = useCallback((item: string) => {
    setActive(item);
  }, []);
  return (
    <S.Container>
      <S.NavbarContainer>
        {menuItems.map((item) => (
          <S.NavItem
            key={item}
            $active={active === item}
            onClick={() => handleClick(item)}
          >
            {item}
            {item === "Inbox" && <S.Badge>0</S.Badge>}
          </S.NavItem>
        ))}
      </S.NavbarContainer>

      <S.RightContainer>
        <S.AddButton />
        <S.SearchBox>
          <S.SearchIcon className="fa fa-search" />
          <S.SearchInput type="text" placeholder="Search Contact" />
        </S.SearchBox>
        <S.AvatarContainer></S.AvatarContainer>
      </S.RightContainer>
    </S.Container>
  );
}
