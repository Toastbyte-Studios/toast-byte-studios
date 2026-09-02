import type { JSX } from 'react';
import { PRINCIPLES } from '../../data/catalog';
import {
  SectionLabel,
  PageTitle,
  BackLink,
  Button,
} from '../../styles/primitives';
import {
  Main,
  Lede,
  Columns,
  PrincipleRow,
  PrincipleTitle,
  PrincipleBody,
  MarkImage,
  MarkCaption,
  PressPanel,
  PressHeading,
  PressBody,
} from './styles';

/**
 * Studio renders the about page: how the studio works, the studio mark, and
 * a press and partners panel.
 *
 * @component
 * @returns {JSX.Element} The rendered studio view.
 */
const Studio: React.FC = (): JSX.Element => {
  return (
    <Main id="main">
      <BackLink href="/">← Toastbyte Studios</BackLink>
      <PageTitle>The studio</PageTitle>
      <Lede>
        An independent development studio in Las Vegas, building cool apps in
        the hot desert.
      </Lede>
      <Columns>
        <div>
          <SectionLabel>How we work</SectionLabel>
          {PRINCIPLES.map((principle) => (
            <PrincipleRow key={principle.title}>
              <PrincipleTitle>{principle.title}</PrincipleTitle>
              <PrincipleBody>{principle.body}</PrincipleBody>
            </PrincipleRow>
          ))}
        </div>
        <div>
          <MarkImage
            src="/assets/images/ToastByteStudios.webp"
            alt="Toastbyte Studios mark"
            width={240}
            height={240}
            decoding="async"
          />
          <MarkCaption>
            The studio mark. Named for a dog, not a breakfast.
          </MarkCaption>
          <PressPanel>
            <PressHeading>Press &amp; partners</PressHeading>
            <PressBody>
              Logos, screenshots and product one-pagers are available on
              request. For licensing, distribution or integration enquiries,
              email is fastest.
            </PressBody>
            <Button href="mailto:info@toastbyte.studio" $variant="primary">
              info@toastbyte.studio
            </Button>
          </PressPanel>
        </div>
      </Columns>
    </Main>
  );
};

export default Studio;
