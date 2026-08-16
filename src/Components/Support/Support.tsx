import type { JSX } from 'react';
import { CONTACTS } from '../../data/catalog';
import {
  SectionLabel,
  PageTitle,
  BackLink,
  Prose,
} from '../../styles/primitives';
import {
  Main,
  Lede,
  Columns,
  ContactRow,
  ContactKey,
  ContactLink,
} from './styles';

/**
 * Support renders the contact routes for the portfolio and guidance on what to
 * include when getting in touch.
 *
 * @component
 * @returns {JSX.Element} The rendered support view.
 */
const Support: React.FC = (): JSX.Element => {
  return (
    <Main id="main">
      <BackLink href="#/">← Toastbyte Studios</BackLink>
      <PageTitle>Support</PageTitle>
      <Lede>
        Include the product name and what you were doing when it broke. You will
        normally hear back within two business days.
      </Lede>
      <Columns>
        <div>
          <SectionLabel>Get in touch</SectionLabel>
          {CONTACTS.map((contact) => (
            <ContactRow key={contact.k}>
              <ContactKey>{contact.k}</ContactKey>
              <ContactLink
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  contact.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
              >
                {contact.v}
              </ContactLink>
            </ContactRow>
          ))}
        </div>
        <div>
          <SectionLabel>Before you write</SectionLabel>
          <Prose>
            Bug reports go further with a version number and a screenshot.
            Feature requests are welcome and answered honestly: most get a “not
            soon”, and the ones that fit the roadmap get a date.
          </Prose>
          <Prose>
            GitAll is open source, and issues filed on the repository are read
            alongside email — the better place for anything reproducible.
          </Prose>
        </div>
      </Columns>
    </Main>
  );
};

export default Support;
