import React, { useState } from "react";
import { styled, css } from "styled-components";
import MusicSearch from "./music-search";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import { sharedWrapper, sharedButton } from "../sharedStyles";
import { Drawer } from "@mui/material";
const Wrapper = styled.div`
  ${sharedWrapper}
`;

const AddTrack = styled.button`
  width: 140px;
  padding: 10px;
  ${sharedButton}
`;

const SetListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Setlist() {
  const [open, setOpen] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState([]);

  const toggleDrawer = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  return (
    <Wrapper>
      <AddTrack onClick={() => toggleDrawer(true)}>
        <LibraryMusicRoundedIcon />
        Add Track
      </AddTrack>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <MusicSearch setSelectedTracks={setSelectedTracks} />
      </Drawer>
      <SetListContainer>
        {selectedTracks.map((track, id) => {
          return <div key={id}>{track}</div>;
        })}
      </SetListContainer>
    </Wrapper>
  );
}
