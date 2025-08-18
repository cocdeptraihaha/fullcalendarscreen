import { useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from '../calendar/event-utils'
import { CalendarContainer, EventBox } from '../calendar/Calendar.style'
import { useSelector } from "react-redux";
import { RootState } from '../../store/store'
import Form from '../form/Form'

export default function Calendar() {
  const calendarRef = useRef<FullCalendar | null>(null);

  // Lấy view từ redux
  const view = useSelector((state: RootState) => state.calendar.view);

  // Khi view thay đổi → gọi API của FullCalendar
  useEffect(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      api.changeView(view);
    }
  }, [view]);

  function handleDateSelect(selectInfo: any) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  function handleEventClick(clickInfo: any) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
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
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
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
  const { title, type, contact, staff, service, color, } = eventInfo.event.extendedProps
  return (
    <EventBox color={color}>
      <div className="event-header">
        <span>
          <div>{title}</div>
          {type}
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
