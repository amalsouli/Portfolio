// Experience shown as a shelf of books: each role is a chapter that opens in 3D on click.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { experiences, ui, type Lang } from '../data/profile';

const covers = [
  'from-brand-500 via-brand-400 to-lilac-400',
  'from-lilac-500 via-lilac-400 to-brand-300',
  'from-brand-400 via-peach-300 to-peach-200',
  'from-lilac-400 via-brand-300 to-peach-300',
  'from-brand-600 via-brand-400 to-peach-300',
  'from-lilac-500 via-brand-400 to-brand-300',
  'from-peach-300 via-brand-300 to-lilac-400',
];
const marks = ['✿', '♡', '✦', '❀', '☾', '✧', '❁'];

const t = {
  intro: {
    en: 'Every role is a chapter of my story. Pick a book and open it ♡',
    fr: 'Chaque expérience est un chapitre de mon histoire. Choisis un livre et ouvre-le ♡',
  },
  chapter: { en: 'Chapter', fr: 'Chapitre' },
  open: { en: 'Open me', fr: 'Ouvre-moi' },
  story: { en: 'The story', fr: 'L’histoire' },
  tools: { en: 'Tools of this chapter', fr: 'Les outils de ce chapitre' },
  close: { en: 'Close the book', fr: 'Fermer le livre' },
  prev: { en: 'Previous chapter', fr: 'Chapitre précédent' },
  next: { en: 'Next chapter', fr: 'Chapitre suivant' },
};

const total = experiences.length;
// Newest role first on the shelf, but chapters are numbered chronologically.
const chapterOf = (i: number) => total - i;

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;

