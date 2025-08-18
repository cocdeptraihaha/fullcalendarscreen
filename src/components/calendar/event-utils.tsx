import { EventInput } from '@fullcalendar/core'
let eventGuid = 0

const SAMPLE_APPOINTMENTS = [
  {"id":1,"title":"Virtual","type":"Appointment","contact":"NAYIRA VARGAS","staff":"Dr. Pat Pazmiño","service":"Tummy Tuck","start":"2025-08-15T14:00:00","end":"2025-08-15T14:30:00","color":"#3788d8"},
  {"id":2,"title":"In-Person","type":"Consultation","contact":"MARIA RODRIGUEZ","staff":"Dr. Sarah Johnson","service":"Breast Augmentation","start":"2025-08-18T09:00:00","end":"2025-08-18T10:00:00","color":"#f39c12"},
  {"id":3,"title":"Virtual","type":"Follow-up","contact":"JOHN SMITH","staff":"Dr. Michael Chen","service":"Rhinoplasty","start":"2025-08-20T11:30:00","end":"2025-08-20T12:00:00","color":"#e74c3c"},
  {"id":4,"title":"In-Person","type":"Appointment","contact":"ELENA GARCIA","staff":"Dr. Pat Pazmiño","service":"Liposuction","start":"2025-08-22T15:00:00","end":"2025-08-22T16:00:00","color":"#9b59b6"},
  {"id":5,"title":"Virtual","type":"Consultation","contact":"ROBERT WILLIAMS","staff":"Dr. Lisa Anderson","service":"Facelift","start":"2025-08-25T10:00:00","end":"2025-08-25T11:00:00","color":"#1abc9c"},
  {"id":6,"title":"In-Person","type":"Appointment","contact":"SOFIA MARTINEZ","staff":"Dr. Sarah Johnson","service":"Brazilian Butt Lift","start":"2025-08-28T13:30:00","end":"2025-08-28T14:30:00","color":"#f1c40f"},
  {"id":7,"title":"Virtual","type":"Follow-up","contact":"DAVID BROWN","staff":"Dr. Michael Chen","service":"Tummy Tuck","start":"2025-08-30T16:00:00","end":"2025-08-30T16:30:00","color":"#34495e"},
  {"id":8,"title":"In-Person","type":"Consultation","contact":"ISABELLA LOPEZ","staff":"Dr. Pat Pazmiño","service":"Mommy Makeover","start":"2025-08-12T08:30:00","end":"2025-08-12T09:30:00","color":"#e67e22"},
  {"id":9,"title":"Virtual","type":"Appointment","contact":"CARLOS HERNANDEZ","staff":"Dr. Lisa Anderson","service":"Gynecomastia Surgery","start":"2025-08-16T12:00:00","end":"2025-08-16T13:00:00","color":"#95a5a6"},
  {"id":10,"title":"In-Person","type":"Follow-up","contact":"AMANDA TAYLOR","staff":"Dr. Sarah Johnson","service":"Breast Reduction","start":"2025-08-24T14:30:00","end":"2025-08-24T15:00:00","color":"#2ecc71"}
]

// Tạo dữ liệu localStorage nếu chưa có
function ensureLocalStorage() {
  if (!localStorage.getItem("appointments_v1")) {
    localStorage.setItem("appointments_v1", JSON.stringify(SAMPLE_APPOINTMENTS))
  }
}

function loadEventsFromLocalStorage(): EventInput[] {
  ensureLocalStorage()
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
