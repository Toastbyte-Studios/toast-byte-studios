import { useEffect, useRef } from 'react';
import type { JSX } from 'react';
import {
  Container,
  SectionHeader,
  OfflineTag,
  Grid,
  Card,
  CardIcon,
  CardName,
  CardDescription,
} from './styles';

const MODULES = [
  {
    icon: '🛡️',
    name: 'Core',
    description:
      'Essential emergency utilities — flashlight, compass, whistle signal timer, and critical survival calculations.',
  },
  {
    icon: '🗺️',
    name: 'Navigation',
    description:
      'Offline maps, coordinate tools, and terrain reference so you always know where you are — no signal required.',
  },
  {
    icon: '📡',
    name: 'Communications',
    description:
      'Emergency frequencies, signaling protocols, and contact tools for when normal communication fails.',
  },
  {
    icon: '📖',
    name: 'Reference',
    description:
      'Survival guides, first aid procedures, and critical field references available entirely offline.',
  },
  {
    icon: '🎒',
    name: 'Prepper',
    description:
      'Preparedness checklists, gear inventory, and scenario-based planning to stay ready before an emergency hits.',
  },
] as const;

/**
 * FeaturesSection renders a grid of TOAST app module cards.
 *
 * Highlights the five core modules with icon, name, and description,
 * emphasizing that all features are available offline.
 *
 * @component
 * @returns {JSX.Element} The rendered features grid section.
 */
const FeaturesSection: React.FC = (): JSX.Element => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>(
    Array(MODULES.length).fill(null),
  );

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Container>
      <SectionHeader>
        <h2>What&apos;s Inside TOAST</h2>
      </SectionHeader>
      <OfflineTag>
        <span role="img" aria-hidden="true">
          📶
        </span>{' '}
        All five modules work fully offline — no signal, no problem.
      </OfflineTag>
      <Grid>
        {MODULES.map((mod, i) => (
          <Card
            key={mod.name}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
          >
            <CardIcon>
              <span role="img" aria-hidden="true">
                {mod.icon}
              </span>
            </CardIcon>
            <CardName>{mod.name}</CardName>
            <CardDescription>{mod.description}</CardDescription>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturesSection;
