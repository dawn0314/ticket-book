import React, { useState, useEffect } from "react";
import Ticket from "../components/list/ticket";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import Pagination from "../components/pagination";

export default function TicketList() {
  const [page, setPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets);
      setTickets(parsedTickets);
      setTotalPage(Math.ceil(parsedTickets.length / 4));
    }
  }, []);

  const getDisplayedTickets = () => {
    const startIndex = (page - 1) * 4;
    const endIndex = startIndex + 4;
    return tickets.slice(startIndex, endIndex);
  };

  return (
    <Wrapper>
      <NavLink to="/create-ticket">ADD TICKET</NavLink>
      {getDisplayedTickets().map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
      <Pagination
        totalPage={totalPage}
        limit={4}
        page={page}
        setPage={setPage}
      />
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

const NavLink = styled(Link)`
  padding: 20px;
  width: 140px;
  text-align: center;
  margin-left: auto;
  text-decoration: none;
  border-radius: 20px;
  color: black;
  background: var(--accent);
  transition: 0.25s;
  &:hover {
    color: white;
  }
`;
