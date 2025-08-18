import * as S from './Sidebar.styled'
import { sidebarItems} from "./SidebarConstants";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../store/calendarSlice";
import { RootState } from '../../store/store';


export default function Sidebar() {
    const dispatch = useDispatch();
    const active = useSelector((state: RootState) => state.calendar.view)


  return (
    <S.SidebarContainer>
        <S.ContentContainer>
        {sidebarItems.map((item) => (
          <S.SidebarItem
            key={item.label}
            $active={active === item.value}
            onClick={() => dispatch(setView(item.value))}
          >
            <S.CalendarIcon/>
            {item.label}
          </S.SidebarItem>
        ))}

        </S.ContentContainer>
    </S.SidebarContainer>
  )
}


