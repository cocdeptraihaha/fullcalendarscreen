import { useState } from "react";
import { Popover, TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import dayjs, { Dayjs } from "dayjs";

export default function TimeRangePicker() {
  const [startAnchor, setStartAnchor] = useState<null | HTMLElement>(null);
  const [endAnchor, setEndAnchor] = useState<null | HTMLElement>(null);

  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs().add(1, "hour"));

  const handleStartOpen = (e: React.MouseEvent<HTMLElement>) =>
    setStartAnchor(e.currentTarget);
  const handleEndOpen = (e: React.MouseEvent<HTMLElement>) =>
    setEndAnchor(e.currentTarget);

  const handleStartClose = () => setStartAnchor(null);
  const handleEndClose = () => setEndAnchor(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display="flex"
        alignItems="center"
        border="1px solid #184561"
        borderRadius="4px"
        overflow="hidden"
        width="220px"
      >
        {/* Start Time Field */}
        <TextField
          size="small"
          value={startTime ? startTime.format("HH:mm") : ""}
          onClick={handleStartOpen}
          variant="standard"
          
        />
        {/* Gạch ngang giữa */}
        <Box
          width="1px"
          bgcolor="#184561"
          height="24px"
          mx={0} // không gian hai bên
        />
        {/* End Time Field */}
        <TextField
          size="small"
          value={endTime ? endTime.format("HH:mm") : ""}
          onClick={handleEndOpen}
          variant="standard"
        />
      </Box>

      {/* Popovers */}
      <Popover
        open={Boolean(startAnchor)}
        anchorEl={startAnchor}
        onClose={handleStartClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <DigitalClock
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue);
            handleStartClose();
          }}
          timeStep={5}
          shouldDisableTime={(value, view) => {
            if (view === "hours") return value.hour() < 8 || value.hour() > 20;
            return false;
          }}
          sx={{ "& .Mui-disabled": { display: "none" } }}
        />
      </Popover>

      <Popover
        open={Boolean(endAnchor)}
        anchorEl={endAnchor}
        onClose={handleEndClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <DigitalClock
          value={endTime}
          onChange={(newValue) => {
            setEndTime(newValue);
            handleEndClose();
          }}
          timeStep={5}
          shouldDisableTime={(value, view) => {
            if (view === "hours") return value.hour() < 8 || value.hour() > 20;
            return false;
          }}
          sx={{ "& .Mui-disabled": { display: "none" } }}
        />
      </Popover>
    </LocalizationProvider>
  );
}
