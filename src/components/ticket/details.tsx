import { Box, TextField } from "@mui/material";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
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

export default function Details({ ticketInfo }) {
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
          <TextField fullWidth label="TITLE" value={ticketInfo.title} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="DATE/TIME"
              views={["year", "month", "day", "hours", "minutes"]}
              value={ticketInfo.dateAndTime}
            />
          </LocalizationProvider>
          <TextField label="LOCATOIN" value={ticketInfo.location} />
          <TextField label="SEAT" value={ticketInfo.seat} />
        </ThemeProvider>
      </Box>
    </Wrapper>
  );
}
