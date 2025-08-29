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
import { useAppointments } from "../../hooks/useAppointments";
import {
  useGlobalStaff,
  useGlobalServices,
  useGlobalContacts,
  useAllAppointmentTypes,
} from "../../hooks/useGlobalData";
import { useSettings } from "../../hooks/useSettings";
import { useSettingsFilter } from "../../hooks/useSettingsFilter";
import Form from "../form/Form";
import Settings from "../settings/Settings";
import { toast } from "react-toastify";
import { getName, getNames, getColor } from "../../utils/dataHelpers";

interface Appointment {
  id: string;
  title: string;
  contact_id: string;
  service_ids: string[];
  start: string | number;
  end: string | number;
  color: string;
  type_id: string;
  staff_id: string;
}

export default function Calendar() {
  const dispatch = useDispatch();
  const formOpen = useSelector((state: RootState) => state.form.open);
  const { filterAppointments } = useSettingsFilter();
  const { data: appointments = [], isLoading, error } = useAppointments();
  const { data: staff = [] } = useGlobalStaff();
  const { data: services = [] } = useGlobalServices();
  const { data: contacts = [] } = useGlobalContacts();
  const { data: appointmentTypes = [] } = useAllAppointmentTypes();
  const { isLoading: settingsLoading } = useSettings();

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
      backgroundColor: getColor(apt.type_id, appointmentTypes),
      extendedProps: {
        contact_id: apt.contact_id,
        type_id: apt.type_id,
        staff_id: apt.staff_id,
        service_ids: apt.service_ids,
      },
    }));
  }, [appointments, appointmentTypes, filterAppointments]);

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
          type_id: event.extendedProps.type_id,
          contact_id: event.extendedProps.contact_id,
          staff_id: event.extendedProps.staff_id,
          service_ids: event.extendedProps.service_ids,
          start: startStr,
          end: endStr,
          color: event.backgroundColor,
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
      const { contact_id, staff_id, service_ids } =
        eventInfo.event.extendedProps;
      const serviceNames = getNames(service_ids || [], services);

      return (
        <EventBox color={eventInfo.event.backgroundColor}>
          <div className="event-header">
            <span className="time">{eventInfo.timeText}</span>
            <span>
              <div>{eventInfo.event.title}</div>
            </span>
          </div>
          <div>{getName(contact_id, contacts)}</div>
          <div>{getName(staff_id, staff)}</div>
          {serviceNames.map((s: string, index: number) => (
            <div key={index}>{s}</div>
          ))}
        </EventBox>
      );
    },
    [contacts, staff, services]
  );

  if (isLoading || settingsLoading) {
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
