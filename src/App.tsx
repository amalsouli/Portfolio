import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile, experiences, projects, skills, education, languages, ui, type Lang, type Project } from './data/profile';
import { GitHubIcon, LinkedInIcon, MailIcon, DownloadIcon, PinIcon, SunIcon, MoonIcon, ArrowIcon } from './components/Icons';
import { useAnimations } from './animations';
import ExperienceBooks from './components/ExperienceBooks';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;
const workProjects = projects.filter((p) => p.work);
const personalProjects = projects.filter((p) => !p.work);
const ribbon = skills.flatMap((g) => g.items);

// Handwritten side notes, purely decorative.
const notes = {
  me: { en: 'that’s me!', fr: 'c’est moi !' },
  open: { en: 'Open to new adventures', fr: 'Ouverte aux nouvelles aventures' },
  say: { en: 'let’s create something lovely', fr: 'créons quelque chose de beau' },
};

function usePersisted<T extends string>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      return (localStorage.getItem(key) as T) || initial;
    } catch {
      return initial;
    }
  });
  const set = (v: T) => {
    setValue(v);
    try {
      localStorage.setItem(key, v);
    } catch {
      /* storage unavailable: keep in memory */
    }
  };
  return [value, set];
}

/** Marks a block for the GSAP scroll reveal (see animations.ts). */
function Reveal({ children }: { children: ReactNode; delay?: number }) {
  return <div data-reveal>{children}</div>;
}

/** Small four-point sparkle used as decoration. */
function Sparkle({ className = '', delay = '0s' }: { className?: string; delay?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`pointer-events-none absolute animate-twinkle ${className}`} style={{ animationDelay: delay }}>
      <path fill="currentColor" d="M12 0c.6 5.8 2.9 8.4 12 12-9.1 3.6-11.4 6.2-12 12-.6-5.8-2.9-8.4-12-12C9.1 8.4 11.4 5.8 12 0z" />
    </svg>
  );
}

function Section({ id, title, kicker, children }: { id: string; title: string; kicker: string; children: ReactNode }) {
  return (
    <section id={id} className="container-x relative py-20 sm:py-24">
      <Reveal>
        <p className="font-script text-2xl text-brand-500 dark:text-brand-300">✿ {kicker}</p>
        <h2 data-split-title className="heading mt-1 text-4xl sm:text-5xl">
          {title}
          <span className="text-brand-400">.</span>
        </h2>
        <svg viewBox="0 0 120 12" className="mt-2 h-3 w-28 text-brand-300 dark:text-brand-400/60" aria-hidden="true">
          <path d="M2 8 C 20 2, 30 12, 50 6 S 80 2, 118 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function TypingRoles({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[index % roles.length];
    const done = !deleting && text === full;
    const empty = deleting && text === '';
    const timeout = setTimeout(
      () => {
        if (done) setDeleting(true);
        else if (empty) {
          setDeleting(false);
          setIndex((i) => i + 1);
        } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      },
      done ? 1600 : deleting ? 30 : 60,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, roles]);

  useEffect(() => {
    setText('');
    setDeleting(false);
    setIndex(0);
  }, [roles]);

  return (
    <span className="font-medium text-brand-600 dark:text-brand-300">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle">&nbsp;</span>
    </span>
  );
}

