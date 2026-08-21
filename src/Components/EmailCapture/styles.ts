import styled from 'styled-components';
import { BREAKPOINTS, TOUCH_TARGET } from '../../constants';

const Section = styled.section`
  border: 1px solid var(--color-divider);
  padding: 26px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 20px 18px;
  }
`;

const Label = styled.h2`
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: color-mix(in srgb, var(--color-text) 55%, transparent);
  margin: 0 0 14px;
`;

const Blurb = styled.p`
  font-size: 15px;
  line-height: 1.55;
  margin: 0 0 18px;
  color: color-mix(in srgb, var(--color-text) 75%, transparent);
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  background: var(--color-bg);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 15px;
  padding: 11px 14px;

  &::placeholder {
    color: color-mix(in srgb, var(--color-text) 45%, transparent);
  }

  &:focus {
    outline: 2px solid color-mix(in srgb, var(--color-accent) 55%, transparent);
    outline-offset: 1px;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    /* iOS Safari zooms the whole page in when a focused input is under
       16px, and does not zoom back out afterwards. */
    font-size: 16px;
    min-height: ${TOUCH_TARGET};
  }
`;

const SubmitButton = styled.button`
  background: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-md);
  color: var(--color-bg);
  font-family: var(--font-heading);
  font-size: 15px;
  letter-spacing: 0.02em;
  padding: 11px 20px;
  cursor: pointer;
  transition:
    background 140ms ease,
    opacity 140ms ease;

  &:hover:not(:disabled) {
    background: var(--color-accent-600);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    min-height: ${TOUCH_TARGET};
  }
`;

const TurnstileSlot = styled.div<{ $hidden?: boolean }>`
  margin: 12px 0 0;
  display: ${({ $hidden }) => ($hidden ? 'none' : 'block')};
  /* The Turnstile iframe has a fixed 300px intrinsic width; letting the
     slot scroll keeps it from widening the page on a 320px screen. */
  max-width: 100%;
  overflow-x: auto;
`;

const SuccessMessage = styled.p`
  margin: 0;
  font-size: 15px;
  color: var(--color-accent-700);
`;

const ErrorMessage = styled.p`
  margin: 10px 0 0;
  font-size: 14px;
  color: #c0392b;
`;

export {
  Section,
  Label,
  Blurb,
  Form,
  Input,
  SubmitButton,
  TurnstileSlot,
  SuccessMessage,
  ErrorMessage,
};
