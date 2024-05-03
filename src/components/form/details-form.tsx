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
import { sharedWrapper } from "../sharedStyles";

const Wrapper = styled.div`
  ${sharedWrapper}
  max-width: 550px;
  min-width: 230px;
  max-height: 210px;

  @media screen and (max-width: 1150px) {
    flex-direction: column;
    max-height: 330px;
  }
`;
const Container = styled.div`
  display: flex;
  max-width: 450px;

  @media screen and (max-width: 1150px) {
    flex-direction: column;
  }
`;

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            m: 1,
            borderRadius: "40px;",
            height: "40px;",
            marginBottom: "6px;",
            maxWidth: "340px;",
          },
          "& label.Mui-focused": {
            color: "#A0AAB4",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "var(--accent)",
            },
          },
          "& .MuiInputLabel-root:not(.Mui-focused)": {
            top: "-7px;",
          },
        },
      },
    },
  },
});

export default function DetailsForm({ ticketInfo, setTicketInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const maxLength = name === "title" ? 30 : 12;

    if (value.length <= maxLength) {
      setTicketInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const stringTime = `${hours}:${minutes}`;
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
          <Container>
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
          </Container>
          <Container>
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
          </Container>
        </ThemeProvider>
      </Box>
    </Wrapper>
  );
}
