import * as S from './Sidebar.styled'
import { sidebarItems } from "./SidebarConstants";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../store/calendarSlice";
import { RootState } from '../../store/store';
import { Calendar } from 'react-feather';
import { useCallback } from 'react';

export default function Sidebar() {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.calendar.view)
  // When a view item is clicked, dispatch the new view to Redux.
  // The Calendar component listens to this and updates FullCalendar via ref.
  const handleClick = useCallback((value: string) => {
    dispatch(setView(value));
  }, [dispatch]);
  return (
    <S.SidebarContainer>
      <S.ContentContainer>
        {sidebarItems.map((item) => (
          <S.SidebarItem
            key={item.label}
            $active={active === item.value}
            onClick={() => handleClick(item.value)}
          >
            <Calendar size={16}/>
            {item.label}
          </S.SidebarItem>
        ))}

      </S.ContentContainer>
    </S.SidebarContainer>
  )
}


