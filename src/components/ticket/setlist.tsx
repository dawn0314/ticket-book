import styled from "styled-components";
import MusicSearch from "./music-search";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
`;
export default function Setlist() {
  return (
    <Wrapper>
      <MusicSearch />
    </Wrapper>
  );
}
