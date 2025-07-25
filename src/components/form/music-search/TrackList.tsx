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
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (selectedAlbum) {
      fetchTrackData();
    }

    const timeId = setTimeout(() => {
      setAlert(null);
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
      setAlert({
        type: "error",
        message: `트랙은 24개 미만이어야 합니다다. (현재 선택: ${selectedTracks.length})`,
      });
    } else {
      onSaveSelectedTracks(updatedSelectedTracks);
      setAlert({
        type: "success",
        message: `트랙이 추가되었습니다.`,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <TrackContainer>
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
      </TrackContainer>
      {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
      <SubmitContainer>
        <Submit onClick={handleSave}>ADD</Submit>
      </SubmitContainer>
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

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

const Submit = styled.button`
  width: 80px;
  padding: 6px;
  font-weight: 600;
  border: none;
  ${sharedButton}
`;
