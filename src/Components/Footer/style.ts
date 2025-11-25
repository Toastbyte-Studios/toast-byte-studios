import styled from "styled-components";
import { COLORS } from "../../constants";

const Container = styled.footer`
  height: 50px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  font-size: 10px;
  font-family: "Inter", Arial, sans-serif;
  color: ${COLORS.PRIMARY_DARK};

  background-color: ${COLORS.SECONDARY_ACCENT};
  border-top: 2px ridge ${COLORS.PRIMARY_DARK};
`;

const Info = styled.p`
  margin-left: 5px;
`;

const Link = styled.a`
  color: ${COLORS.PRIMARY_DARK};
  text-decoration: none;
  margin-right: 5px;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

export { Container, Link, Info };
