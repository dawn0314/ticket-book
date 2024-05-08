import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { sharedWrapper, sharedTitle, sharedButton } from "../sharedStyles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      const tickets = JSON.parse(storedTickets);
      const foundTicket = tickets.find((t) => t.id === parseInt(id));
      if (foundTicket) {
        setTicket(foundTicket);
        console.log(ticket);
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
      <ButtonContainer>
        <EditButton>Edit</EditButton>
        <DeleteButton onClick={handleDelete}>
          <DeleteOutlineOutlinedIcon />
        </DeleteButton>
      </ButtonContainer>
      <PhotoWrapper>
        <Title>📷 Memory</Title>
        {/* {ticket?.photo.map((item, index) => (
          <ImageContainer>
            <ImagePreview src={item} key={index} />
          </ImageContainer>
        ))} */}
        {ticket?.photo && (
          <ImageGrid>
            {ticket.photo.map((item, index) => (
              <ImageContainer key={index}>
                <ImagePreview src={item} />
              </ImageContainer>
            ))}
          </ImageGrid>
        )}
      </PhotoWrapper>
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
            {ticket?.selectedTracks.map((track) => (
              <TrackTitle>{track.title}</TrackTitle>
            ))}
          </TrackContainer>
        </SetlistContainer>
      </FlexContainer>
      <ReviewContainer>
        <Title>✏️ Review</Title>
        <Review>{ticket?.review}</Review>
      </ReviewContainer>
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
  /* flex-direction: row; */
  align-items: flex-start;
  gap: 30px;
`;

const PhotoWrapper = styled.div`
  ${sharedWrapper}
  width: 800px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  margin: 5px;
`;

const ImagePreview = styled.img`
  position: relative;
  /* width: 240px; */
  /* height: 240px; */
  height: auto;
  width: 100%;
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
`;
