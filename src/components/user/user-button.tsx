import React from "react";
import { FaUser } from "react-icons/fa6";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function UserButton() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/ticket-list") {
      setShowList(false);
    }
  }, [pathname]);

  const logOut = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      auth.signOut();
      setIsAuthenticated(false);
      alert("로그아웃 되었습니다.");
      navigate("/");
    }
  };

  return (
    <Icon onClick={() => setOpen(!open)}>
      <FaUser />
      {open && (
        <List>
          {showList && (
            <Item>
              <NavLink to="/ticket-list">Ticket List</NavLink>
            </Item>
          )}

          <Item onClick={logOut}>Log Out</Item>
        </List>
      )}
    </Icon>
  );
}

const Icon = styled.div`
  z-index: 1;
  position: absolute;
  cursor: pointer;
  bottom: 30px;
  right: 30px;
  padding: 8px 0 0 8px;
  background: var(--accent);
  border-radius: 50px;
  color: black;
  transition: all 0.25s ease;
  width: 40px;
  height: 40px;
  text-decoration: none;
  /* overflow: hidden; */

  &:hover svg {
    color: white;
  }

  svg {
    position: relative;
    font-size: 20px;
    margin: 2px 0 0 2px;
  }
`;

const List = styled.ul`
  position: absolute;
  width: 120px;
  bottom: 40px;
  right: 0px;
  margin-bottom: 10px;
  background-color: var(--light);
  list-style: none;
  padding: 0 20px 20px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: default;
`;

const Item = styled.li`
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
