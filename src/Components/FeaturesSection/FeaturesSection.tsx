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

const SVG_PROPS = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const MODULES: { icon: JSX.Element; name: string; description: string }[] = [
  {
    icon: (
      <svg {...SVG_PROPS}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    name: 'Core',
    description:
      'Essential emergency utilities — flashlight, compass, whistle signal timer, and critical survival calculations.',
  },
  {
    icon: (
      <svg {...SVG_PROPS}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    name: 'Navigation',
    description:
      'Offline maps, coordinate tools, and terrain reference so you always know where you are — no signal required.',
  },
  {
    icon: (
      <svg {...SVG_PROPS}>
        <path d="M2 20h.01" />
        <path d="M7 20v-4" />
        <path d="M12 20v-8" />
        <path d="M17 20V8" />
        <path d="M22 4v16" />
      </svg>
    ),
    name: 'Communications',
    description:
      'Emergency frequencies, signaling protocols, and contact tools for when normal communication fails.',
  },
  {
    icon: (
      <svg {...SVG_PROPS}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    name: 'Reference',
    description:
      'Survival guides, first aid procedures, and critical field references available entirely offline.',
  },
  {
    icon: (
      <svg {...SVG_PROPS}>
        <path d="M16.5 9.4 7.55 4.24" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96 12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    ),
    name: 'Prepper',
    description:
      'Preparedness checklists, gear inventory, and scenario-based planning to stay ready before an emergency hits.',
  },
  {
    icon: (
      <svg {...SVG_PROPS}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    name: 'Earth',
    description:
      'Sun and lunar cycles, barometric pressure, seasonal weather outlook, and celestial events — read the natural world around you.',
  },
];

/**
 * FeaturesSection renders a grid of TOAST app module cards.
 *
 * Highlights the six core modules with icon, name, and description,
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
        All six modules work fully offline — no signal, no problem.
      </OfflineTag>
      <Grid>
        {MODULES.map((mod, i) => (
          <Card
            key={mod.name}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
          >
            <CardIcon>{mod.icon}</CardIcon>
            <CardName>{mod.name}</CardName>
            <CardDescription>{mod.description}</CardDescription>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturesSection;
