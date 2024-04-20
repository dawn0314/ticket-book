import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Button from "@mui/material/Button";
import { sharedWrapper, sharedTitle, sharedButton } from "./sharedStyles";
import Checkbox from "@mui/material/Checkbox";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

export default function AddPhoto({ setTicketInfo }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [mainImgIndex, setMainImgIndex] = useState(0);

  useEffect(() => {
    setTicketInfo((prev) => ({
      ...prev,
      photo: selectedImages,
    }));
  }, [selectedImages, setTicketInfo]);

  const handlePhotoAdd = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
  };

  const handleMainPhoto = (index) => {
    setMainImgIndex(index);
    setTicketInfo((prev) => ({
      ...prev,
      mainPhoto: index,
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
          <ImageContainer>
            {mainImgIndex === index ? <MainImgText>Main</MainImgText> : null}
            <ImagePreview
              key={index}
              src={image}
              alt={`Preview ${index}`}
              onClick={() => handleMainPhoto(index)}
              mainImage={mainImgIndex === index}
            />
          </ImageContainer>
        ))}
      </PreviewContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${sharedWrapper}
  max-height: 380px;
  min-width: 500px;
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
  margin: 12px 0;
`;

const ImageContainer = styled.div`
  position: relative;

  margin: 5px;
`;
const ImagePreview = styled.img`
  position: relative;
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 15px;
  ${(props) => props.mainImage && `border: 4px solid #F4D03F;`}
`;

const MainImgText = styled.div`
  position: absolute;
  z-index: 1;
  padding: 4px;
  border-bottom-right-radius: 6px;
  background-color: #f4d03f;
`;
