const easeInOutCubic = (progress) => {
  return progress < 0.5
    ? 4 * progress ** 3
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
};

export function smoothScrollToId(id, duration = 1800) {
  const targetId = id.replace('#', '');
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

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
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = 'auto';

  const frame = (currentTime) => {
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
