export interface TypingOptions {
  element: HTMLElement;
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  pauseTime?: number;
}

export function initHeroTyping(options: TypingOptions): () => void {
  const {
    element,
    words,
    typeSpeed = 80,
    deleteSpeed = 45,
    holdTime = 1500,
    pauseTime = 300,
  } = options;

  if (!element || words.length === 0) return () => {};

  // Check prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    element.textContent = words[0];
    return () => {};
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let isPaused = false;

  const handleVisibilityChange = () => {
    isPaused = document.hidden;
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  function tick() {
    if (isPaused) {
      timerId = setTimeout(tick, 100);
      return;
    }

    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      element.textContent = currentWord.substring(0, charIndex);

      if (charIndex <= 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timerId = setTimeout(tick, pauseTime);
        return;
      }

      timerId = setTimeout(tick, deleteSpeed);
    } else {
      charIndex++;
      element.textContent = currentWord.substring(0, charIndex);

      if (charIndex >= currentWord.length) {
        isDeleting = true;
        timerId = setTimeout(tick, holdTime);
        return;
      }

      timerId = setTimeout(tick, typeSpeed);
    }
  }

  // Start typing
  tick();

  return () => {
    if (timerId) clearTimeout(timerId);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}
