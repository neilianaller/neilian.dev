import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveals() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Reveal section headers
  const headers = document.querySelectorAll<HTMLElement>('.reveal-header');
  headers.forEach((header) => {
    gsap.fromTo(
      header,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Reveal grids and card lists with stagger
  const gridContainers = document.querySelectorAll<HTMLElement>('.reveal-grid');
  gridContainers.forEach((grid) => {
    const cards = grid.querySelectorAll<HTMLElement>('.reveal-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  });

  // Services line-by-line reveal
  const servicesList = document.querySelector<HTMLElement>('#services-list');
  if (servicesList) {
    const serviceItems = servicesList.querySelectorAll<HTMLElement>('li');
    gsap.fromTo(
      serviceItems,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: servicesList,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }
}
