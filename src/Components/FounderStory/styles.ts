import styled from 'styled-components';
import { FlexCol, FlexRow } from '../../styles/core';
import { COLORS, BREAKPOINTS } from '../../constants';
import { fadeInCss } from '../About/styles';

const Container = styled(FlexCol)`
  width: 100%;
  max-width: 1000px;
  justify-content: flex-start;

  padding: 60px 50px;
  margin: 20px 0;
  gap: 32px;

  font-family: 'Inter', Arial, sans-serif;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(196, 98, 45, 0.15);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(61, 35, 20, 0.08);
  color: ${COLORS.PRIMARY_DARK};
  line-height: 1.8;
  font-size: 18px;

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    padding: 50px 40px;
    gap: 28px;
    font-size: 17px;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    padding: 40px 30px;
    gap: 24px;
    font-size: 16px;
    border-radius: 16px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 30px 20px;
    margin: 10px 0;
    gap: 20px;
    font-size: 15px;
    border-radius: 12px;
  }
`;

const SectionHeader = styled(FlexRow)`
  width: auto;
  padding: 12px 28px;
  background: linear-gradient(
    135deg,
    ${COLORS.TOAST_BROWN} 0%,
    ${COLORS.ACCENT} 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-family: 'Raleway', sans-serif;
  box-shadow: 0 4px 15px rgba(196, 98, 45, 0.25);
  color: ${COLORS.PRIMARY_LIGHT};

  h2 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    padding: 10px 24px;

    h2 {
      font-size: 24px;
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 8px 20px;

    h2 {
      font-size: 20px;
    }
  }
`;

/* Use plain div with explicit flex to avoid width/height:100% from FlexRow base */
const ContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 40px;
  box-sizing: border-box;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    flex-direction: column;
    align-items: center;
    gap: 28px;
  }
`;

/* Use plain div with explicit flex to avoid width:100% from FlexCol base */
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
  gap: 20px;
  box-sizing: border-box;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    width: 100%;
  }
`;

const FadeInParagraph = styled.p`
  ${fadeInCss}
  margin: 0;
  padding: 0;
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 24px;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
`;

const HikingPhoto = styled.img`
  width: 260px;
  height: 320px;
  object-fit: cover;
  border-radius: 16px;
  border: 3px solid ${COLORS.TOAST_BROWN};
  box-shadow: 0 8px 28px rgba(196, 98, 45, 0.25);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    width: 220px;
    height: 270px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    width: 180px;
    height: 220px;
  }
`;

const ToastCloseupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const ToastCloseupPhoto = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  object-position: center top;
  border-radius: 50%;
  border: 3px solid ${COLORS.TOAST_BROWN};
  box-shadow: 0 6px 20px rgba(196, 98, 45, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    width: 110px;
    height: 110px;
  }
`;

const PhotoCaption = styled.span`
  font-size: 13px;
  color: ${COLORS.TOAST_BROWN};
  text-align: center;
  font-style: italic;
  max-width: 160px;
  line-height: 1.4;
`;

export {
  Container,
  SectionHeader,
  ContentLayout,
  TextBlock,
  FadeInParagraph,
  ImageColumn,
  HikingPhoto,
  ToastCloseupWrapper,
  ToastCloseupPhoto,
  PhotoCaption,
};
