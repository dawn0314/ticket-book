import { useEffect, useState } from "react";
import {
  List,
  Checkbox,
  ListItemButton,
  ListItemText,
  Alert,
} from "@mui/material";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { sharedButton } from "../../sharedStyles";
import { TrackDataType } from "@type/music";

export default function TrackList({
  accessToken,
  selectedAlbum,
  selectedTracks,
  onSaveSelectedTracks,
}) {
  const [tracklist, setTracklist] = useState<TrackDataType[]>([]);
  const [checked, setChecked] = useState<number[]>([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (selectedAlbum) {
      fetchTrackData();
    }

    const timeId = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [selectedAlbum, alert]);

  const fetchTrackData = async () => {
    const trackParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    /* fetch tracks */
    await fetch(
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

  const handleToggle = (id: number) => () => {
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
      return {
        id: tracklist[index].id,
        title: tracklist[index].name,
      };
    });

    const updatedSelectedTracks = [...selectedTracks, ...trackName];
    if (updatedSelectedTracks.length > 24) {
      setAlert(true);
    } else {
      onSaveSelectedTracks(updatedSelectedTracks);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <TrackContainer>
        <List>
          {tracklist.map((track, id) => (
            <Track key={track.id}>
              <ListItemButton onClick={handleToggle(id)}>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText>{track.name}</ListItemText>
              </ListItemButton>
            </Track>
          ))}
        </List>
      </TrackContainer>
      {alert && (
        <Alert severity="error">
          {`Your tracks must be less than 24. (Current selected tracks: ${selectedTracks.length})`}
        </Alert>
      )}
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

    MuiAlert: {
      styleOverrides: {
        root: {
          position: "absolute",
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
