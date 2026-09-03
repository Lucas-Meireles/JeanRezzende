const easeInOutCubic = (progress) => {
  return progress < 0.5
    ? 4 * progress ** 3
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
};

// Tracks the currently running scroll animation so a new click can cancel
// it cleanly instead of fighting the previous frame loop (that fight is
// what used to look like an instant "teleport" when links were clicked
// in quick succession).
let activeScrollToken = 0;

export function smoothScrollToId(id, duration = 1400) {
  const targetId = id.replace('#', '');
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  const token = ++activeScrollToken;
  const root = document.documentElement;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
    window.history.replaceState(null, '', `#${targetId}`);
    return;
  }

  const header = document.querySelector('.public-header');
  const offset = header
    ? header.getBoundingClientRect().height + 18
    : 18;
  const start = window.scrollY;
  const destination = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - offset,
  );
  const distance = destination - start;
  const startTime = performance.now();
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = 'auto';

  const frame = (currentTime) => {
    // A newer scroll request took over — stop this loop immediately so
    // the two animations never fight over window.scrollTo at once.
    if (token !== activeScrollToken) {
      return;
    }

    const progress = Math.min(
      (currentTime - startTime) / duration,
      1,
    );
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(frame);
      return;
    }

    root.style.scrollBehavior = previousScrollBehavior;
  };

  requestAnimationFrame(frame);
  window.history.replaceState(null, '', `#${targetId}`);
}
