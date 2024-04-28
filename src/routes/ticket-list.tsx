import React from "react";
import Ticket from "../components/list/ticket";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 100px;
  gap: 30px;
  margin: 0 30px;
  overflow: auto;
  background: var(--light);
`;

export default function TicketList() {
  return (
    <Wrapper>
      <Ticket />
    </Wrapper>
  );
}
