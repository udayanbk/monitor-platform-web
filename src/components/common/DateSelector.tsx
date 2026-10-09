import { useState } from "react";
import { Card, CardContent, IconButton, Popover, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface DateSelectorProps {
  selectedDate: Dayjs;
  onDateChange: (date: Dayjs) => void;
}

const DateSelector = ({ selectedDate, onDateChange }: DateSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      onDateChange(date);
      handleClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card
        onClick={handleOpen}
        sx={{
          height: "100%",
          cursor: "pointer",
          borderRadius: 2,
          boxShadow: 2,
          "&:hover": {
            boxShadow: 4,
          },
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
            py: 2,
            "&:last-child": {
              pb: 2,
            },
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Select Date
          </Typography>

          <IconButton
            onClick={handleOpen}
            sx={{
              display: "block",
              mx: "auto",
            }}
          >
            <CalendarMonthIcon
              sx={{
                fontSize: 55,
              }}
            />
          </IconButton>

          <Typography variant="h6" fontWeight={600} sx={{ mt: 0.5 }}>
            {selectedDate.format("DD MMM YYYY")}
          </Typography>
        </CardContent>
      </Card>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <DateCalendar value={selectedDate} onChange={handleDateChange} maxDate={dayjs()} />
      </Popover>
    </LocalizationProvider>
  );
};

export default DateSelector;
