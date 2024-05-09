import styled from "styled-components";
import { sharedWrapper, sharedTitle } from "../sharedStyles";

const Wrapper = styled.div`
  ${sharedWrapper}
  min-height: 40vh;
  min-width: 500px;
`;

const Textarea = styled.textarea`
  width: 100%;

  height: calc(100% - 20px);
  resize: none;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 20px;

  &:focus {
    outline-color: var(--accent);
  }
`;

const Title = styled.div`
  ${sharedTitle}
  padding-bottom: 10px;
`;
export default function ReviewForm({ setTicketInfo }) {
  const handleChange = (e) => {
    const { value } = e.target;
    setTicketInfo((prev) => ({
      ...prev,
      review: value,
    }));
  };
  return (
    <Wrapper>
      <Title>REVIEW</Title>
      <Textarea onChange={handleChange}></Textarea>
    </Wrapper>
  );
}
