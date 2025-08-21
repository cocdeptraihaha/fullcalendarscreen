// FullCalendar wrapper component: syncs view with Redux, renders events from API,
// and exposes hooks for date selection and event clicks.
import { useRef, useEffect, useState } from "react";
import { EventInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { CalendarContainer, EventBox } from "../calendar/Calendar.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchAppointments } from "../../services/api";
import { openForm } from "../../store/formSlice";

interface Appointment {
  id: string;
  contact: string;
  service: string;
  start: string;
  end: string;
  color: string;
  type: string;
  staff: string;
}

export default function Calendar() {
  const open = useSelector((state: RootState) => state.form.open);
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Add useEffect hook to fetch appointments when component mounts
  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    getAppointments();
  }, []);

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

  // Transform server appointments into FullCalendar EventInput format
  // FullCalendar expects specific properties, so we map our data structure
  const events = appointments?.map(
    (apt: {
      id: string;
      contact: string;
      service: string;
      start: string;
      end: string;
      color: string;
      type: string;
      staff: string;
    }) => ({
      id: apt.id,
      title: `${apt.type} Appointment`, // Display title on calendar
      start: apt.start, // ISO date string for start time
      end: apt.end, // ISO date string for end time
      backgroundColor: apt.color, // Visual color coding
      extendedProps: { // Custom data accessible in event handlers
        contact: apt.contact,
        type: apt.type,
        staff: apt.staff,
        service: apt.service,
      },
    })
  );

  const INITIAL_EVENTS: EventInput[] = events;

  function handleDateSelect() {
    dispatch(openForm({}));
  }

  function handleEventClick(clickInfo: any) {
    const event = clickInfo.event;

    // Extract event data and open form for editing
    // This populates the form with existing appointment data
    dispatch(
      openForm({
        title: event.title,
        type: event.extendedProps.type, // Custom data from extendedProps
        contact: event.extendedProps.contact,
        staff: event.extendedProps.staff,
        service: event.extendedProps.service,
        start: event.startStr, // ISO string format
        end: event.endStr,
        color: event.backgroundColor,
      })
    );
  }
  console.log(INITIAL_EVENTS);

  return (
    <CalendarContainer>
      <FullCalendar
        key={appointments.length} // Force re-render when appointments change
        ref={calendarRef} // Reference for imperative API access
        height="auto"
        expandRows={true}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]} // FullCalendar core plugins
        customButtons={{
          newappointment: {
            text: "New Appointment",
            click: function () {
              dispatch(openForm({}));
            },
          },
          linkbutton: {
            click: function () {
              alert("clicked the custom button!");
            },
          },
          settingbutton: {
            click: function () {
              alert("clicked the custom button!");
            },
          },
          calendarbutton: {
            click: function () {
              alert("clicked the custom button!");
            },
          },
        }}
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
        editable={true}
        selectable={true}
        allDaySlot={false}
        initialEvents={INITIAL_EVENTS} // Seed initial events; alternatively use the `events` prop for dynamic fetching
        select={handleDateSelect}
        eventContent={renderEventContent} // Custom renderer: show contact, staff, service
        eventClick={handleEventClick}

        // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
      />
    </CalendarContainer>
  );
}

function renderEventContent(eventInfo: any) {
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
      <div>{service}</div>
    </EventBox>
  );
}
