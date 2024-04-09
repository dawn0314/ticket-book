import React, { useEffect, useState } from "react";
import { List } from "@mui/material";
import styled from "styled-components";

export default function TrackList({
  accessToken,
  selectedAlbum,
  selectedArtist,
}) {
  const [result, setResult] = useState([]);

  const fetchAlbumData = async () => {
    var albumParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        selectedArtist +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      albumParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(selectedArtist);
        setAlbumsList(data.items);
      });
  };

  useEffect(() => {
    if (selectedAlbum) {
      fetchTrackData(selectedAlbum);
    }
  }, [selectedAlbum]);

  const fetchTrackData = async (selectedAlbum) => {
    try {
      const response = await fetch(
        `${baseURL}?method=album.getinfo&api_key=${APIKEY}&artist=${selectedArtist}&album=${selectedAlbum}&format=json`
      );
      const data = await response.json();
      console.log(selectedAlbum);
      console.log(selectedArtist);
      setResult(data.album);
      console.log("result: ", data.album);
    } catch (error) {
      console.log("TrackList Error: ", error);
    }
  };

  return (
    <TrackContainer>
      {/* {tracks.map((result, id) => {
        <List key={id}>{result.name}</List>;
      })} */}
    </TrackContainer>
  );
}

const TrackContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
