import styled from "styled-components";
import { FlexCol } from "../../styles/core";
import { COLORS, BREAKPOINTS } from "../../constants";

const Container = styled(FlexCol)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  padding: 60px 40px;

  font-family: "Inter", Arial, sans-serif;

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
  margin-bottom: 60px;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    margin-bottom: 40px;
    gap: 15px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    margin-bottom: 30px;
    gap: 10px;
  }
`;

const UnderDevelopmentBanner = styled.div`
  background: linear-gradient(135deg, ${COLORS.ACCENT} 0%, #ff6b1a 100%);
  color: ${COLORS.PRIMARY_LIGHT};
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 20px rgba(255, 139, 67, 0.3);
  margin-bottom: 20px;
  font-family: "Raleway", Arial, sans-serif;
  border: 2px solid rgba(255, 255, 255, 0.1);

  @media (prefers-reduced-motion: no-preference) {
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 4px 20px rgba(255, 139, 67, 0.3);
    }
    50% {
      transform: scale(1.02);
      box-shadow: 0 6px 30px rgba(255, 139, 67, 0.5);
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
  font-family: "Raleway", Arial, sans-serif;
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
  font-family: "Inter", Arial, sans-serif;
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
  background: linear-gradient(90deg, transparent 0%, ${COLORS.TOAST_BROWN} 50%, transparent 100%);
  margin: 30px 0;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    margin: 20px 0;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    margin: 15px 0;
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
    background: radial-gradient(circle, rgba(192, 154, 107, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;

    @media (prefers-reduced-motion: no-preference) {
      animation: glow 3s ease-in-out infinite;
    }
  }

  @keyframes glow {
    0%, 100% {
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

export { Container, HeroSection, UnderDevelopmentBanner, Title, SubTitle, HorizontalRule, VideoContainer, ToastVideo };
