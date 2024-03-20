import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  background-color: var(--primary-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 100px;
  /* width: 100px;
  height: 100px; */
  color: var(--accent);
  text-align: center;
`;
export default function Cover() {
  return (
    <Wrapper>
      <Title>TICKET BOOK</Title>
    </Wrapper>
  );
}
