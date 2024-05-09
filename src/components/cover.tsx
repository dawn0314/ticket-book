import { styled } from "styled-components";

interface CoverProps {
  onClose: () => void;
}

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
  font-family: "Playfair Display";
  cursor: pointer;
  color: var(--accent);
  text-align: center;
`;

export default function Cover({ onClose }: CoverProps) {
  const onTitleClick = () => {
    onClose();
  };
  return (
    <Wrapper>
      <Title onClick={onTitleClick}>TICKET BOOK</Title>
    </Wrapper>
  );
}
