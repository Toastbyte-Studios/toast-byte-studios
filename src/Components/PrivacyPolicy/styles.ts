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
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.TOAST_BROWN};
  font-family: 'Raleway', sans-serif;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 18px;
  }
`;

const LastUpdated = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  opacity: 0.7;
`;

export {
  PageContainer,
  PageContent,
  PageHeader,
  SectionTitle,
  Paragraph,
  ContactLink,
  LastUpdated,
};

