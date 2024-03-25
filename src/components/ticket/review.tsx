import { TextField } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  min-height: 35vh;
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
  padding-bottom: 10px;
`;
export default function Review() {
  return (
    <Wrapper>
      <Title>REVIEW</Title>
      <Textarea></Textarea>
    </Wrapper>
  );
}
