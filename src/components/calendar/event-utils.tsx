import { EventInput } from '@fullcalendar/core'
let eventGuid = 0


function loadEventsFromLocalStorage(): EventInput[] {
  const data = localStorage.getItem("appointments_v1")
  if (!data) return []

  try {
    const appointments = JSON.parse(data)
    return appointments.map((appt: any) => ({
      id: appt.id ?? createEventId(),
      start: appt.start,
      end: appt.end,
      extendedProps: {
        title: appt.title,
        type:appt.type,
        contact: appt.contact,
        staff: appt.staff,
        service: appt.service,
        color: appt.color ?? "#184561",
      },
    }))
  } catch (err) {
    console.error("Lỗi parse localStorage:", err)
    return []
  }
}


export const INITIAL_EVENTS: EventInput[] = loadEventsFromLocalStorage()

export function createEventId() {
  return String(eventGuid++)
}
