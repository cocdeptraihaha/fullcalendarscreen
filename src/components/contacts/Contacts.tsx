import { AlignCenter, Plus, Search, User } from "react-feather";
import Sidebar from "../ui/sidebar";
import { AddButton, ContactsContainer } from "./Contacts.styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setView } from "../../store/contactsSlice";


function Contacts() {
    const sidebarItems = [
    { label: "Filters", value: 'filters',icon: <Search size={16} color="#184561"/> },
    { label: "Contacts", value: 'contacts',icon: <User size={16} color="#184561"/>  },
    { label: "Lists", value: 'lists',icon: <AlignCenter size={16} color="#184561"/>  },
  ];
  const active= useSelector((state: RootState)=> state.contacts.view)
  const dispatch=useDispatch()
  return (
    
    <ContactsContainer>
      <Sidebar
          items={sidebarItems}
          active={active}
          onChange={(value)=> dispatch(setView(value))}
          render={() => (
                          <>
                           <AddButton><Plus size={16} color="#fff"/></AddButton>
                          </>
                        )}
        />
    <h1>hihi</h1>
    </ContactsContainer>
  )
}

export default Contacts