import React from "react";
import styled, { css } from "styled-components";

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
  height: 270px;
  background-color: white;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  width: 400px;
  height: 200px;
`;
const Image = styled.img`
  width: 180px;
  height: 100%;
  background-color: green;
`;

const Title = styled.div``;
const InfoContainer = styled.div``;

const TearLine = styled.div`
  width: 2px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333333DE' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='40' stroke-linecap='square'/%3e%3c/svg%3e");
  height: 100%;
  position: relative;

  &:before {
    ${tearShape}
  }
  &:after {
    ${tearShape}
    top: 93%;
  }
`;

const TearOff = styled.div`
  width: 160px;
  height: 100%;
`;

export default function Ticket() {
  return (
    <Wrapper>
      <Image></Image>
      <Content>
        <Title></Title>
        <InfoContainer></InfoContainer>
      </Content>
      <TearLine />
      <TearOff></TearOff>
    </Wrapper>
  );
}
