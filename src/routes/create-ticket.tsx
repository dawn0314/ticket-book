import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SetlistForm from "../components/form/music-search/setlist-form.tsx";
import AddPhoto from "../components/form/add-photo";
import DetailsForm from "../components/form/details-form.tsx";
import ReviewForm from "../components/form/review-form";
import { sharedButton } from "../components/sharedStyles.ts";
import UserButton from "../components/user/user-button.tsx";

export interface TicketInfo {
  id: number;
  mainPhoto: number;
  photo: string[];
  title: string;
  date: string;
  time: string;
  location: string;
  seat: string;
  selectedTracks: string[];
  review: string;
}

export default function CreateTicket() {
  const [tickets, setTickets] = useState<TicketInfo[]>([]);
  const [ticketInfo, setTicketInfo] = useState<TicketInfo>({
    id: 0,
    mainPhoto: 0,
    photo: [],
    title: "",
    date: "",
    time: "",
    location: "",
    seat: "",
    selectedTracks: [],
    review: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets) as TicketInfo[]);
    }
  }, []);

  const saveTicket = () => {
    const confirm = window.confirm("Are you sure you want to save the ticket?");

    if (confirm) {
      const newTicket = { ...ticketInfo, id: tickets.length + 1 };
      const updatedTickets = [...tickets, newTicket];

      setTickets(updatedTickets);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      navigate("/ticket-list");
    }
  };

  return (
    <Wrapper>
      <FlexContainer>
        <AddPhoto setTicketInfo={setTicketInfo} />
        <ReviewForm setTicketInfo={setTicketInfo} />
      </FlexContainer>
      <FlexContainer>
        <DetailsForm ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
        <SetlistForm ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
      </FlexContainer>
      <AddButton onClick={saveTicket}>Add Ticket</AddButton>
      <UserButton />
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

  @media screen and (min-width: 1450px) {
    display: grid;
    grid-template-columns: 800px 1fr;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 30px;

  @media screen and (min-width: 1450px) {
    flex-direction: column;
  }
  @media screen and (max-width: 1150px) {
    flex-direction: column;
  }
`;
const AddButton = styled.button`
  width: 150px;
  height: 45px !important;
  padding: 12px !important;
  font-weight: 600;
  border: none;
  background-color: var(--accent) !important;
  color: #fff;
  margin-left: auto;
  ${sharedButton}
  box-shadow: 0px 2px 7px #818181 !important;
  &:active {
    box-shadow: 0px 4px 8px #686662 !important;
    transform: scale(0.98);
  }
  @media screen and (min-width: 1450px) {
    margin-right: -530px;
  }
`;
