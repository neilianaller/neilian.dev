export function initCounters() {
  const elements = document.querySelectorAll<HTMLElement>('[data-counter-target]');
  if (!elements.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const targetValue = parseInt(el.getAttribute('data-counter-target') || '0', 10);
          obs.unobserve(el);

          if (prefersReduced || targetValue === 0) {
            el.textContent = targetValue.toLocaleString();
            return;
          }

          const duration = 1600; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * targetValue);

            el.textContent = current.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = targetValue.toLocaleString();
            }
          };

          requestAnimationFrame(animate);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  elements.forEach((el) => observer.observe(el));
}
