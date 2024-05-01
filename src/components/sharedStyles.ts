import { css } from "styled-components";

export const sharedWrapper = css`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 0px 8px #b8b8b8;
`;

export const sharedTitle = css`
  font-size: 20px;
  font-weight: 600;
`;

export const sharedButton = css`
  height: 2.5rem;
  border-radius: calc(2.5rem / 2);
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: var(--primary-dark);
  box-shadow: 0px 2px 7px #616161;
  border: 0;
  transition: all 0.3s;
  text-transform: uppercase;

  &:hover {
    box-shadow: 0px 4px 12px -5px #616161;
    transform: scale(1.03);
  }
  &:active {
    box-shadow: 0px 3px 8px #3b3b3b;
    transform: scale(0.98);
  }
`;
