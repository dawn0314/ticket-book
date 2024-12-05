import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { sharedWrapper, sharedButton, sharedTitle } from "../../sharedStyles";
import { Drawer, Alert } from "@mui/material";
import MusicSearch from "./MusicSearch";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { TicketInfoType } from "../../../types/ticket";
import { TrackType } from "../../../types/music";
import Track from "./Track";

interface SetListProps {
  setTicketInfo: React.Dispatch<React.SetStateAction<TicketInfoType>>;
}

export default function SetlistForm({ setTicketInfo }: SetListProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTracks, setSelectedTracks] = useState<TrackType[]>([]);
  const [customTrackInput, setCustomTrackInput] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert(false);
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [alert]);

  useEffect(() => {
    setTicketInfo((prev) => ({
      ...prev,
      selectedTracks,
    }));
  }, [selectedTracks, setTicketInfo]);

  const toggleDrawer = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const addCustomTrack = (
    selectedTracks: TrackType[],
    customTrackInput: string
  ) => {
    if (selectedTracks.length === 24) {
      setAlert(true);
    } else {
      const newTrack = {
        id: uuidv4(),
        title: customTrackInput,
      };
      setSelectedTracks([...selectedTracks, newTrack]);
      setCustomTrackInput("");
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPosition = (id: string) =>
    selectedTracks.findIndex((track) => track.id === id);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id === over.id) return;

    setSelectedTracks((selectedTracks) => {
      const originalPosition = getTaskPosition(active.id);
      const newPosition = getTaskPosition(over.id);

      return arrayMove(selectedTracks, originalPosition, newPosition);
    });
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
                  if (
                    e.key == "Enter" &&
                    (e.target as HTMLInputElement).value
                  ) {
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SetListContainer>
            <SortableContext
              items={selectedTracks}
              strategy={verticalListSortingStrategy}
            >
              {selectedTracks.map((track) => {
                return (
                  <Track
                    key={track.id}
                    id={track.id}
                    title={track.title}
                    selectedTracks={selectedTracks}
                    setSelectedTracks={setSelectedTracks}
                  />
                );
              })}
            </SortableContext>
          </SetListContainer>
        </DndContext>
      </Wrapper>
    </ThemeProvider>
  );
}

const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          position: "absolute",
          zIndex: "1",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      },
    },
  },
});

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

const Title = styled.div`
  ${sharedTitle}
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
