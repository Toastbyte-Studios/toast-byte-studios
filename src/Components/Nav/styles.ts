import styled from "styled-components";
import { COLORS } from "../../constants";

const Container = styled.nav`
  height: 60px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.PRIMARY_LIGHT};

  background-color: ${COLORS.TOAST_BROWN};
  border-bottom: 2px solid ${COLORS.SECONDARY_ACCENT};
`;

const Title = styled.h1`
  margin-right: 10px;

  font-size: 20px;
  font-family: "Raleway", Arial, sans-serif;
  color: ${COLORS.PRIMARY_LIGHT};
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
  margin-left: 10px;
  padding: 0;
`;

export { Container, Title, Logo };
