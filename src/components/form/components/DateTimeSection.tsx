import React from 'react'
import { DateTimeContainer, InputContainer, InputLabel } from './styled'
import CustomDatePicker from './CustomDatePicker'
import TimeRangePicker from './CustomTimePicker'

const DateTimeSection = () => {
  return (
    <DateTimeContainer>


            <InputContainer>
            <InputLabel>Date and Time</InputLabel>
            <CustomDatePicker/>
            </InputContainer>
            <InputContainer>
            <InputLabel> </InputLabel>
            <TimeRangePicker/>
            </InputContainer>
        </DateTimeContainer>
  )
}

export default DateTimeSection