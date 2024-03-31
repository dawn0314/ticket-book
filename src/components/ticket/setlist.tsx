import React, { useState } from "react";
import { styled, css } from "styled-components";
import MusicSearch from "./music-search";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import { sharedWrapper } from "./sharedStyles";
import { Drawer } from "@mui/material";
const Wrapper = styled.div`
  ${sharedWrapper}
`;

const AddTrack = styled.button`
  display: flex;
  align-items: center;
  font-size: 16px;
  border-radius: 20px;
  padding: 6px;
  font-weight: 600;
  color: #fff;
  background-color: var(--primary-dark);
  border: none;
`;
export default function Setlist() {
  const [open, setOpen] = useState(false);

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
        <MusicSearch />
      </Drawer>
    </Wrapper>
  );
}
