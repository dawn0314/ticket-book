import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export default function Pagination({ totalPage, limit, page, setPage }) {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  useEffect(() => {
    const currentPageIndex = Math.floor((page - 1) / limit);
    setCurrentPageArray(totalPageArray[currentPageIndex]);
  }, [page]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage]);

  const sliceArrayByLimit = (totalPage, limit) => {
    const totalPageArray = [...Array(totalPage).keys()];
    return Array.from({ length: Math.ceil(totalPage / limit) }, (_, i) =>
      totalPageArray.slice(i * limit, (i + 1) * limit)
    );
  };

  return (
    <Wrapper>
      <LeftPageButton onClick={() => setPage(page - 1)} disabled={page === 1} />
      <ButtonWrapper>
        {currentPageArray?.map((i) => (
          <PageButton
            key={i + 1}
            className={page === i + 1 && "active"}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </PageButton>
        ))}
      </ButtonWrapper>
      <RightPageButton
        onClick={() => setPage(page + 1)}
        disabled={page === totalPage}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-around;
`;

const PageButton = styled.div`
  cursor: pointer;
  text-align: center;
  border-radius: 50%;
  padding-top: 7px;
  width: 30px;
  height: 30px;

  &:hover {
    border: solid 1px var(--primary-dark);
  }
  &.active {
    width: 30px;
    height: 30px;
    background-color: var(--accent);
    color: white;
    font-weight: 700;
    border: 0;
  }
`;

const LeftPageButton = styled(ArrowBackIosRoundedIcon)`
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const RightPageButton = styled(ArrowForwardIosRoundedIcon)`
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;
