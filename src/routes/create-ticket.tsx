import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
export default function CreateTicket() {
  const [selectedImages, setSelectedImages] = useState([]);
  const handlePhotoAdd = (e) => {
    const files = Array.from(e.target.files);

    const imagesArray = files.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
  };
  return (
    <Wrapper>
      <PreviewContainer>
        {selectedImages.map((image, index) => (
          <ImagePreview key={index} src={image} alt={`Preview ${index}`} />
        ))}
      </PreviewContainer>
      <PhotoUpload htmlFor="photo">
        <AddPhotoAlternateIcon style={iconStyle} />
      </PhotoUpload>
      <PhotoInput
        onChange={handlePhotoAdd}
        id="photo"
        type="file"
        accept="image/*"
        multiple
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PhotoUpload = styled.label`
  color: white;
  cursor: pointer;
`;
const PhotoInput = styled.input`
  display: none;
`;
const iconStyle = {
  "font-size": "40px",
};

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ImagePreview = styled.img`
width: 100px;
height: 100%;
 margin 5px;`;
