import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Cover from "../components/cover";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import tickets from "../assets/tickets.png";

export default function Home() {
  const [viewCover, setViewCover] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  const toggleCoverVisibility = () => {
    setViewCover(!viewCover);
  };

  const logOut = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      auth.signOut();
      setIsAuthenticated(false);
      alert("로그아웃 되었습니다.");
    }
  };

  return (
    <Wrapper>
      {viewCover && <Cover onClose={toggleCoverVisibility} />}
      {isAuthenticated ? (
        <div>
          <Title>
            {auth.currentUser?.displayName}님의
            <br /> 티켓북에 오신 것을 환영합니다!
          </Title>
          <ButtonWrapper>
            <NavLink to="/ticket-list">티켓북 열기</NavLink>
            <NavLink to="/create-ticket">티켓 추가하기</NavLink>
            <Logout onClick={logOut}>Log Out</Logout>
          </ButtonWrapper>
        </div>
      ) : (
        <div>
          <Title>
            기억에 남는 공연 <br /> 추억이 되는 기록
          </Title>
          <Subtitle>당신의 소중한 추억을 이곳에 기록해 보세요</Subtitle>
          <ButtonWrapper>
            <NavLink to="/login">로그인</NavLink>
            <NavLink to="/create-account">티켓북 가입하기</NavLink>
          </ButtonWrapper>
        </div>
      )}
      <TicketsImage src={tickets} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
`;

const NavLink = styled(Link)`
  padding: 20px;
  text-decoration: none;
  border-radius: 40px;
  color: black;
  background: var(--accent);
  transition: 0.25s;
  &:hover {
    color: white;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 40px 0;
  justify-content: center;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 40px;
  text-align: left;
  line-height: normal;
  font-weight: bold;
`;

const Subtitle = styled.h3`
  color: #fff;
  margin-top: 20px;
  text-align: left;
`;

const TicketsImage = styled.img`
  width: 300px;
`;

const Logout = styled.button`
  background-color: transparent;
  color: #fff;
  text-decoration: underline;
  position: absolute;
  border: none;
  right: 10px;
  bottom: 10px;
`;
