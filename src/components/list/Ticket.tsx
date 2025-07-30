import styled, { css } from "styled-components";
import barcode from "../../assets/barcode.png";
import { useNavigate } from "react-router-dom";
import { ExtendedTicketInfoType } from "@type/ticket";

interface TicketProps {
  ticket: ExtendedTicketInfoType;
}

export default function Ticket({ ticket }: TicketProps) {
  const navigate = useNavigate();

  const { ticketInfo, photo, id } = ticket;
  const { title, date, time, location, mainPhoto } = ticketInfo;

  const renderSeat = () => {
    const seats = ticket.ticketInfo.seat.split(" ");
    return seats.map((seat: string, index: number) => {
      return (
        <div key={index} className="seat">
          {seat}
        </div>
      );
    });
  };

  return (
    <Wrapper onClick={() => navigate(`/ticket-list/${id}`)}>
      <Image src={photo?.[mainPhoto]} />
      <Content>
        <Title>{title || ""}</Title>
        <InfoContainer>
          {date || ""} {date && time && " / "} {time || ""}
          <br />
          {location ? `@ ${location}` : ""}
        </InfoContainer>
        <MobileSeat>{renderSeat()}</MobileSeat>
      </Content>
      <TearLine />
      <TearOff>
        <Barcode src={barcode} />
        <Seat>{renderSeat()}</Seat>
      </TearOff>
    </Wrapper>
  );
}

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
  min-height: 300px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 4px 5px 5px #ddd;

  @media screen and (max-width: 800px) {
    width: 80vw;
    min-height: 200px;
  }
`;

const Content = styled.div`
  width: 360px;
  height: 200px;
  min-width: 120px;
  text-align: right;
  margin-right: 20px;

  @media screen and (max-width: 800px) {
    margin: 30px 0 0 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 20px;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 100%;
  object-fit: cover;
  position: relative;

  @media screen and (max-width: 800px) {
    min-width: 160px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  overflow: auto;

  @media screen and (min-width: 800px) {
    font-size: 36px;
    margin: 40px 0px 20px 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 300px;
    display: -webkit-box;
    max-height: 70px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    word-wrap: break-word;
    display: inline-block;
  }
`;

const InfoContainer = styled.div`
  font-size: 10px;

  @media screen and (min-width: 800px) {
    margin: 0 40px 20px 0;
    line-height: normal;
    font-size: 14px;
    text-align: right;
  }
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

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const Seat = styled.div`
  display: flex;
  position: absolute;
  top: 140px;
  right: -10px;
  transform: rotate(-90deg);
  justify-content: center;
  gap: 20px;
  width: 170px;
  font-size: 18px;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const MobileSeat = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    display: flex;
    font-size: 18px;
    gap: 10px;
    font-size: 14px;
  }
`;

const Barcode = styled.img`
  width: 240px;
  margin: 125px -14px;
  transform: rotate(90deg);

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const TearOff = styled.div`
  width: 140px;
  height: 100%;
  position: relative;
`;
