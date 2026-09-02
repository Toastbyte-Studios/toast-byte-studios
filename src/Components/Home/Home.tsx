import type { JSX } from 'react';
import { PRODUCTS } from '../../data/catalog';
import EmailCapture from '../EmailCapture/EmailCapture';
import {
  SectionLabel,
  Button,
  Dot,
  QuietLink,
  Prose,
} from '../../styles/primitives';
import {
  Hero,
  Eyebrow,
  HeroHeadline,
  HeroLede,
  ButtonRow,
  SideColumn,
  StatusPanel,
  PanelLabel,
  StatusRow,
  StatusName,
  StatusValue,
  PanelNote,
  ProductsSection,
  ProductCard,
  ProductHeading,
  ProductName,
  ProductKind,
  ProductBlurb,
  ProductMeta,
  ProductActions,
  DomainLink,
  ClosingSection,
  PullQuote,
} from './styles';

/**
 * Home renders the studio front page: the positioning hero, a live status
 * panel and launch signup, the product index, and the closing studio and
 * client-work columns.
 *
 * @component
 * @returns {JSX.Element} The rendered home view.
 */
const Home: React.FC = (): JSX.Element => {
  return (
    <main id="main">
      <Hero>
        <div>
          <Eyebrow>
            Independent software development · Las Vegas, Nevada
          </Eyebrow>
          <HeroHeadline>
            Software we build,
            <br />
            ship and maintain.
          </HeroHeadline>
          <HeroLede>
            Toastbyte Studios is an independent development studio with a
            portfolio of its own products. We build tools that work offline,
            load fast, and don&apos;t ask you to sign in for no reason — and we
            keep maintaining them after launch.
          </HeroLede>
          <ButtonRow>
            <Button
              href="#products"
              $variant="primary"
              onClick={(event) => {
                event.preventDefault();
                document
                  .getElementById('products')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See the products
            </Button>
            <Button href="/studio" $variant="secondary">
              About the studio
            </Button>
          </ButtonRow>
        </div>
        <SideColumn>
          <StatusPanel>
            <PanelLabel>Currently</PanelLabel>
            {PRODUCTS.map((product) => (
              <StatusRow key={product.key}>
                <Dot $color={product.dot} $size={7} />
                <StatusName>{product.name}</StatusName>
                <StatusValue>{product.status}</StatusValue>
              </StatusRow>
            ))}
            <PanelNote>
              Three products in the portfolio. The status here is the same
              status you would get if you emailed and asked.
            </PanelNote>
          </StatusPanel>
          <EmailCapture />
        </SideColumn>
      </Hero>

      <ProductsSection id="products">
        <SectionLabel>Products</SectionLabel>
        {PRODUCTS.map((product) => (
          <ProductCard key={product.key}>
            <div>
              <ProductHeading>
                <Dot $color={product.dot} />
                <ProductName>{product.name}</ProductName>
              </ProductHeading>
              <ProductKind>{product.kind}</ProductKind>
            </div>
            <div>
              <ProductBlurb>{product.blurb}</ProductBlurb>
              <ProductMeta>{product.meta}</ProductMeta>
            </div>
            <ProductActions>
              <QuietLink href={`/product/${product.key}`}>Details →</QuietLink>
              <DomainLink
                href={product.site}
                target="_blank"
                rel="noopener noreferrer"
              >
                {product.domain}
              </DomainLink>
            </ProductActions>
          </ProductCard>
        ))}
      </ProductsSection>

      <ClosingSection>
        <div>
          <SectionLabel>The studio</SectionLabel>
          <PullQuote>
            An independent studio in Las Vegas, building cool apps in the hot
            desert.
          </PullQuote>
          <Prose>
            We are small and deliberate about it. Design, engineering, releases
            and support all happen in-house, which means features land when they
            are finished and the person who answers your email can read the
            code. Our products are funded by our products, so nothing here gets
            sunset by a reorg.
          </Prose>
          <QuietLink href="/studio">How we work →</QuietLink>
        </div>
        <div>
          <SectionLabel>Selective client work</SectionLabel>
          <Prose>
            We take on a small number of contracts each year alongside the
            product work. The best fit is a well-scoped build — an
            offline-capable app, a developer tool, a data-heavy interface —
            where you want experienced hands from first sketch to release rather
            than a team you have to manage.
          </Prose>
          <Prose>
            Tell us the timeline and the scope in the first email and we will
            tell you honestly whether it fits.
          </Prose>
          <Button href="mailto:info@toastbyte.studio" $variant="primary">
            info@toastbyte.studio
          </Button>
        </div>
      </ClosingSection>
    </main>
  );
};

export default Home;
