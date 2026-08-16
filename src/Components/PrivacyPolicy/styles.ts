import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';
import {
  PageContainer,
  PageContent,
  PageHeader,
  Paragraph,
  ContactLink,
} from '../../styles/pageLayout';

const SectionTitle = styled.h2`
  margin: 8px 0 0;
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 18px;
  }
`;

const LastUpdated = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
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
