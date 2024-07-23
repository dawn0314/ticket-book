import { useState, useEffect } from "react";
import Ticket from "../components/list/ticket";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import spring from "../assets/spring.png";
import type { TicketInfo } from "./create-ticket";
import UserButton from "../components/user/user-button";

export default function TicketList() {
  const [page, setPage] = useState(1);
  const [tickets, setTickets] = useState<TicketInfo[]>([]);
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

  const displayedTickets = getDisplayedTickets();

  return (
    <Wrapper>
      {[
        displayedTickets
          .slice(0, 2)
          .map((ticket) => <Ticket key={ticket.id} ticket={ticket} />),
        <Spring src={spring} key={1} />,
        displayedTickets
          .slice(2)
          .map((ticket) => <Ticket key={ticket.id} ticket={ticket} />),
      ]}
      <Pagination
        totalPage={totalPage}
        limit={4}
        page={page}
        setPage={setPage}
      />
      <NavLink to="/create-ticket">
        <AddRoundedIcon className="add-icon" />
        <Text>Add Ticket</Text>
      </NavLink>
      <UserButton />
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
  display: flex;
  z-index: 1;
  position: absolute;
  bottom: 30px;
  right: 80px;
  padding: 8px 0 0 8px;
  background: var(--accent);
  border-radius: 50px;
  color: black;
  transition: all 0.25s ease;
  width: 40px;
  height: 40px;
  text-decoration: none;
  overflow: hidden;

  &:hover {
    color: white;
    width: 130px;
  }
`;

const Text = styled.span`
  text-align: center;
  width: 200px;
  margin: 4px 0 0 10px;
  padding-right: 8px;
`;

const Spring = styled.img`
  margin: 0 -100px;
`;
