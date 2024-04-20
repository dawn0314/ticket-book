import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Setlist from "../components/ticket/music-search/setlist";
import AddPhoto from "../components/ticket/add-photo";
import Details from "../components/ticket/details";
import Review from "../components/ticket/review";
import { sharedButton } from "../components/ticket/sharedStyles.ts";

export interface TicketInfo {
  id: number;
  mainPhoto: number;
  photo: File[];
  title: string;
  date: string;
  time: string;
  location: string;
  seat: string;
  review: string;
}

export default function CreateTicket() {
  const [tickets, setTickets] = useState([]);
  const [ticketInfo, setTicketInfo] = useState<TicketInfo>({
    id: 0,
    mainPhoto: 0,
    photo: [],
    title: "",
    date: "",
    time: "",
    location: "",
    seat: "",
    review: "",
  });

  const navigate = useNavigate();

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
        <Review setTicketInfo={setTicketInfo} />
      </FlexContainer>
      <FlexContainer>
        <Details ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
        <Setlist ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
      </FlexContainer>
      <AddButton onClick={saveTicket}>Add Ticket</AddButton>
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
  height: 50px !important;
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
`;
