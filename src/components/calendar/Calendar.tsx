// FullCalendar wrapper component: syncs view with Redux, renders events from API,
// and exposes hooks for date selection and event clicks.
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { CalendarContainer, EventBox } from "../calendar/Calendar.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchAppointments } from "../../services/api";
import { openForm, clearEventData } from "../../store/formSlice";
import Form from "../form/Form";

interface Appointment {
  id: string;
  title: string;
  contact: string;
  services: string[];
  start: string;
  end: string;
  color: string;
  type: string;
  staff: string;
}

export default function Calendar() {
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const formOpen = useSelector((state: RootState) => state.form.open);
  const getAppointments = useCallback(async () => {
    try {
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, []);
  useEffect(() => {
    getAppointments();
  }, []);

  const [wasFormOpen, setWasFormOpen] = useState(false);

  useEffect(() => {
    if (formOpen) {
      setWasFormOpen(true);
    } else if (wasFormOpen) {
      getAppointments();
      setTimeout(() => dispatch(clearEventData()), 100);
      setWasFormOpen(false);
    }
  }, [formOpen, wasFormOpen]);

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
  const events = useMemo(
    () =>
      appointments?.map((apt: Appointment) => ({
        id: apt.id,
        title: `${apt.type} Appointment`,
        start: apt.start,
        end: apt.end,
        backgroundColor: apt.color,
        extendedProps: {
          contact: apt.contact,
          type: apt.type,
          staff: apt.staff,
          service: apt.services,
        },
      })),
    [appointments]
  );

  // Memoize event handlers to prevent FullCalendar re-renders
  const handleDateSelect = useCallback((selectInfo: any) => {
    dispatch(clearEventData());
    dispatch(
      openForm({
        start: `${selectInfo.startStr}T09:00:00`,
        end: `${selectInfo.endStr}T09:30:00`,
      })
    );
  }, []);

  const handleEventClick = useCallback((clickInfo: any) => {
    const event = clickInfo.event;
    dispatch(
      openForm({
        id: event.id,
        title: event.title,
        type: event.extendedProps.type,
        contact: event.extendedProps.contact,
        staff: event.extendedProps.staff,
        services: event.extendedProps.service,
        start: event.startStr,
        end: event.endStr,
        color: event.backgroundColor,
      })
    );
  }, []);

  // Memoize custom buttons to prevent re-creation
  const customButtons = useMemo(
    () => ({
      newappointment: {
        text: "New Appointment",
        click: () => dispatch(openForm({})),
      },
      linkbutton: {
        click: () => alert("clicked the custom button!"),
      },
      settingbutton: {
        click: () => alert("clicked the custom button!"),
      },
      calendarbutton: {
        click: () => alert("clicked the custom button!"),
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
  const renderEventContent = useCallback((eventInfo: any) => {
    const { contact, staff, service } = eventInfo.event.extendedProps;
    return (
      <EventBox color={eventInfo.event.backgroundColor}>
        <div className="event-header">
          <span>
            <div>{eventInfo.event.title}</div>
          </span>
          <span className="time">{eventInfo.timeText}</span>
          <br></br>
        </div>
        <div>{contact}</div>
        <div>{staff}</div>
        {service.map((s: string, index: number) => (
          <div key={index}>{s}</div>
        ))}
      </EventBox>
    );
  }, []);

  return (
    <CalendarContainer>
      <Form />
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
