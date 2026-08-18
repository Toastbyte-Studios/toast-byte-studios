import type { JSX } from 'react';
import { PRODUCTS } from '../../data/catalog';
import { SectionLabel, BackLink, Button, Dot } from '../../styles/primitives';
import {
  Main,
  TitleRow,
  ProductTitle,
  StatusPill,
  Lede,
  ActionRow,
  Columns,
  FeatureRow,
  FeatureNumber,
  FeatureTitle,
  FeatureBody,
  FactRow,
  FactKey,
  FactValue,
  ShotFrame,
  ShotCaption,
  OtherRow,
  OtherLink,
} from './styles';

interface ProductPageProps {
  /** The catalog key of the product to display. */
  productKey: string;
}

/**
 * ProductPage renders a single product: its lede and links, a numbered feature
 * list, a facts table, a screenshot placeholder, and links to the rest of the
 * portfolio.
 *
 * @component
 * @param {ProductPageProps} props - The product key to render.
 * @returns {JSX.Element} The rendered product view.
 */
const ProductPage: React.FC<ProductPageProps> = ({
  productKey,
}): JSX.Element => {
  const current =
    PRODUCTS.find((product) => product.key === productKey) ?? PRODUCTS[0];
  const others = PRODUCTS.filter((product) => product.key !== current.key);

  return (
    <Main id="main">
      <BackLink href="#/">← Toastbyte Studios</BackLink>
      <TitleRow>
        <Dot $color={current.dot} $size={12} />
        <ProductTitle>{current.name}</ProductTitle>
        <StatusPill>{current.status}</StatusPill>
      </TitleRow>
      <Lede>{current.lede}</Lede>
      <ActionRow>
        <Button
          href={current.site}
          target="_blank"
          rel="noopener noreferrer"
          $variant="primary"
        >
          {current.domain}
        </Button>
        <Button
          href={current.repo}
          target="_blank"
          rel="noopener noreferrer"
          $variant="secondary"
        >
          Source on GitHub
        </Button>
      </ActionRow>

      <Columns>
        <div>
          <SectionLabel>What it does</SectionLabel>
          {current.features.map((feature) => (
            <FeatureRow key={feature.n}>
              <FeatureNumber>{feature.n}</FeatureNumber>
              <div>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureBody>{feature.body}</FeatureBody>
              </div>
            </FeatureRow>
          ))}
        </div>
        <div>
          <SectionLabel>Details</SectionLabel>
          {current.facts.map((fact) => (
            <FactRow key={fact.k}>
              <FactKey>{fact.k}</FactKey>
              <FactValue>{fact.v}</FactValue>
            </FactRow>
          ))}
          <ShotFrame aria-hidden="true">
            <ShotCaption>{current.shot}</ShotCaption>
          </ShotFrame>
        </div>
      </Columns>

      <OtherRow>
        {others.map((other) => (
          <OtherLink key={other.key} href={`#/product/${other.key}`}>
            <Dot $color={other.dot} $size={8} />
            {other.name}
          </OtherLink>
        ))}
      </OtherRow>
    </Main>
  );
};

export default ProductPage;
