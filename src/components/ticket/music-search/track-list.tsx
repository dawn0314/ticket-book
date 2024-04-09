import React, { useEffect, useState } from "react";
import { List, Checkbox, ListItemButton, ListItemText } from "@mui/material";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { sharedButton } from "../sharedStyles";

export default function TrackList({
  accessToken,
  selectedAlbum,
  onSaveSelectedTracks,
}) {
  const [tracklist, setTracklist] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (selectedAlbum) {
      fetchTrackData();
    }
  }, [selectedAlbum]);

  const fetchTrackData = async () => {
    const trackParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const tracks = await fetch(
      "https://api.spotify.com/v1/albums/" +
        selectedAlbum +
        "/tracks" +
        "?offset=0&limit=30&locale=ko",
      trackParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setTracklist(data.items);
      });
  };

  const handleToggle = (name: string, id: number) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleSave = () => {
    const trackName = checked.map((index) => {
      return tracklist[index].name;
    });
    onSaveSelectedTracks(trackName);
  };

  return (
    <ThemeProvider theme={theme}>
      <TrackContainer>
        <List>
          {tracklist.map((track, id) => (
            <Track>
              <ListItemButton onClick={handleToggle(track.name, id)}>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText key={track.id}>{track.name}</ListItemText>
              </ListItemButton>
            </Track>
          ))}
        </List>
      </TrackContainer>
      <Submit onClick={handleSave}>Submit</Submit>
    </ThemeProvider>
  );
}

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "var(--accent)",
          },
        },
      },
    },
  },
});

const TrackContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  position: relative;
`;

const Track = styled.div`
  display: flex;
  align-items: center;
`;

const Submit = styled.button`
  position: absolute;
  left: 410px;
  top: 20px;
  width: 80px;
  padding: 6px;
  font-weight: 600;
  border: none;
  ${sharedButton}
`;
