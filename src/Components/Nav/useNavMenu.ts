import { useCallback, useEffect, useRef, useState } from 'react';

interface NavMenu {
  /** Whether the drawer is currently open. */
  open: boolean;
  /** Flips the drawer between open and closed. */
  toggle: () => void;
  /** Closes the drawer, if it is open. */
  close: () => void;
  /** Attach to the drawer panel — used to detect clicks outside it. */
  panelRef: React.RefObject<HTMLElement | null>;
  /** Attach to the toggle button — focus returns here on Escape. */
  toggleRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Drives the mobile navigation drawer.
 *
 * The drawer closes on Escape, on a pointer press outside it, and when the
 * viewport grows past the width where the drawer is used at all. That last
 * one is easy to miss: without it, turning a phone to landscape leaves the
 * panel stranded open on top of a nav bar that is already fully visible.
 *
 * Listeners are only bound while the drawer is open, so a closed drawer
 * costs nothing on every keystroke and tap elsewhere on the page.
 *
 * @param desktopQuery - Media query matching the widths where the full nav
 *   is shown and the drawer should therefore close itself.
 * @returns The drawer state, its controls, and the refs it needs.
 */
const useNavMenu = (desktopQuery: string): NavMenu => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((isOpen) => !isOpen), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      // Send focus back to the control that opened the drawer rather than
      // dropping it at the top of the document.
      toggleRef.current?.focus();
    };

    // pointerdown rather than click: closing on press feels immediate, and
    // it fires before the pressed element's own click handler runs.
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (panelRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [desktopQuery]);

  return { open, toggle, close, panelRef, toggleRef };
};

export { useNavMenu };
