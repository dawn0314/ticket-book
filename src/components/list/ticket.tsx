import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import barcode from "../../assets/barcode.png";
import { useNavigate } from "react-router-dom";

const tearShape = css`
  content: "";
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--light);
  position: absolute;
  left: -20px;
  bottom: 93%;
`;

const Wrapper = styled.div`
  width: 720px;
  min-height: 240px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const Content = styled.div`
  width: 360px;
  height: 200px;
`;
const Image = styled.img`
  width: 200px;
  height: 100%;
  background-color: green;
  object-fit: cover;
  position: relative;
`;

const Title = styled.div`
  font-size: 36px;
  margin: 40px 0px 20px 20px;
  text-align: right;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 300px;
  display: -webkit-box;
  max-height: 70px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* white-space: normal; */
  white-space: pre-wrap;
  word-wrap: break-word;
  display: inline-block;
`;
const InfoContainer = styled.div`
  text-align: right;
  margin: 0 40px 20px 0;
  line-height: normal;
`;

const TearLine = styled.div`
  width: 1px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333333DE' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='40' stroke-linecap='square'/%3e%3c/svg%3e");
  height: 100%;
  position: relative;
  z-index: 1;
  &:before {
    ${tearShape}
  }
  &:after {
    ${tearShape}
    top: 93%;
  }
`;

const Seat = styled.div`
  display: flex;
  position: absolute;
  top: 110px;
  right: -10px;
  transform: rotate(-90deg);
  justify-content: space-between;
  align-items: center;
  width: 170px;
  font-size: 18px;
`;

const Barcode = styled.img`
  width: 200px;
  margin: 95px 8px;
  transform: rotate(90deg);
`;

const TearOff = styled.div`
  width: 140px;
  height: 100%;
  position: relative;
`;

export default function Ticket({ ticket }) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedTickets = localStorage.getItem("tickets");
  //   if (storedTickets) {
  //     setTickets(JSON.parse(storedTickets));
  //   }
  // }, []);

  const renderSeat = () => {
    const seats = ticket.seat.split(" ");

    return seats.map((seat, index) => {
      return (
        <div key={index} className="seat">
          {seat}
        </div>
      );
    });
  };

  return (
    <Wrapper onClick={() => navigate(`/ticket-list/${ticket.id}`)}>
      <Image src={ticket.photo[ticket.mainPhoto]} />
      <Content>
        <Title>{ticket.title}</Title>
        <InfoContainer>
          {ticket.date} {ticket.time}
          <br />
          {ticket.location ? `@ ${ticket.location}` : null}
        </InfoContainer>
      </Content>
      <TearLine />
      <TearOff>
        <Barcode src={barcode} />
        <Seat>{renderSeat()}</Seat>
      </TearOff>
    </Wrapper>
  );
}
