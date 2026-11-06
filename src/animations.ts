// GSAP motion layer for the portfolio.
// Every animation lives in one gsap.matchMedia() context so it is fully reverted when the
// language changes (the page remounts) and skipped entirely for prefers-reduced-motion.
import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

export function useAnimations(root: RefObject<HTMLElement | null>, lang: string) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', fine: '(pointer: fine) and (min-width: 768px)' },
        (ctx) => {
          const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
          if (!motion) return;
          const q = gsap.utils.selector(root);

          // Hero intro
          const first = SplitText.create(q('[data-hero-first]'), { type: 'chars', mask: 'chars' });
          gsap
            .timeline({ defaults: { ease: 'power4.out' } })
            .from(first.chars, { yPercent: 115, rotate: 10, duration: 1.1, stagger: 0.05 })
            .fromTo(
              q('[data-hero-last]'),
              { clipPath: 'inset(0 100% 0 0)', x: -30 },
              { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 1.2, ease: 'expo.out' },
              '-=0.75',
            )
            .from(q('[data-hero-fade]'), { y: 26, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, '-=0.9')
            .from(q('[data-hero-photo]'), { scale: 0.75, rotate: -8, autoAlpha: 0, duration: 1.4, ease: 'elastic.out(1, 0.6)' }, 0.25)
            .from(q('[data-hero-note]'), { autoAlpha: 0, y: 10, duration: 0.5 }, '-=0.6')
            .from(q('[data-draw]'), { drawSVG: 0, duration: 0.7, stagger: 0.2, ease: 'power2.inOut' }, '<');

          gsap.to(q('[data-scroll-dot]'), { y: 24, duration: 1.1, ease: 'power1.inOut', repeat: -1, yoyo: true });

          // Photo drifts up while the hero scrolls away
          gsap.to(q('[data-hero-photo]'), {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: { trigger: q('#top')[0], start: 'top top', end: 'bottom top', scrub: true },
          });

          // Section titles: letters rise out of a mask, then the hand-drawn underline draws itself
          q('[data-split-title]').forEach((title) => {
            const split = SplitText.create(title, { type: 'words,chars', mask: 'chars' });
            const underline = title.nextElementSibling?.querySelector('path');
            const tl = gsap.timeline({ scrollTrigger: { trigger: title, start: 'top 85%' } });
            tl.from(split.chars, { yPercent: 110, duration: 0.8, stagger: 0.025, ease: 'power3.out' });
            if (underline) tl.from(underline, { drawSVG: 0, duration: 0.8, ease: 'power2.inOut' }, '-=0.4');
          });

          // Cards and blocks reveal in staggered batches
          const blocks = q('[data-reveal]');
          gsap.set(blocks, { autoAlpha: 0, y: 48 });
          ScrollTrigger.batch(blocks, {
            start: 'top 88%',
            once: true,
            batchMax: 3,
            onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', overwrite: true }),
          });

          // Reading progress bar
          gsap.to(q('[data-progress]'), { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

          // Skills ribbon leans with scroll speed
          const ribbon = q('[data-ribbon]')[0]?.parentElement;
          if (ribbon) {
            gsap.set(ribbon, { rotate: -1 });
            const skew = gsap.quickTo(ribbon, 'skewX', { duration: 0.5, ease: 'power3' });
            let idle: ReturnType<typeof setTimeout> | undefined;
            ScrollTrigger.create({
              onUpdate: (self) => {
                skew(gsap.utils.clamp(-10, 10, self.getVelocity() / -250));
                clearTimeout(idle);
                idle = setTimeout(() => skew(0), 120);
              },
            });
          }

          if (!fine) return;

          // Desktop pointer effects: custom cursor, magnetic buttons, hero depth parallax
          const cleanups: (() => void)[] = [];
          const on = <K extends keyof WindowEventMap>(target: Window | Element, type: K | string, fn: (e: MouseEvent) => void) => {
            target.addEventListener(type, fn as EventListener);
            cleanups.push(() => target.removeEventListener(type, fn as EventListener));
          };

          const ring = q('[data-cursor]')[0];
          const dot = q('[data-cursor-dot]')[0];
          let shown = false;
          const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
          const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
          const dotX = gsap.quickTo(dot, 'x', { duration: 0.08 });
          const dotY = gsap.quickTo(dot, 'y', { duration: 0.08 });

          const depth = q('[data-depth]').map((el) => ({
            k: Number(el.dataset.depth) * 18,
            x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
            y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
          }));

          on(window, 'mousemove', (e) => {
            if (!shown) {
              // Show the cursor only once we know where the pointer is
              shown = true;
              gsap.set([ring, dot], { x: e.clientX, y: e.clientY });
              gsap.to([ring, dot], { autoAlpha: 1, duration: 0.3 });
            }
            ringX(e.clientX);
            ringY(e.clientY);
            dotX(e.clientX);
            dotY(e.clientY);
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            depth.forEach((d) => {
              d.x(nx * d.k);
              d.y(ny * d.k);
            });
          });
          on(window, 'mouseover', (e) => {
            const hit = (e.target as Element).closest('a, button');
            gsap.to(ring, { scale: hit ? 1.8 : 1, backgroundColor: hit ? 'rgba(249,115,171,0.15)' : 'rgba(0,0,0,0)', duration: 0.3 });
          });

          q('[data-magnetic]').forEach((el) => {
            const mx = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
            const my = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
            on(el, 'mousemove', (e) => {
              const r = el.getBoundingClientRect();
              mx((e.clientX - (r.left + r.width / 2)) * 0.35);
              my((e.clientY - (r.top + r.height / 2)) * 0.35);
            });
            on(el, 'mouseleave', () => {
              gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
            });
          });

          return () => cleanups.forEach((fn) => fn());
        },
      );
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );
}
