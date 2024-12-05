import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { sharedWrapper, sharedTitle, sharedButton } from "../sharedStyles";
import { Alert } from "@mui/material";
import { TicketInfoType } from "../../types/ticket";

interface AddPhotoProps {
  setTicketInfo: React.Dispatch<React.SetStateAction<TicketInfoType>>;
  setFiles: (files: File[]) => void;
}

export default function AddPhoto({ setTicketInfo, setFiles }: AddPhotoProps) {
  const [files, setLocalFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [alert, setAlert] = useState(false);

  const maxFileSize = 4 * 1024 * 1024;

  useEffect(() => {
    setFiles(files);

    const timeId = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [files, setFiles, alert]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const validFiles = Array.from(selectedFiles).filter(
        (file) => file.size <= maxFileSize
      );
      const invalidFiles = Array.from(selectedFiles).filter(
        (file) => file.size > maxFileSize
      );

      if (invalidFiles.length > 0) {
        setAlert(true);
      }

      setLocalFiles((prevFiles) => [...prevFiles, ...validFiles]);

      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleMainPhoto = (index: number) => {
    setMainImgIndex(index);
    setTicketInfo((prev) => ({
      ...prev,
      mainPhoto: index,
    }));
  };

  const handleDeletePhoto = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);

    setLocalFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);

    if (mainImgIndex === index && updatedFiles.length > 0) {
      setMainImgIndex(0);
      setTicketInfo((prev) => ({
        ...prev,
        mainPhoto: 0,
      }));
    } else if (mainImgIndex === index) {
      setMainImgIndex(-1);
      setTicketInfo((prev) => ({
        ...prev,
        mainPhoto: -1,
      }));
    }
  };

  return (
    <Wrapper>
      <Title>
        Photo{" "}
        {alert && (
          <Alert severity="error">{`4MB이하의 이미지를 첨부해주세요.`}</Alert>
        )}
        <PhotoUpload htmlFor="photo">
          <AddPhotoAlternateIcon />
          ADD PHOTO
        </PhotoUpload>
        <PhotoInput
          onChange={onFileChange}
          id="photo"
          type="file"
          accept="image/*"
          multiple
        />
      </Title>
      <PreviewContainer>
        {previewUrls.map((url, index) => (
          <ImageContainer>
            {mainImgIndex === index ? <MainImgText>Main</MainImgText> : null}
            <ImagePreview
              key={index}
              src={url}
              alt={`Preview ${index}`}
              onClick={() => handleMainPhoto(index)}
              $mainImage={mainImgIndex === index}
            />
            <DeleteButton onClick={() => handleDeletePhoto(index)} />
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
  &:hover > svg {
    display: block !important;
  }
`;
const ImagePreview = styled.img<{ $mainImage: boolean }>`
  position: relative;
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 15px;
  ${(props) => props.$mainImage && `border: 4px solid #F4D03F;`}
`;

const MainImgText = styled.div`
  position: absolute;
  z-index: 1;
  padding: 4px;
  border-bottom-right-radius: 6px;
  background-color: #f4d03f;
`;

const DeleteButton = styled(DeleteForeverIcon)`
  display: none !important;
  box-sizing: content-box;
  padding: 8px;
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
  border-radius: 50%;
  z-index: 1;

  &:hover {
    cursor: pointer;
    background-color: var(--light);
  }
`;
