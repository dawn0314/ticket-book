import React, { useEffect, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import type { TrackType } from "../../../types/music";
import TrackList from "./TrackList";
import AlbumList from "./AlbumList";

interface MusicSearchProps {
  selectedTracks: TrackType[];
  setSelectedTracks: React.Dispatch<React.SetStateAction<TrackType[]>>;
}

export default function MusicSearch({
  selectedTracks,
  setSelectedTracks,
}: MusicSearchProps) {
  const [input, setInput] = useState<string>("");
  const [artistsList, setArtistsList] = useState<any[]>([]);
  const [albumsList, setAlbumsList] = useState<any[]>([]);
  const [toggle, setToggle] = useState<boolean>(true);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

  const [accessToken, setAccessToken] = useState("");
  const CLIENT_ID = "071a110f049348b18c3d479f01d4f38a";
  const CLIENT_SECRET = "8dbe3211decd4b75ac94ec0148643ccd";

  useEffect(() => {
    if (selectedArtist) fetchAlbumData();
    // API Access Token
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, [selectedArtist]);

  async function search(input: string) {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    /* fetch artist name */
    await fetch(
      "https://api.spotify.com/v1/search?q=" + input + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setArtistsList(data.artists.items);
      });
  }

  const fetchAlbumData = async () => {
    const albumParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    /* fetch album list */
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        selectedArtist +
        "/albums" +
        "?include_groups=album,single&market=US&limit=50",
      albumParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbumsList(data.items);
      });
  };

  function renderAlbumData(albumsList: any[]) {
    return selectedAlbum && selectedAlbum.length > 0 ? (
      <TrackList
        accessToken={accessToken}
        selectedAlbum={selectedAlbum}
        selectedTracks={selectedTracks}
        onSaveSelectedTracks={setSelectedTracks}
      />
    ) : (
      <AlbumList setSelectedAlbum={setSelectedAlbum} albumsList={albumsList} />
    );
  }

  async function handleArtistSelection(artist: string) {
    await setSelectedArtist(artist);
    setSelectedAlbum(null);
    setToggle(false);
  }

  const handleChange = (value: string) => {
    setInput(value);
    setToggle(true);
  };

  const toggleSuggestionList = () => {
    setToggle(!toggle);
  };

  return (
    <Wrapper>
      <SearchContainer>
        <SearchBar
          placeholder="아티스트 검색"
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
        <IconButton id="search-icon" onClick={() => search(input)}>
          <SearchRoundedIcon />
        </IconButton>
        {toggle ? (
          artistsList && artistsList.length > 0 ? (
            <SearchBarList>
              {artistsList.map((artist, id) => {
                return (
                  <SearchItem
                    key={id}
                    onClick={() => {
                      handleArtistSelection(artist.id);
                      toggleSuggestionList();
                    }}
                  >
                    {artist.name}
                  </SearchItem>
                );
              })}
            </SearchBarList>
          ) : (
            <SearchBarList>
              <div>No Result</div>
            </SearchBarList>
          )
        ) : null}
      </SearchContainer>
      <ResultContainer>{renderAlbumData(albumsList)}</ResultContainer>
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
  border: 1px solid #ddd;
  border-top: none;
  z-index: 1;
  background-color: white;
`;

const SearchItem = styled.div`
  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-y: auto;
`;
