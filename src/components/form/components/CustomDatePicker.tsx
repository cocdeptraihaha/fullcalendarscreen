
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Popover, Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState,MouseEvent, } from "react";

export default function CustomDatePicker() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <TextField
         size="small"
          value={value ? value.format("MMMM DD, YYYY").toUpperCase() : ""}
          onClick={handleOpen}
          
   />

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          sx={{
    transform: "scale(0.8)", // thu nhỏ 80%
    transformOrigin: "bottom left",
  }}
        >
          <DateCalendar
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              handleClose();
            }}
            
          />
        </Popover>
      </Box>
    </LocalizationProvider>
  );
}
