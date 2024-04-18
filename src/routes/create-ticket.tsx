import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Setlist from "../components/ticket/music-search/setlist";
import AddPhoto from "../components/ticket/add-photo";
import Details from "../components/ticket/details";
import Review from "../components/ticket/review";
import { sharedButton } from "../components/ticket/sharedStyles.ts";

export interface TicketInfo {
  photo: File;
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
    photo: null,
    title: "",
    date: "",
    time: "",
    location: "",
    seat: "",
    review: "",
  });
  const saveTicket = () => {
    const newTicket = {};
    const updatedTickets = [...tickets, newTicket];

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  return (
    <Wrapper>
      <AddPhoto setTicketInfo={setTicketInfo} />
      <FlexContainer>
        <Details ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
        <Setlist ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
      </FlexContainer>
      <Review setTicketInfo={setTicketInfo} />
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
