import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Button from "@mui/material/Button";
import { sharedWrapper, sharedTitle, sharedButton } from "./sharedStyles";

export default function AddPhoto({ setTicketInfo }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handlePhotoAdd = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);

    setTicketInfo((prev) => ({
      ...prev,
      photo: selectedImages,
    }));
  };

  return (
    <Wrapper>
      <Title>
        Photo{" "}
        <PhotoUpload htmlFor="photo">
          <AddPhotoAlternateIcon />
          ADD PHOTO
        </PhotoUpload>
        <PhotoInput
          onChange={handlePhotoAdd}
          id="photo"
          type="file"
          accept="image/*"
          multiple
        />
      </Title>
      <PreviewContainer>
        {selectedImages.map((image, index) => (
          <ImagePreview key={index} src={image} alt={`Preview ${index}`} />
        ))}
      </PreviewContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${sharedWrapper}
`;

const Title = styled.div`
  ${sharedTitle}
  display: flex;
  justify-content: space-between;
`;

const PhotoUpload = styled.label`
  display: flex;
  align-items: center;
  width: 140px;
  padding: 10px;
  cursor: pointer;
  ${sharedButton}
`;
const PhotoInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  scrollbar-width: thin;
  min-height: 30vh;
`;
const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin: 5px;
  border-radius: 15px;
`;
