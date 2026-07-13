import { animate, stagger } from 'framer-motion/dom';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  const header = document.querySelector('.site-header');
  const image = document.querySelector('.hero > img');
  const heroItems = document.querySelectorAll('.hero-copy > *');
  if (header) animate(header, { opacity: [0, 1], y: [-18, 0] }, { duration: .55, ease: [0.22, 1, 0.36, 1] });
  if (image) animate(image, { opacity: [.35, 1], scale: [1.08, 1] }, { duration: 1.35, ease: [0.22, 1, 0.36, 1] });
  if (heroItems.length) animate(heroItems, { opacity: [0, 1], y: [28, 0] }, { delay: stagger(.085, { startDelay: .22 }), duration: .72, ease: [0.22, 1, 0.36, 1] });
}
