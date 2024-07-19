import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Cover from "../components/cover";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

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
  }, []);

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
            <button onClick={logOut}>Log Out</button>
          </ButtonWrapper>
        </div>
      ) : (
        <ButtonWrapper>
          <NavLink to="/login">로그인</NavLink>
          <NavLink to="/create-account">티켓북 가입하기</NavLink>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
}

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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 24px;
  text-align: center;
  margin: 40px 0;
  line-height: normal;
`;
