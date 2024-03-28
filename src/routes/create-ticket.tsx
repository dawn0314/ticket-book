import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Setlist from "../components/ticket/setlist";
import AddPhoto from "../components/ticket/add-photo";
import Details from "../components/ticket/details";
import Review from "../components/ticket/review";

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
        <Setlist ticketInfo={ticketInfo} />
      </FlexContainer>
      <Review setTicketInfo={setTicketInfo} />
      <AddButton onClick={saveTicket}>Add Tickets</AddButton>
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

const FlexContainer = styled.div`
  display: flex;
  gap: 30px;
`;
const AddButton = styled.button`
  width: 150px;
  padding: 15px;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  background-color: var(--accent);
  color: var(--light);
  font-size: 20px;
  cursor: pointer;
`;
