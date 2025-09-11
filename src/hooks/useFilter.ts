import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useStaff } from "./useData";

export const useSettingsFilter = () => {
  const { visibleStaff } = useSelector((state: RootState) => state.settings);
  const { data: staff = [] } = useStaff();

  const filterAppointments = (appointments: any[]) => {
    return appointments.filter((apt: any) => {
      // If all staff selected, show all
      if (visibleStaff.length === staff.length) return true;
      // If no staff selected, show none
      if (visibleStaff.length === 0) return false;
      // Otherwise only show appointments for selected staff
      return visibleStaff.includes(apt.staff_id);
    });
  };

  return { filterAppointments, visibleStaff };
};
