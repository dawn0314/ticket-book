import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Setlist from "../components/ticket/setlist";
import AddPhoto from "../components/ticket/add-photo";
import Details from "../components/ticket/details";
import Review from "../components/ticket/review";

export interface TicketInfo {
  title: string;
  dateAndTime: Date;
  location: string;
  seat: string;
}

export default function CreateTicket() {
  const [tickets, setTickets] = useState([]);
  const [ticketInfo, setTicketInfo] = useState<TicketInfo>({
    title: "",
    dateAndTime: undefined,
    location: "",
    seat: "",
  });
  const saveTicket = () => {
    const newTicket = {};
    const updatedTickets = [...tickets, newTicket];

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  return (
    <Wrapper>
      <AddPhoto ticketInfo={ticketInfo} />
      <Details ticketInfo={ticketInfo} />
      <Setlist ticketInfo={ticketInfo} />
      <Review ticketInfo={ticketInfo} />
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
