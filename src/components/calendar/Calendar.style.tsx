import styled from "styled-components";

export const CalendarContainer = styled.div`
margin: 50px 0 0 70px;
font-size:14px;
 /* FullCalendar theming via CSS variables. Adjust button colors,
    today highlight, and default event look-and-feel here. */
 --fc-button-bg-color: #fff;
 --fc-button-text-color: #184561;
--fc-button-hover-bg-color: #f5f5f5;
--fc-button-active-bg-color: #f5f5f5db;
--fc-button-active-border-color: #f5f5f5db;
--fc-today-bg-color: #d3eafa;
--fc-event-bg-color: none;
--fc-event-border-color:none;
.fc .fc-daygrid-day-number {
width: 30px;
  height: 30px;
  display: flex;
  justify-content: center; 
  align-items: center; 
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
font-size:12px;
}
 .fc-daygrid-event {
  display: block;
  color: #0f2a3cff;
  box-sizing: border-box; 
  padding:0;
  border-radius:0;
  border-left: 3px solid #3190cbff;
}
  .fc .fc-day-today{
  background-color:#fff;
  .fc-daygrid-day-number{
  color: rgba(255, 255, 255, 0.85) ;
  background-color:#184662ff;
  }
  }
  .time {
  position:absolute;
  right:5px;
  }
  .fc-newappointment-button
  {
  color: rgba(255, 255, 255, 0.85) ;
  background-color: #184662ff;
  border-radius:8px;
  margin-right:8px;
  width:150px;
  }
  .fc-linkbutton-button
  {
  background-color: #ddd;
  background-image: url("src/assets/link-2.svg"); /* svg icon from local assets */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 17px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 0px;
  }
  .fc-settingbutton-button
  {
  background-color: #ddd;
  background-image: url("src/assets/settings.svg"); /* svg icon from local assets */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 17px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 0px;
  }
  .fc-calendarbutton-button
  {
  background-color: #ddd;
  background-image: url("src/assets/calendar.svg"); /* svg icon from local assets */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 17px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
   border: 0px;
  }
`
export const EventBox = styled.div<{ color?: string }>`
    
  background-color: ${({ color }) => color || "#f5f5f5"};
    white-space: normal;  
  word-wrap: break-word; 
  overflow-wrap: break-word; 
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding:5px;
  span {
  word-wrap: break-word;  
  white-space: normal; 
  };
  .event-header {
    display: flex;
    font-weight: bold;
    width:70%;
  };
  `