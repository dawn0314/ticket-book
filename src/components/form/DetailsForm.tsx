import { createTheme, ThemeProvider, Box, TextField } from "@mui/material";
import styled from "styled-components";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { sharedWrapper } from "../sharedStyles";
import { TicketInfoType } from "@type/ticket";
import dayjs, { Dayjs } from "dayjs";

interface DetailsFormProps {
  ticketInfo: TicketInfoType;
  setTicketInfo: React.Dispatch<React.SetStateAction<TicketInfoType>>;
}

export default function DetailsForm({
  ticketInfo,
  setTicketInfo,
}: DetailsFormProps) {
  const parseDateStringToDayjs = (dateString: string): Dayjs | null => {
    if (!dateString) return null;

    // "xxxx.x.x" 형태 문자열 parse to Dayjs
    const match = dateString.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/);

    if (match) {
      const [, year, month, day] = match;
      return dayjs(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    }
    return null;
  };

  const parseTimeStringToDayjs = (timeString: string): Dayjs | null => {
    if (!timeString) return null;

    // "xx:xx" 형태 문자열 parse to Dayjs
    const match = timeString.match(/(\d{1,2}):(\d{1,2})/);

    if (match) {
      const [, hours, minutes] = match;
      return dayjs().hour(parseInt(hours)).minute(parseInt(minutes));
    }
    return null;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const maxLength = name === "title" ? 30 : 12;

    if (value.length <= maxLength) {
      setTicketInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (value: Dayjs | null) => {
    if (value !== null) {
      const stringDate = `${value.year()}. ${
        value.month() + 1
      }. ${value.date()}`;
      setTicketInfo((prev) => ({
        ...prev,
        date: stringDate,
      }));
    }
  };

  const handleTimeChange = (value: Dayjs | null) => {
    if (value !== null) {
      const hours = String(value.hour()).padStart(2, "0");
      const minutes = String(value.minute()).padStart(2, "0");
      const stringTime = `${hours}:${minutes}`;
      setTicketInfo((prev) => ({
        ...prev,
        time: stringTime,
      }));
    }
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
                value={parseDateStringToDayjs(ticketInfo.date)}
                views={["year", "month", "day"]}
                onChange={handleDateChange}
              />
              <TimePicker
                label="START TIME"
                name="time"
                value={parseTimeStringToDayjs(ticketInfo.time)}
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

const Wrapper = styled.div`
  ${sharedWrapper};
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
