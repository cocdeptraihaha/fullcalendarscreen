import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGlobalContacts } from "./useGlobalData";

export const useSettingsFilter = () => {
  const { visibleContacts } = useSelector((state: RootState) => state.settings);
  const { data: contacts = [] } = useGlobalContacts();

  const filterAppointments = (appointments: any[]) => {
    return appointments.filter((apt: any) => {
      // If all contacts selected, show all
      if (visibleContacts.length === contacts.length) return true;
      // If no contacts selected, show none
      if (visibleContacts.length === 0) return false;
      // Otherwise only show appointments for selected contacts
      return visibleContacts.includes(apt.contact_id);
    });
  };

  return { filterAppointments, visibleContacts };
};
