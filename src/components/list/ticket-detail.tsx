import React from "react";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import { sharedWrapper, sharedTitle } from "../sharedStyles";

export default function TicketDetail() {
  const { id } = useParams();

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  return (
    <Wrapper>
      <Photos></Photos>
      <Info></Info>
      <Setlist></Setlist>
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
