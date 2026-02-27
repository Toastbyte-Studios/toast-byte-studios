import styled from 'styled-components';
import { FlexCol, FlexRow } from '../../styles/core';
import { COLORS, BREAKPOINTS } from '../../constants';

const Container = styled(FlexCol)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  padding: 60px 40px;

  font-family: 'Inter', Arial, sans-serif;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    padding: 40px 30px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 30px 20px;
  }
`;

const HeroSection = styled(FlexCol)`
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    margin-bottom: 15px;
    gap: 15px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    margin-bottom: 10px;
    gap: 10px;
  }
`;

const UnderDevelopmentBanner = styled.div`
  background: linear-gradient(
    135deg,
    ${COLORS.ACCENT} 0%,
    ${COLORS.TOAST_BROWN} 100%
  );
  color: ${COLORS.PRIMARY_LIGHT};
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 20px rgba(192, 154, 107, 0.35);
  margin-bottom: 20px;
  font-family: 'Raleway', Arial, sans-serif;
  border: 2px solid rgba(255, 255, 255, 0.15);

  @media (prefers-reduced-motion: no-preference) {
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      box-shadow: 0 4px 20px rgba(192, 154, 107, 0.35);
    }
    50% {
      transform: scale(1.02);
      box-shadow: 0 6px 30px rgba(192, 154, 107, 0.5);
    }
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 18px;
    padding: 14px 24px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 16px;
    padding: 12px 20px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  font-family: 'Raleway', Arial, sans-serif;
  color: ${COLORS.PRIMARY_LIGHT};
  margin: 20px 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.5px;

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    font-size: 40px;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 32px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 24px;
    margin: 15px 0 8px 0;
  }
`;

const SubTitle = styled.p`
  font-size: 22px;
  font-weight: 400;
  text-align: center;
  font-family: 'Inter', Arial, sans-serif;
  color: ${COLORS.TOAST_BROWN};
  padding: 10px 20px;
  margin: 0;
  line-height: 1.6;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 20px;
    padding: 8px 16px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 18px;
    padding: 6px 12px;
  }
`;

const HorizontalRule = styled.hr`
  width: 80%;
  max-width: 600px;
  border: none;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${COLORS.TOAST_BROWN} 50%,
    transparent 100%
  );
  margin: 16px 0;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    margin: 12px 0;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    margin: 10px 0;
    width: 90%;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  &::before {
    content: '';
    position: absolute;
    width: 260px;
    height: 260px;
    background: radial-gradient(
      circle,
      rgba(192, 154, 107, 0.2) 0%,
      transparent 70%
    );
    border-radius: 50%;
    z-index: 0;

    @media (prefers-reduced-motion: no-preference) {
      animation: glow 3s ease-in-out infinite;
    }
  }

  @keyframes glow {
    0%,
    100% {
      opacity: 0.5;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 15px;

    &::before {
      width: 180px;
      height: 180px;
    }
  }
`;

const ToastVideo = styled.video`
  width: 240px;
  height: 240px;
  max-width: 240px;
  border: 3px solid ${COLORS.TOAST_BROWN};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 8px 30px rgba(192, 154, 107, 0.4);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    width: 200px;
    height: 200px;
    max-width: 200px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    width: 160px;
    height: 160px;
    max-width: 160px;
    border: 2px solid ${COLORS.TOAST_BROWN};
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;
  width: 100%;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    flex-direction: column;
    gap: 36px;
  }
`;

const HeroText = styled(FlexCol)`
  flex: 1;
  align-items: flex-start;
  max-width: 560px;
  gap: 20px;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    align-items: center;
    max-width: 100%;
  }
`;

const ComingSoonBadge = styled.span`
  display: inline-block;
  background: linear-gradient(
    135deg,
    ${COLORS.ACCENT} 0%,
    ${COLORS.TOAST_BROWN} 100%
  );
  color: ${COLORS.PRIMARY_LIGHT};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(230, 126, 74, 0.4);
`;

const HeroHeadline = styled.h1`
  font-size: 44px;
  font-weight: 800;
  font-family: 'Raleway', Arial, sans-serif;
  color: ${COLORS.PRIMARY_LIGHT};
  margin: 0;
  line-height: 1.15;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);

  span {
    color: ${COLORS.TOAST_BROWN};
  }

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    font-size: 36px;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 30px;
    text-align: center;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 26px;
  }
`;

const HeroSubheadline = styled.p`
  font-size: 18px;
  font-weight: 400;
  font-family: 'Inter', Arial, sans-serif;
  color: ${COLORS.TOAST_BROWN};
  margin: 0;
  line-height: 1.7;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 16px;
    text-align: center;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 15px;
  }
`;

const AppStoreRow = styled(FlexRow)`
  justify-content: flex-start;
  gap: 14px;
  flex-wrap: wrap;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    justify-content: center;
  }
`;

const AppStoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 2px solid rgba(192, 154, 107, 0.5);
  border-radius: 10px;
  background: rgba(192, 154, 107, 0.1);
  color: ${COLORS.PRIMARY_LIGHT};
  font-family: 'Inter', Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: default;
  opacity: 0.75;
  transition: opacity 0.2s ease;

  span.store-label {
    font-size: 11px;
    font-weight: 400;
    opacity: 0.8;
    display: block;
    line-height: 1;
  }

  span.store-name {
    display: block;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
  }
`;

const EmailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 420px;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    max-width: 100%;
    align-items: center;
  }
`;

const EmailLabel = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', Arial, sans-serif;
  color: ${COLORS.PRIMARY_LIGHT};
  opacity: 0.9;
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: row;
  gap: 0;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid rgba(192, 154, 107, 0.4);
  background: rgba(0, 0, 0, 0.2);

  &:focus-within {
    border-color: ${COLORS.TOAST_BROWN};
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    flex-direction: column;
    border-radius: 10px;
    overflow: visible;
    border: none;
    gap: 8px;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 14px;
  color: ${COLORS.PRIMARY_LIGHT};

  &::placeholder {
    color: rgba(245, 241, 235, 0.45);
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    border: 2px solid rgba(192, 154, 107, 0.4);
    border-radius: 10px;
    padding: 12px 16px;

    &:focus {
      border-color: ${COLORS.TOAST_BROWN};
    }
  }
`;

const EmailSubmitButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(
    135deg,
    ${COLORS.ACCENT} 0%,
    ${COLORS.TOAST_BROWN} 100%
  );
  border: none;
  color: ${COLORS.PRIMARY_LIGHT};
  font-family: 'Inter', Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    border-radius: 10px;
    padding: 12px 20px;
  }
`;

const EmailSuccessMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${COLORS.TOAST_BROWN};
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 600;
`;

const EmailErrorMessage = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: #e05c5c;
  font-family: 'Inter', Arial, sans-serif;
`;

export {
  Container,
  HeroSection,
  UnderDevelopmentBanner,
  Title,
  SubTitle,
  HorizontalRule,
  VideoContainer,
  ToastVideo,
  HeroContent,
  HeroText,
  ComingSoonBadge,
  HeroHeadline,
  HeroSubheadline,
  AppStoreRow,
  AppStoreButton,
  EmailSection,
  EmailLabel,
  EmailForm,
  EmailInput,
  EmailSubmitButton,
  EmailSuccessMessage,
  EmailErrorMessage,
};
