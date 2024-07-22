import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import googleLogo from "../../assets/google-logo.png";
import { sharedButton } from "../sharedStyles";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

export default function GoogleButton() {
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <LineWrapper>
        <Line />
        OR
        <Line />
      </LineWrapper>
      <Button onClick={onClick}>
        <Logo src={googleLogo} />
        Continue with Google
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #b0b0b0;
`;

const Line = styled.div`
  margin: 40px 0;
  width: 190px;
  border: solid 1px #b0b0b0;
`;

const Button = styled.span`
  ${sharedButton};
  gap: 10px;
  margin-top: 10px;
  width: 300px;
  height: 2.5rem;
  background-color: var(--accent);
  cursor: pointer;

  &:hover {
    background-color: var(--light-200);

    color: black;
  }
`;

const Logo = styled.img`
  width: 30px;
`;