export default function ExperienceBooks({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const first = useRef(true);

  const openBook = (i: number, el: HTMLElement) => {
    opener.current = el;
    first.current = true;
    setIndex(i);
    setOpen(i);
  };

  const closeBook = () => {
    const done = () => {
      setOpen(null);
      opener.current?.focus();
    };
    if (!tl.current || reduceMotion()) return done();
    tl.current.eventCallback('onReverseComplete', done).timeScale(1.7).reverse();
  };

  // Opening sequence: the book rises, the cover swings open around the spine.
  useLayoutEffect(() => {
    if (open === null || !dialog.current) return;
    const q = gsap.utils.selector(dialog);
    const desktop = isDesktop();
    const ctx = gsap.context(() => {
      gsap.set(q('[data-book]'), { xPercent: desktop ? -25 : 0 });
      const timeline = gsap
        .timeline()
        .from(q('[data-backdrop]'), { autoAlpha: 0, duration: 0.35 })
        .fromTo(
          q('[data-book]'),
          { y: 80, rotateX: 18, scale: 0.8, autoAlpha: 0 },
          { y: 0, rotateX: 0, scale: 1, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.4)' },
          '-=0.1',
        )
        .to(q('[data-cover]'), { rotateY: -180, duration: 1.2, ease: 'power2.inOut' }, '+=0.15')
        .to(q('[data-book]'), { xPercent: 0, duration: 1.2, ease: 'power2.inOut' }, '<');
      if (!desktop) timeline.to(q('[data-cover]'), { autoAlpha: 0, duration: 0.2 }, '-=0.3');
      timeline.from(q('[data-line]'), { autoAlpha: 0, y: 12, stagger: 0.06, duration: 0.45, ease: 'power2.out' }, '-=0.45');
      if (reduceMotion()) timeline.progress(1);
      tl.current = timeline;
    }, dialog);
    closeBtn.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      ctx.revert();
      tl.current = null;
      document.body.style.overflow = '';
    };
  }, [open]);

  // Turning to another chapter while the book is open: the pages flip in from the spine.
  useLayoutEffect(() => {
    if (open === null || first.current || !dialog.current || reduceMotion()) {
      first.current = false;
      return;
    }
    const q = gsap.utils.selector(dialog);
    const ctx = gsap.context(() => {
      gsap.fromTo(q('[data-page]'), { rotateY: -75, autoAlpha: 0 }, { rotateY: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', transformOrigin: 'left center' });
      gsap.fromTo(q('[data-cover-back]'), { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out' });
    }, dialog);
    return () => ctx.revert();
  }, [index, open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBook();
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(total - 1, i + 1));
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const e = experiences[index];
  const chips = (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {e.stack.map((s) => (
        <span key={s} className="chip">{s}</span>
      ))}
    </div>
  );

  return (
    <>
      <p className="muted -mt-4 mb-10 font-script text-2xl">{t.intro[lang]}</p>

      {/* Shelf */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 [perspective:1400px]">
        {experiences.map((x, i) => (
          <div key={x.company + x.period.en} data-reveal>
            <button
              type="button"
              onClick={(ev) => openBook(i, ev.currentTarget)}
              aria-haspopup="dialog"
              aria-label={`${t.chapter[lang]} ${chapterOf(i)} : ${x.role[lang]}, ${x.company}`}
              className="book group relative block aspect-[3/4] w-full text-left focus:outline-none"
            >
              <span className="book-pages" aria-hidden="true" />
              <span
                className={`book-cover absolute inset-0 flex flex-col overflow-hidden rounded-l-md rounded-r-2xl bg-gradient-to-br p-4 pl-6 text-white shadow-xl shadow-brand-300/40 sm:p-5 sm:pl-7 dark:shadow-black/40 ${covers[i % covers.length]}`}
              >
                <span className="absolute inset-y-0 left-0 w-3 bg-black/15" aria-hidden="true" />
                <span className="absolute inset-y-0 left-3 w-px bg-white/40" aria-hidden="true" />
                <span className="absolute -right-6 -top-6 text-8xl text-white/15" aria-hidden="true">{marks[i % marks.length]}</span>
                <span className="font-script text-lg leading-none text-white/90 sm:text-xl">
                  {t.chapter[lang]} {chapterOf(i)}
                </span>
                <span className="mt-2 font-display text-lg font-semibold leading-tight sm:text-xl">{x.role[lang]}</span>
                <span className="mt-1 text-sm italic text-white/85">{x.company}</span>
                <span className="mt-auto text-xs font-semibold uppercase tracking-wider text-white/80">{x.period[lang]}</span>
                <span className="mt-2 inline-flex items-center gap-1 self-start rounded-full bg-white/25 px-2.5 py-1 text-xs font-bold backdrop-blur transition group-hover:bg-white group-hover:text-brand-600">
                  {t.open[lang]} ♡
                </span>
              </span>
              {x.current && (
                <span className="absolute -top-2 right-5 z-10 flex h-12 w-6 items-start justify-center bg-peach-300 pt-1 text-[10px] font-bold text-white shadow-md [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]">
                  ★
                </span>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Open book */}
      {open !== null && (
        <div ref={dialog} role="dialog" aria-modal="true" aria-label={`${t.chapter[lang]} ${chapterOf(index)} : ${e.role[lang]}`} className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
          <div data-backdrop className="absolute inset-0 bg-plum-900/55 backdrop-blur-sm" onClick={closeBook} />
          <div className="relative w-full max-w-5xl [perspective:2400px]">
            <div data-book className="relative grid max-h-[88vh] min-h-[60vh] md:min-h-[480px] md:grid-cols-2 [transform-style:preserve-3d]">
              {/* Left page area: filled by the back of the cover once it swings open */}
              <div className="hidden md:block" />

              {/* Right page: the story */}
              <div data-page className="paper relative flex max-h-[88vh] flex-col overflow-y-auto rounded-2xl p-6 shadow-2xl sm:p-9 md:rounded-l-none md:rounded-r-2xl">
                <span className="absolute inset-y-0 left-0 hidden w-8 bg-gradient-to-r from-black/10 to-transparent md:block" aria-hidden="true" />
                <button
                  ref={closeBtn}
                  type="button"
                  onClick={closeBook}
                  aria-label={t.close[lang]}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-lg text-brand-600 transition hover:rotate-90 hover:bg-brand-100 dark:bg-white/10 dark:text-brand-200"
                >
                  ×
                </button>
                <div className="md:hidden" data-line>
                  <p className="font-script text-xl text-brand-500">
                    {t.chapter[lang]} {chapterOf(index)}
                  </p>
                  <h3 className="heading text-2xl">{e.role[lang]}</h3>
                  <p className="italic text-brand-500">
                    {e.company} · {e.period[lang]}
                  </p>
                </div>
                <p data-line className="mt-4 font-script text-3xl text-brand-500 md:mt-0 dark:text-brand-300">
                  {t.story[lang]}
                </p>
                <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink dark:text-pink-50/85">
                  {e.points[lang].map((p) => (
                    <li key={p} data-line className="flex gap-2.5">
                      <span className="mt-0.5 text-brand-400" aria-hidden="true">♡</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {e.stack.length > 0 && (
                  <div data-line className="mt-6 md:hidden">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">{t.tools[lang]}</p>
                    {chips}
                  </div>
                )}
                <div data-line className="mt-auto flex items-center justify-between gap-3 pt-8 text-sm">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => setIndex(index - 1)}
                    className="rounded-full px-3 py-1.5 font-semibold text-brand-600 transition hover:bg-brand-50 disabled:invisible dark:text-brand-300 dark:hover:bg-white/5"
                  >
                    ← {t.prev[lang]}
                  </button>
                  <span className="font-script text-lg text-ink-soft">— {index * 2 + 2} —</span>
                  <button
                    type="button"
                    disabled={index === total - 1}
                    onClick={() => setIndex(index + 1)}
                    className="rounded-full px-3 py-1.5 font-semibold text-brand-600 transition hover:bg-brand-50 disabled:invisible dark:text-brand-300 dark:hover:bg-white/5"
                  >
                    {t.next[lang]} →
                  </button>
                </div>
              </div>

              {/* Cover: front is the book cover, back becomes the left page */}
              <div data-cover className="absolute inset-y-0 right-0 w-full origin-left [transform-style:preserve-3d] md:w-1/2">
                <div
                  className={`absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br p-8 pl-10 text-white shadow-2xl [backface-visibility:hidden] md:rounded-l-md ${covers[index % covers.length]}`}
                >
                  <span className="absolute inset-y-0 left-0 w-4 bg-black/15" aria-hidden="true" />
                  <span className="absolute -right-10 -top-10 text-[12rem] leading-none text-white/15" aria-hidden="true">{marks[index % marks.length]}</span>
                  <span className="font-script text-3xl">
                    {t.chapter[lang]} {chapterOf(index)}
                  </span>
                  <span className="mt-3 font-display text-4xl font-semibold leading-tight">{e.role[lang]}</span>
                  <span className="mt-2 text-lg italic text-white/85">{e.company}</span>
                  <span className="mt-auto text-sm font-semibold uppercase tracking-wider text-white/80">{e.period[lang]}</span>
                </div>
                <div className="paper absolute inset-0 hidden flex-col overflow-y-auto rounded-l-2xl p-9 [backface-visibility:hidden] [transform:rotateY(180deg)] md:flex">
                  <span className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent" aria-hidden="true" />
                  <div data-cover-back className="flex h-full flex-col">
                    <p className="font-script text-2xl text-brand-500 dark:text-brand-300">
                      {t.chapter[lang]} {chapterOf(index)} {marks[index % marks.length]}
                    </p>
                    <h3 className="heading mt-2 text-3xl leading-tight">{e.role[lang]}</h3>
                    <p className="mt-1 text-lg italic text-brand-500 dark:text-brand-300">@ {e.company}</p>
                    <p className="muted mt-2 text-sm font-semibold uppercase tracking-wider">
                      {e.current && <span className="mr-2 rounded-full bg-gradient-to-r from-brand-400 to-lilac-400 px-2 py-0.5 text-[10px] text-white">{ui.current[lang]}</span>}
                      {e.period[lang]}
                    </p>
                    {e.stack.length > 0 && (
                      <div className="mt-8">
                        <p className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-pink-100/60">{t.tools[lang]}</p>
                        {chips}
                      </div>
                    )}
                    <span className="my-auto select-none self-center py-6 text-8xl text-brand-200 dark:text-brand-400/30" aria-hidden="true">{marks[index % marks.length]}</span>
                    <span className="text-center font-script text-lg text-ink-soft">— {index * 2 + 1} —</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
