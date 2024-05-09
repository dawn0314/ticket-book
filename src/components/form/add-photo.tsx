import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { sharedWrapper, sharedTitle, sharedButton } from "../sharedStyles";
import { Alert } from "@mui/material";

export default function AddPhoto({ setTicketInfo }) {
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [alert, setAlert] = useState(false);

  const maxFileSize = 1024 * 1024;

  useEffect(() => {
    setTicketInfo((prev) => ({
      ...prev,
      photo: selectedImages,
    }));

    const timeId = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [selectedImages, setTicketInfo, alert]);

  const handlePhotoAdd = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => {
      if (file.size > maxFileSize) {
        setAlert(true);
        return;
      } else {
        const reader = new FileReader(); // base64
        reader.onload = () => {
          setSelectedImages((prevImages) => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleMainPhoto = (index: number) => {
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
        {alert && (
          <Alert severity="error">
            {`Please add file that is 1MB or less`}
          </Alert>
        )}
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
