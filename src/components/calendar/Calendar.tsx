// FullCalendar wrapper component: syncs view with Redux, renders events from API,
// and exposes hooks for date selection and event clicks.
import { useRef, useEffect, useMemo, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { CalendarContainer, EventBox } from "../calendar/Calendar.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { openForm, clearEventData } from "../../store/formSlice";
import { openSettings } from "../../store/settingsSlice";
import { useSettings, useAppointments } from "../../hooks/useData";
import { useSettingsFilter } from "../../hooks/useFilter";
import Form from "../form/Form";
import Settings from "../settings/Settings";
import { toast } from "react-toastify";
// Removed unused imports - data now comes from appointment API
import Sidebar from "../ui/sidebar";
import { setView } from "../../store/calendarSlice";
import { Calendar as IconCalendar }  from "react-feather";

interface Appointment {
  id: string;
  title: string;
  start: string | number;
  end: string | number;
  appointment_type?: {
    id: string;
    label: string;
    color: string;
  };
  contact?: {
    id: string;
    name: string;
    avatar: string;
  };
  staff?: {
    id: string;
    name: string;
    avatar: string;
  };
  services?: Array<{
    id: string;
    name: string;
  }>;
}


export default function Calendar() {
  const dispatch = useDispatch();
  const formOpen = useSelector((state: RootState) => state.form.open);
  const active = useSelector((state: RootState) => state.calendar.view);
  const { filterAppointments } = useSettingsFilter();
  const { data: appointments = [], isLoading: appointmentsLoading, error } = useAppointments();
  const { isLoading: settingsLoading } = useSettings();

  
  
  const sidebarItems = [
  { label: "Month", value: 'dayGridMonth',icon: <IconCalendar size={16} color="#184561"/> },
  { label: "Week", value: 'timeGridWeek',icon: <IconCalendar size={16} color="#184561"/>  },
  { label: "Day", value: 'timeGridDay',icon: <IconCalendar size={16} color="#184561"/>  },
  { label: "List", value: 'listWeek',icon: <IconCalendar size={16} color="#184561"/>  },
];

  useEffect(() => {
    if (!formOpen) {
      setTimeout(() => dispatch(clearEventData()), 100);
    }
  }, [formOpen, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load appointments");
    }
  }, [error]);

  const calendarRef = useRef<FullCalendar | null>(null); // Direct reference to FullCalendar instance
  // Get current view from Redux store (controlled by Sidebar)
  const view = useSelector((state: RootState) => state.calendar.view);
  useEffect(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi(); // Access FullCalendar's imperative API
      // Keep FullCalendar's visible view in sync with Redux state
      api.changeView(view); // Programmatically change calendar view
    }
  }, [view]);

  // Memoize events transformation to prevent unnecessary re-renders
  const events = useMemo(() => {
    const filteredAppointments = filterAppointments(appointments || []);

    return filteredAppointments.map((apt: Appointment) => ({
      id: apt.id,
      title: apt.title,
      start: apt.start,
      end: apt.end,
      backgroundColor: apt.appointment_type?.color || '#3498db',
      extendedProps: {
        appointment_type: apt.appointment_type,
        contact: apt.contact,
        staff: apt.staff,
        services: apt.services,
      },
    }));
  }, [appointments, filterAppointments]);

  // Memoize event handlers to prevent FullCalendar re-renders
  const handleDateSelect = useCallback((selectInfo: any) => {
    const selectedDate =
      selectInfo.start.getFullYear() +
      "-" +
      String(selectInfo.start.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(selectInfo.start.getDate()).padStart(2, "0");
    const now = new Date();
    const minutes = Math.round(now.getMinutes() / 5) * 5;
    const roundedTime = `${now.getHours().toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    dispatch(clearEventData());
    dispatch(
      openForm({
        start: `${selectedDate}T${roundedTime}:00`,
        end: `${selectedDate}T${(now.getHours() + (minutes + 30 >= 60 ? 1 : 0))
          .toString()
          .padStart(2, "0")}:${((minutes + 30) % 60)
          .toString()
          .padStart(2, "0")}:00`,
      })
    );
  }, []);

  const handleEventClick = useCallback(
    (clickInfo: any) => {
      const event = clickInfo.event;
      console.log(event)
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      const startStr = `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}-${String(startDate.getDate()).padStart(
        2,
        "0"
      )}T${String(startDate.getHours()).padStart(2, "0")}:${String(
        startDate.getMinutes()
      ).padStart(2, "0")}:00`;
      const endStr = `${endDate.getFullYear()}-${String(
        endDate.getMonth() + 1
      ).padStart(2, "0")}-${String(endDate.getDate()).padStart(
        2,
        "0"
      )}T${String(endDate.getHours()).padStart(2, "0")}:${String(
        endDate.getMinutes()
      ).padStart(2, "0")}:00`;
      dispatch(
        openForm({
          id: event.id,
          title: event.title,
          type_id: event.extendedProps.appointment_type?.id,
          contact_id: event.extendedProps.contact?.id,
          staff_id: event.extendedProps.staff?.id,
          service_ids: event.extendedProps.services?.map((s: any) => s.id) || [],
          start: startStr,
          end: endStr,
        })
      );
    },
    [appointments]
  );

  // Memoize custom buttons to prevent re-creation
  const customButtons = useMemo(
    () => ({
      newappointment: {
        text: "New Appointment",
        click: () => dispatch(openForm({})),
      },
      linkbutton: {
        click: () => toast.info("Link button clicked!"),
      },
      settingbutton: {
        click: () => dispatch(openSettings()),
      },
      calendarbutton: {
        click: () => toast.info("Calendar button clicked!"),
      },
    }),
    []
  );

  // Memoize plugins array
  const plugins = useMemo(
    () => [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    []
  );

  // Memoize event content renderer
  const renderEventContent = useCallback(
    (eventInfo: any) => {
      const { contact, staff, services } =
        eventInfo.event.extendedProps;

      return (
        <EventBox color={eventInfo.event.backgroundColor}>
          <div className="event-header">
            <span className="time">{eventInfo.timeText}</span>
            <span>
              <div>{eventInfo.event.title}</div>
            </span>
          </div>
          <div>{contact?.name || 'Unknown Contact'}</div>
          <div>{staff?.name || 'Unknown Staff'}</div>
          {services?.map((service: any, index: number) => (
            <div key={index}>{service.name}</div>
          ))}
        </EventBox>
      );
    },
    []
  );

  if (settingsLoading || appointmentsLoading) {
    return (
      <CalendarContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <div>Loading...</div>
        </div>
      </CalendarContainer>
    );
  }

  return (
    <CalendarContainer>
      <Sidebar
      items={sidebarItems}
      active={active}
      onChange={(value)=> dispatch(setView(value))}
      />
      <Form />
      <Settings />
      <FullCalendar
        ref={calendarRef}
        height="auto"
        timeZone="local"
        expandRows={true}
        plugins={plugins}
        customButtons={customButtons}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "linkbutton settingbutton calendarbutton newappointment",
        }}
        buttonText={{
          today: "Today",
        }}
        buttonIcons={{
          prev: "chevron-left",
          next: "chevron-right",
        }}
        initialView="dayGridMonth"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: true,
        }}
        dayMaxEventRows={3}
        editable={false}
        selectable={true}
        selectMirror={true}
        allDaySlot={false}
        events={events}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
    </CalendarContainer>
  );
}