export default function App() {
  const [lang, setLang] = usePersisted<Lang>('lang', navigator.language?.startsWith('fr') ? 'fr' : 'en');
  const [theme, setTheme] = usePersisted<'light' | 'dark'>(
    'theme',
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  );
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const tags = useMemo(() => Array.from(new Set(personalProjects.flatMap((p) => p.tags))), []);
  const visible = filter === 'all' ? personalProjects : personalProjects.filter((p) => p.tags.includes(filter as Project['tags'][number]));
  const navItems = Object.entries(ui.nav) as [string, Record<Lang, string>][];
  const [first, ...rest] = profile.name.split(' ');
  const root = useRef<HTMLDivElement>(null);
  useAnimations(root, lang);

  return (
    <div ref={root} className="relative overflow-x-hidden">
      {/* Page background */}
      <div className="bg-mesh pointer-events-none fixed inset-0 -z-10" />
      <div className="bg-dots pointer-events-none fixed inset-0 -z-10" />
      {/* Scroll progress and custom cursor (GSAP) */}
      <div data-progress className="fixed inset-x-0 top-0 z-[60] h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-400 via-lilac-400 to-peach-300" />
      <div data-cursor className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-400 opacity-0 mix-blend-multiply dark:mix-blend-screen md:block" />
      <div data-cursor-dot className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500 opacity-0 md:block" />

      {/* Header */}
      <header className="fixed inset-x-0 top-3 z-50 px-3">
        <nav className="container-x flex h-14 items-center justify-between rounded-full border border-brand-100 bg-white/70 shadow-lg shadow-brand-200/30 backdrop-blur-xl dark:border-brand-300/10 dark:bg-plum-800/70 dark:shadow-none">
          <a href="#top" className="font-script text-3xl leading-none text-brand-600 dark:text-brand-300">
            Amal<span className="text-lilac-400">♡</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-soft transition hover:bg-brand-50 hover:text-brand-600 dark:text-pink-100/70 dark:hover:bg-white/5 dark:hover:text-brand-300"
              >
                {label[lang]}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100 dark:bg-white/5 dark:text-brand-200"
              aria-label="Switch language"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full bg-brand-50 p-2 text-brand-700 transition hover:bg-brand-100 dark:bg-white/5 dark:text-brand-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      <main key={lang}>
      {/* Hero */}
      <section id="top" className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div data-depth="-0.6" className="pointer-events-none absolute inset-0">
          <Sparkle className="left-[6%] top-32 h-6 w-6 text-brand-300" />
          <Sparkle className="right-[8%] top-28 h-5 w-5 text-peach-300" delay="2s" />
        </div>
        <div data-depth="0.9" className="pointer-events-none absolute inset-0">
          <Sparkle className="left-[45%] top-24 h-4 w-4 text-lilac-300" delay="1s" />
          <Sparkle className="bottom-10 left-[30%] h-3 w-3 text-brand-400" delay="1.5s" />
        </div>
        <div className="container-x relative grid items-center gap-14 md:grid-cols-[1.35fr_1fr]">
          <div>
            <p data-hero-fade className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3.5 py-1 text-xs font-semibold text-brand-700 shadow-sm dark:border-brand-300/20 dark:bg-white/5 dark:text-brand-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              {experiences[0].role[lang]} · Bassetti Group
            </p>
            <p data-hero-fade className="mt-6 font-script text-3xl text-ink-soft dark:text-pink-100/70">{ui.hello[lang]}</p>
            <h1 className="heading text-6xl leading-[0.95] sm:text-8xl" aria-label={profile.name}>
              <span data-hero-first className="block">{first}</span>
              <span data-hero-last className="gradient-text block pb-2 pr-3 italic">{rest.join(' ')}</span>
            </h1>
            <p data-hero-fade className="mt-6 min-h-[2rem] text-lg sm:text-xl">
              <TypingRoles roles={profile.roles[lang]} />
            </p>
            <p data-hero-fade className="muted mt-5 max-w-xl text-base leading-relaxed">{profile.about[lang][0]}</p>
            <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
              <a data-magnetic className="btn-primary" href={asset(profile.cv[lang])} download>
                <DownloadIcon /> {ui.downloadCv[lang]}
              </a>
              <a data-magnetic className="btn-ghost" href="#contact">
                <MailIcon className="h-4 w-4" /> {ui.contactMe[lang]}
              </a>
            </div>
            <div data-hero-fade className="mt-8 flex items-center gap-3 text-brand-600 dark:text-brand-300">
              {[
                { href: profile.github, label: 'GitHub', icon: <GitHubIcon className="h-5 w-5" /> },
                { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedInIcon className="h-5 w-5" /> },
                { href: `mailto:${profile.email}`, label: 'Email', icon: <MailIcon className="h-5 w-5" /> },
              ].map((s) => (
                <a
                  key={s.label}
                  data-magnetic
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-brand-200/50 dark:bg-white/5 dark:shadow-none"
                >
                  {s.icon}
                </a>
              ))}
              <span className="muted ml-2 inline-flex items-center gap-1 text-sm">
                <PinIcon /> {profile.location[lang]}
              </span>
            </div>
          </div>

          {/* Photo in a morphing blob: intro, scroll parallax and mouse tilt are driven by GSAP */}
          <div data-hero-photo className="relative mx-auto w-64 sm:w-80">
            <div data-depth="0.4" className="relative">
              <div className="absolute -inset-5 animate-morph bg-gradient-to-br from-brand-300 via-lilac-300 to-peach-200 opacity-90 blur-[2px] dark:opacity-60" />
              <div className="absolute -inset-2 animate-morph rounded-full border-2 border-dashed border-brand-300/70 [animation-delay:-4s]" />
              <img
                src={asset('avatar.jpg')}
                alt={profile.name}
                className="relative aspect-square w-full animate-morph border-[6px] border-white object-cover shadow-2xl shadow-brand-300/40 dark:border-plum-800"
              />
            </div>
            <span data-depth="1.4" className="absolute -left-6 top-6 text-3xl" aria-hidden="true">
              <span className="block animate-float">🌸</span>
            </span>
            <span data-depth="-1.2" className="absolute -right-3 bottom-10 text-2xl" aria-hidden="true">
              <span className="block animate-float [animation-delay:-3s]">✨</span>
            </span>
            <div data-hero-note className="absolute -bottom-10 -left-4 flex items-end gap-1 sm:-left-14">
              <svg viewBox="0 0 60 40" className="h-8 w-12 rotate-12 text-brand-400" aria-hidden="true">
                <path data-draw d="M4 34 C 20 30, 40 22, 54 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path data-draw d="M44 6 L 55 5 L 52 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="-rotate-6 font-script text-2xl text-brand-600 dark:text-brand-300">{notes.me[lang]}</span>
            </div>
          </div>
        </div>
        <a href="#about" data-hero-fade className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-400 md:flex" aria-label="Scroll">
          scroll
          <span className="relative h-9 w-[2px] overflow-hidden rounded-full bg-brand-200 dark:bg-white/10">
            <span data-scroll-dot className="absolute inset-x-0 top-0 h-3 rounded-full bg-brand-500" />
          </span>
        </a>
      </section>

      {/* Skills ribbon */}
      <div className="relative -rotate-1 border-y border-brand-200/60 bg-gradient-to-r from-brand-400 via-lilac-400 to-peach-300 py-3 text-white shadow-lg shadow-brand-300/30 dark:border-transparent dark:from-brand-600 dark:via-lilac-500 dark:to-brand-400">
        <div data-ribbon className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-lg italic">
          {[...ribbon, ...ribbon].map((s, i) => (
            <span key={i} className="flex items-center gap-8">
              {s} <span aria-hidden="true">✿</span>
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <Section id="about" kicker="01" title={ui.nav.about[lang]}>
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="card muted relative space-y-4 p-7 text-base leading-relaxed sm:p-9">
              <span className="absolute -top-5 left-8 font-display text-7xl leading-none text-brand-300" aria-hidden="true">“</span>
              {profile.about[lang].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid h-full grid-cols-2 gap-4">
              {[
                { n: `${experiences.length}`, l: { en: 'roles & internships', fr: 'postes & stages' }, c: 'from-brand-100 to-brand-50 -rotate-2' },
                { n: `${projects.length}`, l: { en: 'shipped projects', fr: 'projets réalisés' }, c: 'from-lilac-100 to-white rotate-2' },
                { n: '4', l: { en: 'mobile stacks', fr: 'stacks mobiles' }, c: 'from-peach-100 to-white rotate-1' },
                { n: '3', l: { en: 'languages spoken', fr: 'langues parlées' }, c: 'from-brand-50 to-lilac-100 -rotate-1' },
              ].map((s) => (
                <div
                  key={s.l.en}
                  className={`flex flex-col justify-center rounded-3xl bg-gradient-to-br p-5 text-center shadow-md shadow-brand-200/40 transition hover:rotate-0 hover:scale-105 dark:from-white/5 dark:to-white/[0.02] dark:shadow-none ${s.c}`}
                >
                  <span className="font-display text-4xl font-semibold text-brand-600 dark:text-brand-300">{s.n}</span>
                  <span className="muted mt-1 text-xs font-semibold uppercase tracking-wide">{s.l[lang]}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" kicker="02" title={ui.nav.experience[lang]}>
        <ExperienceBooks lang={lang} />
      </Section>

      {/* Projects */}
      <Section id="projects" kicker="03" title={ui.nav.projects[lang]}>
        <Reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <h3 className="heading flex items-center gap-2 text-2xl">
              <span className="text-brand-400" aria-hidden="true">✦</span>
              {ui.workTitle[lang]}
            </h3>
            <p className="muted max-w-xl text-sm">{ui.workNote[lang]}</p>
          </div>
        </Reveal>
        <div className="mb-20 grid gap-6 md:grid-cols-2">
          {workProjects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <article className="group relative h-full rounded-[1.9rem] bg-gradient-to-br from-brand-300 via-lilac-300 to-peach-200 p-[2px] shadow-xl shadow-brand-200/40 transition duration-300 hover:-translate-y-1.5 hover:rotate-[0.6deg] dark:from-brand-500/60 dark:via-lilac-500/50 dark:to-brand-400/40 dark:shadow-none">
                <div className="flex h-full flex-col rounded-[1.8rem] bg-white p-7 dark:bg-plum-800">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 via-lilac-100 to-peach-100 text-3xl shadow-inner transition group-hover:scale-110 group-hover:-rotate-6 dark:from-white/10 dark:to-white/5">
                      {p.emoji}
                    </span>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-lilac-100 px-2.5 py-0.5 text-xs font-bold text-lilac-500 dark:bg-lilac-400/15 dark:text-lilac-300">{t}</span>
                      ))}
                    </div>
                  </div>
                  <h4 className="heading mt-5 text-2xl">{p.name}</h4>
                  <p className="mt-1 font-script text-xl text-brand-500 dark:text-brand-300">{p.tagline[lang]}</p>
                  <p className="muted mt-3 flex-1 text-sm leading-relaxed">{p.description[lang]}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <h3 className="heading mb-4 flex items-center gap-2 text-2xl">
          <span className="text-lilac-400" aria-hidden="true">✦</span>
          {ui.personalTitle[lang]}
        </h3>
        <div className="mb-8 flex flex-wrap gap-2">
          {['all', ...tags].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                filter === t
                  ? 'bg-gradient-to-r from-brand-500 to-lilac-400 text-white shadow-md shadow-brand-300/50'
                  : 'border-2 border-brand-100 bg-white/70 text-ink-soft hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-transparent dark:text-pink-100/70'
              }`}
            >
              {t === 'all' ? ui.all[lang] : t}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                layout
                key={p.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`card group flex flex-col p-6 transition duration-300 hover:-translate-y-1.5 hover:border-brand-300 ${i % 2 ? 'hover:rotate-1' : 'hover:-rotate-1'}`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-lilac-100 text-2xl transition group-hover:scale-110 dark:from-brand-500/20 dark:to-lilac-500/20">
                    {p.emoji}
                  </span>
                  <span className="rounded-full bg-peach-100 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-white/5 dark:text-pink-100/70">{p.year}</span>
                </div>
                <h3 className="heading mt-4 text-xl">
                  {p.name}
                  {p.featured && <span className="ml-2 align-middle text-sm text-brand-400">★</span>}
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-500 dark:text-brand-300">{p.tagline[lang]}</p>
                <p className="muted mt-3 flex-1 text-sm leading-relaxed">{p.description[lang]}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
                {p.links && (
                  <div className="mt-4 flex gap-4 border-t border-dashed border-brand-200 pt-4 dark:border-white/10">
                    {p.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-lilac-500 dark:text-brand-300">
                        <GitHubIcon className="h-4 w-4" /> {l.label} <ArrowIcon className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* Skills, education, languages */}
      <Section id="skills" kicker="04" title={ui.nav.skills[lang]}>
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((g, i) => (
            <Reveal key={g.group.en} delay={i * 0.05}>
              <div className="card h-full p-6 sm:p-7">
                <h3 className="heading text-xl">{g.group[lang]}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s, j) => (
                    <span
                      key={s}
                      className={`rounded-full px-3.5 py-1 text-sm font-medium transition hover:-translate-y-0.5 ${
                        ['bg-brand-50 text-brand-700', 'bg-lilac-100 text-lilac-500', 'bg-peach-100 text-brand-700'][j % 3]
                      } dark:bg-white/5 dark:text-pink-100/80`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-6 sm:p-7">
              <h3 className="heading text-xl">🎓 {ui.education[lang]}</h3>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.period} className="rounded-2xl bg-brand-50/60 p-4 dark:bg-white/5">
                    <p className="font-semibold text-ink dark:text-white">{e.degree[lang]}</p>
                    <p className="muted text-sm">
                      {e.school} · {e.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="card h-full p-6 sm:p-7">
              <h3 className="heading text-xl">🌍 {ui.languages[lang]}</h3>
              <ul className="mt-4 space-y-5">
                {languages.map((l) => (
                  <li key={l.name.en}>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-ink dark:text-white">{l.name[lang]}</span>
                      <span className="font-script text-lg leading-none text-brand-500 dark:text-brand-300">{l.level[lang]}</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-brand-100 dark:bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-brand-400 via-lilac-400 to-peach-300"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1 }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" kicker="05" title={ui.nav.contact[lang]}>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-400 via-lilac-400 to-peach-300 p-8 text-center text-white shadow-2xl shadow-brand-300/40 sm:p-14 dark:from-brand-600 dark:via-lilac-500 dark:to-brand-500 dark:shadow-none">
            <Sparkle className="left-8 top-8 h-6 w-6 text-white/80" />
            <Sparkle className="bottom-10 right-10 h-8 w-8 text-white/70" delay="1.2s" />
            <Sparkle className="right-1/4 top-6 h-4 w-4 text-white/60" delay="2s" />
            <p className="font-script text-3xl">{notes.say[lang]} ♡</p>
            <p className="relative mx-auto mt-3 max-w-xl text-lg text-white/90">{ui.contactText[lang]}</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <a data-magnetic className="btn bg-white text-brand-600 shadow-lg" href={`mailto:${profile.email}`}>
                <MailIcon className="h-4 w-4" /> {profile.email}
              </a>
              <a data-magnetic className="btn border-2 border-white/70 text-white hover:bg-white/10" href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </a>
              <a data-magnetic className="btn border-2 border-white/70 text-white hover:bg-white/10" href={profile.github} target="_blank" rel="noreferrer">
                <GitHubIcon className="h-4 w-4" /> GitHub
              </a>
            </div>
            <div className="relative mt-6 flex flex-wrap justify-center gap-5 text-sm">
              <a className="inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline" href={asset(profile.cv.en)} download>
                <DownloadIcon /> CV English
              </a>
              <a className="inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline" href={asset(profile.cv.fr)} download>
                <DownloadIcon /> CV Français
              </a>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">✦ {notes.open[lang]} ✦</p>
          </div>
        </Reveal>
      </Section>

      <footer className="py-10 text-center text-sm">
        <p className="font-script text-2xl text-brand-500 dark:text-brand-300">made with ♡ by {profile.name}</p>
        <p className="muted mt-1">
          © {new Date().getFullYear()} · {ui.footer[lang]}
        </p>
      </footer>
      </main>
    </div>
  );
}
