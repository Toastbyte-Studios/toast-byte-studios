import styled from 'styled-components';
import { COLORS, BREAKPOINTS } from '../../constants';
import {
  PageContainer,
  PageContent,
  PageHeader,
  Paragraph,
  ContactLink,
} from '../../styles/pageLayout';

const SectionTitle = styled.h2`
  margin: 8px 0 0;
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.TOAST_BROWN};
  font-family: 'Raleway', sans-serif;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 19px;
  }
`;

const Question = styled.h3`
  margin: 4px 0 0;
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.SECONDARY_ACCENT};

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 16px;
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(192, 154, 107, 0.25);
  margin: 4px 0;
`;

export {
  PageContainer,
  PageContent,
  PageHeader,
  SectionTitle,
  Question,
  Paragraph,
  ContactLink,
  Divider,
};

