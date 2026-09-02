/**
 * Navigates to an internal route without a full page load.
 *
 * `pushState` deliberately does not fire `popstate`, so the event is
 * dispatched by hand to wake the route hook. That keeps a single listener in
 * `useHashRoute` responsible for resolving the location, whether the change
 * came from a link, the back button, or a legacy hash change.
 *
 * @param to - The target route, e.g. '/product/gitall'.
 */
const navigate = (to: string): void => {
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (to === current) return;

  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export { navigate };
