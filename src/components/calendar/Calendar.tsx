import { useRef, useEffect } from 'react'
import { EventInput } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import { CalendarContainer, EventBox } from '../calendar/Calendar.style'
import { useSelector } from "react-redux";
import { RootState } from '../../store/store'
import Form from '../form/Form'
import { useAppointments } from '../../hooks/useAppointments';

export default function Calendar() {
  const { data: appointments, isLoading, error } = useAppointments();
  const calendarRef = useRef<FullCalendar | null>(null);
  // Lấy view từ redux
  const view = useSelector((state: RootState) => state.calendar.view);
  useEffect(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      api.changeView(view);
    }
  }, [view]);


// Transform data cho FullCalendar format
const events = appointments?.map((apt: { id: string; contact: string; service: string; start: string; end: string; color: string; type: string; staff: string; }) => ({
  id: apt.id,
  title: `${apt.type} - Appointment`,
  start: apt.start,
  end: apt.end,
  backgroundColor: apt.color,
  extendedProps: {
    contact:apt.contact,
    type: apt.type,
    staff: apt.staff,
    service: apt.service
  }
}));
  if (isLoading) return <div>Loading...</div>;
  
  if (error) return <div>Error loading appointments</div>;



const INITIAL_EVENTS: EventInput[] = events;


  function handleDateSelect(selectInfo: any) {
    
    // add new appointment
    
  }

  function handleEventClick(clickInfo: any) {
   //update event
  }


  return (
    <CalendarContainer>
      <FullCalendar
        ref={calendarRef}
        height="auto"
        expandRows={true}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        customButtons={{
          newappointment: {
            text: 'New Appointment',
            click: function () {
              Form();
            }
          }, linkbutton: {
            click: function () {
              alert('clicked the custom button!');
            }
          }, settingbutton: {
            click: function () {
              alert('clicked the custom button!');
            }
          }, calendarbutton: {
            click: function () {
              alert('clicked the custom button!');
            }
          }
        }

        }
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'linkbutton settingbutton calendarbutton newappointment',
        }}
        buttonText={{
          today: 'Today'
        }}
        buttonIcons={{
          prev: 'chevron-left',
          next: 'chevron-right',
        }}
        initialView='dayGridMonth'
        eventTimeFormat={
          {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: true
          }
        }
        dayMaxEventRows={3}
        editable={true}
        selectable={true}
        allDaySlot={false}
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}

      // called after events are initialized/added/changed/removed
      /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
      />
    </CalendarContainer>
  )
}

function renderEventContent(eventInfo: any) {
  const { contact, staff, service } = eventInfo.event.extendedProps
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
  )
}
