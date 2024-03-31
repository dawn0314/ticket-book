import React, { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import styled from "styled-components";
import { sharedWrapper } from "./sharedStyles";
import { style } from "@mui/system";
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";

export default function MusicSearch() {
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [results, setResults] = useState([]);

  const APIKEY = "ac6a497623e80433882f15ec22bbe8c9";
  const baseURL = "https://ws.audioscrobbler.com/2.0/";

  const fetchArtistData = async (value) => {
    try {
      const response = await fetch(
        `${baseURL}?method=artist.search&artist=${value}&api_key=${APIKEY}&format=json`
      );
      const data = await response.json();
      const artists = data.results.artistmatches.artist;
      // handleArtistSelection(artists);
      setFilteredData(artists);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAlbumData = async (artist) => {};

  function handleArtistSelection(artist) {
    fetchAlbumData(artist); // 선택한 artist name으로 album 정보 가져와야함
  }

  // function handleAlbumSelection (album)  {

  // }

  const handleChange = (value) => {
    setInput(value);
  };

  async function search(input) {
    await fetchArtistData(input);
  }

  // async function selectArtist(input) {
  //   const albums = await fetchAlbums(artist);
  // }

  // async function selectAlbum(input) {
  //   const tracks = await fetchTracks(album);
  // }

  return (
    <Wrapper>
      <SearchContainer>
        <SearchBar
          placeholder="Search For An Artist"
          value={input}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              search(input);
            }
          }}
        />
        <IconButton id="search-icon" onClick={search}>
          <SearchRoundedIcon />
        </IconButton>
        <SearchBarList>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((result, id) => {
              return (
                <SearchItem
                  key={id}
                  onClick={() => handleArtistSelection(result.name)}
                >
                  {result.name}
                </SearchItem>
              );
            })
          ) : (
            <div>No results</div>
          )}
        </SearchBarList>
      </SearchContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  width: 300px;
  height: 20px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 25px;
  padding: 20px;
`;

const SearchBar = styled.input`
  height: 18px;
  outline: 0;
  border: none;
  font-size: 1rem;
  margin-left: 10px;
`;

const SearchBarList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;

  width: 300px;
  max-height: 150px;
  overflow-y: auto;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 5px 8px #e9e9e9;
  border-top: none;
`;

const SearchItem = styled.div`
  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: #e9e9e9;
  }
`;
