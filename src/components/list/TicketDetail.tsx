import { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { sharedWrapper, sharedTitle, sharedButton } from "../sharedStyles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { createTheme, ThemeProvider, Modal, Fade } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import useTickets from "../../hooks/useTickets";

// 사진 Modal style
const theme = createTheme({
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundcolor: "red",
          },
        },
      },
    },
  },
});

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error } = useTickets({ id });

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("false");

  const navigate = useNavigate();
  const ticketInfo = ticket?.ticketInfo;
  const photo = ticket?.photo || [];

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (value: string) => {
    setImage(value);
    setOpen(true);
  };

  const handleDelete = async () => {
    const user = auth.currentUser;

    const confirmDelete = window.confirm("티켓을 삭제하시겠습니까?");
    if (!confirmDelete || user?.uid !== ticket?.userId) return;
    try {
      await deleteDoc(doc(db, "users", user?.uid ?? "", "tickets", id!));
      if (photo) {
        const photoRefs = photo.map((photoUrl) => {
          const photoRef = ref(storage, photoUrl);
          return deleteObject(photoRef);
        });
        await Promise.all(photoRefs);
      }
    } catch (e) {
      console.log(e);
    }
    navigate("/ticket-list");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <ButtonContainer>
          <BackButton onClick={() => navigate(`/ticket-list`)}>
            <ArrowBackIcon />
            Back to List
          </BackButton>
          <RightButtons>
            <EditButton onClick={() => navigate(`/edit-ticket/${id}`)}>
              Edit
            </EditButton>
            <DeleteButton onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon />
            </DeleteButton>
          </RightButtons>
        </ButtonContainer>
        <PhotoWrapper>
          <Title>📷 Memory</Title>
          <ImageGrid>
            {photo.map((item, index) => (
              <ImageContainer key={index}>
                <ImagePreview src={item} onClick={() => handleImage(item)} />
              </ImageContainer>
            ))}
          </ImageGrid>
        </PhotoWrapper>
        <Modal open={open} onClose={handleClose} closeAfterTransition>
          <Fade in={open} timeout={500}>
            <img
              src={image}
              alt="asd"
              style={{
                maxHeight: "90%",
                maxWidth: "90%",
              }}
            />
          </Fade>
        </Modal>
      </ThemeProvider>
      <ReviewContainer>
        <Title>✏️ Review</Title>
        <Review>{ticketInfo?.review}</Review>
      </ReviewContainer>
      <FlexContainer>
        <InfoContainer>
          ✨ {ticketInfo?.title}
          <br />
          📆 {ticketInfo?.date} {ticketInfo?.time}
          <br />
          📍 {ticketInfo?.location} {ticketInfo?.seat}
        </InfoContainer>
        <SetlistContainer>
          <Title>🎵 Setlist</Title>
          <TrackContainer>
            {ticketInfo?.selectedTracks.map((track, i) => (
              <TrackTitle key={i}>{track.title}</TrackTitle>
            ))}
          </TrackContainer>
        </SetlistContainer>
      </FlexContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 100px;
  gap: 30px;
  margin: 0 30px;
  overflow: auto;
  background: var(--light);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const RightButtons = styled.div`
  display: flex;
  gap: 10px;
`;
const EditButton = styled.button`
  ${sharedButton}
  width: 100px;
  padding: 10px;
`;

const DeleteButton = styled.button`
  ${sharedButton}
  padding: 10px;
`;

const BackButton = styled.button`
  ${sharedButton}
  width: 160px;
  margin-left: 0;
  text-decoration: none;
  min-height: 40px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const PhotoWrapper = styled.div`
  ${sharedWrapper}
  max-width: 800px;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ImagePreview = styled.img`
  position: relative;
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 15px;

  &:hover {
    filter: brightness(0.9);
    cursor: pointer;
  }
`;

const InfoContainer = styled.div`
  ${sharedWrapper}
  min-width: 200px;
  line-height: 2rem;
`;

const SetlistContainer = styled.div`
  ${sharedWrapper}
  margin-top: 5px;
`;

const TrackContainer = styled.div`
  margin: 20px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  max-height: 450px;
  flex-wrap: wrap;
  flex-basis: 50%;
  line-height: normal;
  gap: 6px;

  @media screen and (max-width: 800px) {
    min-width: 0;
    max-height: 100%;
  }
`;

const TrackTitle = styled.div`
  border-radius: 20px;
  margin: 2px 2px;
  max-width: 230px;
  display: flex;
  align-items: center;
`;

const ReviewContainer = styled.div`
  ${sharedWrapper}
  max-width: 800px;
`;
const Review = styled.div`
  margin: 0 40px;
  line-height: normal;
`;

const Title = styled.div`
  ${sharedTitle}
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
