import * as S from "./Header.styled";
import { menuItems } from "./HeaderConstants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSection } from "../../store/headerSlice";
import { useCallback } from "react";
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
    <S.Container>
      <S.NavbarContainer>
        {menuItems.map((item) => (
          <S.NavItem
            key={item}
            $active={activeSection === item}
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
