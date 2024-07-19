import { styled } from "styled-components";

interface CoverProps {
  onClose: () => void;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: var(--primary-dark);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 100px;
  font-family: "Playfair Display";
  cursor: pointer;
  color: var(--accent);
  text-align: center;
`;

const Subtitle = styled.div`
  color: #fff;
  margin-top: 40px;
  font-size: 20px;
`;

export default function Cover({ onClose }: CoverProps) {
  const onTitleClick = () => {
    onClose();
  };
  return (
    <Wrapper>
      <Title onClick={onTitleClick}>
        TICKET BOOK
        <Subtitle>Click here!</Subtitle>
      </Title>
    </Wrapper>
  );
}
