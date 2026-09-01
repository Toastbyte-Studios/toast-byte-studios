import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Banner = styled.section`
  position: fixed;
  z-index: 10;
  right: 24px;
  bottom: 24px;
  left: 24px;
  display: flex;
  max-width: 720px;
  gap: 24px;
  align-items: center;
  margin: 0 auto;
  padding: 20px 24px;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--color-text) 20%, transparent);

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    right: 12px;
    bottom: 12px;
    left: 12px;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

const Content = styled.div`
  flex: 1;

  p {
    margin: 0;
    color: color-mix(in srgb, var(--color-text) 72%, transparent);
  }
`;

const Title = styled.h2`
  margin: 0 0 4px;
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  flex: none;
  gap: 10px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    > * {
      flex: 1;
    }
  }
`;

const Button = styled.button`
  min-height: 44px;
  padding: 8px 16px;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background: color-mix(in srgb, var(--color-accent) 8%, transparent);
  }
`;

export { Actions, Banner, Button, Content, Title };
