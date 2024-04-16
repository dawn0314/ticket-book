import React, { useState, useRef, useEffect } from "react";
import { styled, css } from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MusicSearch from "./music-search";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { sharedWrapper, sharedButton, sharedTitle } from "../sharedStyles";
import { Drawer, Alert } from "@mui/material";

const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          position: "absolute",
          zIndex: "1",
        },
      },
    },
  },
});

const styledTrack = css`
  padding: 8px;
  border-radius: 20px;
  margin: 2px 2px;
  max-width: 230px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #eee;
  }

  &:hover .drag-icon,
  &:hover .remove-icon {
    display: block !important;
  }
`;
const Wrapper = styled.div`
  ${sharedWrapper}
  max-height: 600px;
  min-width: 500px;
`;

const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  position: relative;
  transition: all 1s;
  height: 50px;
  padding: 5px;
  border: 4px solid white;
  border-radius: 25px;
`;

const AddTextFieldContainer = styled.div`
  position: relative;
`;

const AddIcon = styled(AddRoundedIcon)`
  position: absolute;
  right: 0;
  top: 3px;
  cursor: pointer;
`;

const Input = styled.input`
  border-radius: 25px;
  height: 40px;
  width: 0;
  padding: 12px;
  transition: width 0.3s ease;
  overflow: hidden;
  border: none;
  outline: none;

  &:focus {
    width: 200px;
    background: #eee;
  }

  ${AddTextFieldContainer}:hover & {
    width: 200px;
    background: #eee;
  }
`;

const AddTrack = styled.button`
  width: 140px;
  padding: 10px;
  ${sharedButton}
`;

const SetListContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  max-height: 450px;
  flex-wrap: wrap;
  flex-basis: 50%;
`;

const Track = styled.div`
  ${styledTrack}
`;

const CustomTrack = styled.div`
  ${styledTrack}
  &:hover {
    background-color: #eee;
  }
`;

const DragIcon = styled(DragIndicatorIcon)`
  display: none !important;
  font-size: 12px;
  stroke: #eee;
  stroke-width: 1;
  margin-right: 2px;
  cursor: pointer;
`;

const RemoveIcon = styled(RemoveCircleIcon)`
  color: red;
  display: none !important;
  margin-left: auto;
  cursor: pointer;
`;

const Title = styled.div`
  ${sharedTitle}
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export default function Setlist({ ticketInfo, setTicketInfo }) {
  const [open, setOpen] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [customTrackInput, setCustomTrackInput] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert(false);
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [alert]);

  const toggleDrawer = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const addCustomTrack = (selectedTracks, customTrackInput) => {
    if (selectedTracks.length === 24) {
      setAlert(true);
    } else {
      setSelectedTracks([...selectedTracks, customTrackInput]);
      setCustomTrackInput("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Title>
          Setlist
          {alert && (
            <Alert severity="error">
              {`Your tracks must be less than 24. (Current selected tracks: ${selectedTracks.length})`}
            </Alert>
          )}
          <AddButtonContainer>
            <AddTextFieldContainer>
              <Input
                className="input-field"
                placeholder="TYPE HERE"
                value={customTrackInput}
                onChange={(e) => {
                  setCustomTrackInput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter" && e.target.value) {
                    addCustomTrack(selectedTracks, customTrackInput);
                  }
                }}
              />
              <AddIcon fontSize="large" />
            </AddTextFieldContainer>
            <AddTrack onClick={() => toggleDrawer(true)}>
              <LibraryMusicRoundedIcon />
              Add Track
            </AddTrack>
          </AddButtonContainer>
        </Title>
        <Drawer open={open} onClose={() => toggleDrawer(false)}>
          <MusicSearch
            selectedTracks={selectedTracks}
            setSelectedTracks={setSelectedTracks}
          />
        </Drawer>
        <SetListContainer>
          {selectedTracks.map((track, id) => {
            return (
              <Track key={id}>
                <DragIcon className="drag-icon" />
                {track}
                <RemoveIcon className="remove-icon" />
              </Track>
            );
          })}
        </SetListContainer>
      </Wrapper>
    </ThemeProvider>
  );
}
