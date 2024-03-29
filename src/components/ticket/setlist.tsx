import { styled, css } from "styled-components";
import MusicSearch from "./music-search";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import { sharedWrapper } from "./sharedStyles";
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
  return (
    <Wrapper>
      <AddTrack>
        <LibraryMusicRoundedIcon />
        Add Track
      </AddTrack>
    </Wrapper>
  );
}
