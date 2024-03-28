import { Box, TextField } from "@mui/material";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
`;
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": { m: 1, borderRadius: "40px;" },
          "& label.Mui-focused": {
            color: "#A0AAB4",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "var(--accent)",
            },
          },
        },
      },
    },
  },
});

export default function Details({ ticketInfo, setTicketInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTicketInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (value) => {
    const date = new Date(value);
    const stringDate = `${date.getFullYear()} ${
      date.getMonth() + 1
    } ${date.getDate()}`;
    setTicketInfo((prev) => ({
      ...prev,
      date: stringDate,
    }));
  };

  const handleTimeChange = (value) => {
    const time = new Date(value);
    const stringTime = `${time.getHours()}:${time.getMinutes()}`;
    setTicketInfo((prev) => ({
      ...prev,
      time: stringTime,
    }));
  };

  return (
    <Wrapper>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        paddingRight="8px"
      >
        <ThemeProvider theme={theme}>
          <TextField
            fullWidth
            label="TITLE"
            name="title"
            value={ticketInfo.title}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="DATE"
              name="date"
              views={["year", "month", "day"]}
              onChange={handleDateChange}
            />
            <TimePicker
              label="START TIME"
              name="time"
              onChange={handleTimeChange}
            />
          </LocalizationProvider>
          <TextField
            label="LOCATOIN"
            name="location"
            value={ticketInfo.location}
            onChange={handleChange}
          />
          <TextField
            label="SEAT"
            name="seat"
            value={ticketInfo.seat}
            onChange={handleChange}
          />
        </ThemeProvider>
      </Box>
    </Wrapper>
  );
}
