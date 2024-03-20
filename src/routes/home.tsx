import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Cover from "../components/cover";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
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
export default function Home() {
  const [viewCover, setViewCover] = useState(true);
  const toggleCoverVisibility = () => {
    setViewCover(!viewCover);
  };
  return (
    <Wrapper>
      {viewCover && <Cover onClose={toggleCoverVisibility} />}
      <NavLink to="/list">티켓북 보기</NavLink>
      <NavLink to="/create-ticket">티켓 추가하기</NavLink>
    </Wrapper>
  );
}
