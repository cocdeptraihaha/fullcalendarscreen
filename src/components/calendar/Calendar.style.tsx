import styled from "styled-components";

export const CalendarContainer=styled.div`
margin: 50px 0 0 70px;
font-size:14px;
 --fc-button-bg-color: #fff;
 --fc-button-text-color: #184561;
--fc-button-hover-bg-color: #f5f5f5;
--fc-button-active-bg-color: #f5f5f5db;
--fc-button-active-border-color: #f5f5f5db;
--fc-today-bg-color: #d3eafa;
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
  }
  .fc-linkbutton-button
  {
  background-color: #ddd;
  background-image: url("src/assets/link-2.svg"); /* file svg trong public/icons */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 17px;
  width: 32px;
  height: 32px;
  border-radius: 50%;

  }
  .fc-settingbutton-button
  {
  background-color: #ddd;
  background-image: url("src/assets/settings.svg"); /* file svg trong public/icons */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 17px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  }
  .fc-calendarbutton-button
  {
  background-color: #ddd;
  background-image: url("src/assets/calendar.svg"); /* file svg trong public/icons */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 17px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  }
`
export const EventBox = styled.div<{ color?: string }>`
    
  background-color: ${({ color }) => color || "#f5f5f5"};
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding:5px;
  .event-header {
    display: flex;
    font-weight: bold;
  }
  `