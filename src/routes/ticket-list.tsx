import React from "react";
import Ticket from "../components/list/ticket";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

export default function TicketList() {
  return (
    <Wrapper>
      <NavLink to="/create-ticket">ADD TICKET</NavLink>
      <Ticket />
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
  text-decoration: none;
  border-radius: 20px;
  color: black;
  background: var(--accent);
  transition: 0.25s;
  &:hover {
    color: white;
  }
`;
