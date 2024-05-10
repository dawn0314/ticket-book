import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { sharedWrapper, sharedTitle, sharedButton } from "../sharedStyles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate, Link } from "react-router-dom";
import { createTheme, ThemeProvider, Modal, Fade } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { TicketInfo } from "../../routes/create-ticket";

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
  const { id } = useParams();
  const [ticket, setTicket] = useState<TicketInfo>();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("false");

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (value: string) => {
    setImage(value);
    setOpen(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      const tickets = JSON.parse(storedTickets);
      const foundTicket = tickets.find((t) => t.id === parseInt(id));
      if (foundTicket) {
        setTicket(foundTicket);
      } else {
        console.log("Ticket not found");
      }
    } else {
      console.log("No tickets found in localStorage");
    }
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove the ticket?"
    );
    if (confirmDelete) {
      const storedTickets = localStorage.getItem("tickets");
      if (storedTickets) {
        let tickets = JSON.parse(storedTickets);
        const updatedTickets = tickets.filter((t) => t.id !== parseInt(id));
        localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      }
      navigate("/ticket-list");
    }
  };

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <ButtonContainer>
          <EditButton>Edit</EditButton>
          <DeleteButton onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon />
          </DeleteButton>
        </ButtonContainer>
        <PhotoWrapper>
          <Title>📷 Memory</Title>
          <ImageGrid>
            {ticket?.photo.map((item, index) => (
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
        <Review>{ticket?.review}</Review>
      </ReviewContainer>
      <FlexContainer>
        <InfoContainer>
          ✨ {ticket?.title}
          <br />
          📆 {ticket?.date} {ticket?.time}
          <br />
          📍 {ticket?.location} {ticket?.seat}
        </InfoContainer>
        <SetlistContainer>
          <Title>🎵 Setlist</Title>
          <TrackContainer>
            {ticket?.selectedTracks.map((track, i) => (
              <TrackTitle key={i}>{track.title}</TrackTitle>
            ))}
          </TrackContainer>
        </SetlistContainer>
      </FlexContainer>
      <NavLink to="/ticket-list">
        <ArrowBackIcon />
        Back to List
      </NavLink>
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
  margin-left: auto;
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

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
`;

const PhotoWrapper = styled.div`
  ${sharedWrapper}
  width: 800px;
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
  width: 800px;
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

const NavLink = styled(Link)`
  ${sharedButton}
  width: 160px;
  margin-left: auto;
  text-decoration: none;
  min-height: 40px;
`;
