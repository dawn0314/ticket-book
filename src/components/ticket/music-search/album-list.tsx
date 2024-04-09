import React, { useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";

export default function AlbumList({ albumsList, setSelectedAlbum }) {
  return albumsList.map((result) => {
    const albumImg = result.images[0].url;
    const albumId = result.id;
    console.log(albumsList);
    return albumImg ? (
      <Card
        sx={{ width: 150, margin: "8px" }}
        key={albumId}
        onClick={() => setSelectedAlbum(result.id)}
      >
        <CardActionArea>
          <CardMedia component="img" height="140" src={albumImg} />
          <CardContent>
            <div>{result.name}</div>
          </CardContent>
        </CardActionArea>
      </Card>
    ) : null;
  });
}
