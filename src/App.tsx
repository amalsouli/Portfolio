import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile, experiences, projects, skills, education, languages, ui, type Lang, type Project } from './data/profile';
import { GitHubIcon, LinkedInIcon, MailIcon, DownloadIcon, PinIcon, SunIcon, MoonIcon, ArrowIcon } from './components/Icons';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;
const workProjects = projects.filter((p) => p.work);
const personalProjects = projects.filter((p) => !p.work);

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

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function Section({ id, title, kicker, children }: { id: string; title: string; kicker: string; children: ReactNode }) {
  return (
    <section id={id} className="container-x py-20 sm:py-24">
      <Reveal>
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">{kicker}</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
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
    <span className="font-mono text-brand-600 dark:text-brand-400">
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

  return (
    <div className="relative overflow-x-hidden">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-slate-50/75 backdrop-blur-lg dark:border-white/5 dark:bg-[#0b0b14]/70">
        <nav className="container-x flex h-16 items-center justify-between">
          <a href="#top" className="font-display text-lg font-bold">
            <span className="gradient-text">amal</span>
            <span className="text-slate-400">.souli</span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="text-sm font-medium text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
                {label[lang]}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-bold dark:border-white/15"
              aria-label="Switch language"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg border border-slate-300 p-1.5 dark:border-white/15"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="blob pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-500" />
        <div className="blob pointer-events-none absolute top-40 -right-20 h-72 w-72 rounded-full bg-pink-500" />
        <div className="container-x relative grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {profile.title[lang]} · Bassetti Group
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 sm:text-6xl dark:text-white">
              {ui.hello[lang]} <span className="gradient-text">{profile.name}</span>
            </h1>
            <p className="mt-4 h-8 text-lg sm:text-xl">
              <TypingRoles roles={profile.roles[lang]} />
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">{profile.about[lang][0]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn-primary" href={asset(profile.cv[lang])} download>
                <DownloadIcon /> {ui.downloadCv[lang]}
              </a>
              <a className="btn-ghost" href="#contact">
                <MailIcon className="h-4 w-4" /> {ui.contactMe[lang]}
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-brand-600">
                <GitHubIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-brand-600">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-brand-600">
                <MailIcon />
              </a>
              <span className="inline-flex items-center gap-1 text-sm">
                <PinIcon /> {profile.location[lang]}
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-56 sm:w-72"
          >
            <div className="absolute -inset-3 animate-[spin_12s_linear_infinite] rounded-full bg-gradient-to-tr from-brand-600 via-fuchsia-500 to-pink-400 opacity-80" />
            <img
              src={asset('avatar.jpg')}
              alt={profile.name}
              className="relative aspect-square w-full rounded-full border-4 border-slate-50 object-cover dark:border-[#0b0b14]"
            />
          </motion.div>
        </div>
      </section>

      {/* About */}
      <Section id="about" kicker="01" title={ui.nav.about[lang]}>
        <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="card space-y-4 p-6 text-base leading-relaxed text-slate-600 sm:p-8 dark:text-slate-300">
              {profile.about[lang].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid h-full grid-cols-2 gap-4">
              {[
                { n: `${experiences.length}`, l: { en: 'roles & internships', fr: 'postes & stages' } },
                { n: `${projects.length}`, l: { en: 'shipped projects', fr: 'projets réalisés' } },
                { n: '4', l: { en: 'mobile stacks', fr: 'stacks mobiles' } },
                { n: '3', l: { en: 'languages spoken', fr: 'langues parlées' } },
              ].map((s) => (
                <div key={s.n + s.l.en} className="card flex flex-col justify-center p-5 text-center">
                  <span className="font-display text-3xl font-bold gradient-text">{s.n}</span>
                  <span className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{s.l[lang]}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" kicker="02" title={ui.nav.experience[lang]}>
        <ol className="relative space-y-8 border-l-2 border-brand-200 pl-6 sm:pl-8 dark:border-brand-500/20">
          {experiences.map((e, i) => (
            <li key={e.company + e.period.en} className="relative">
              <span
                className={`absolute -left-[33px] top-6 h-4 w-4 rounded-full border-4 border-slate-50 sm:-left-[41px] dark:border-[#0b0b14] ${
                  e.current ? 'bg-emerald-500' : 'bg-brand-500'
                }`}
              />
              <Reveal delay={Math.min(i * 0.05, 0.2)}>
                <div className="card p-5 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {e.role[lang]} <span className="text-brand-600 dark:text-brand-400">@ {e.company}</span>
                    </h3>
                    <span className="text-sm font-medium text-slate-500">
                      {e.current && <span className="mr-2 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">{ui.current[lang]}</span>}
                      {e.period[lang]}
                    </span>
                  </div>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {e.points[lang].map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  {e.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {e.stack.map((s) => (
                        <span key={s} className="chip">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Projects */}
      <Section id="projects" kicker="03" title={ui.nav.projects[lang]}>
        <Reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900 dark:text-white">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
              {ui.workTitle[lang]}
            </h3>
            <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">{ui.workNote[lang]}</p>
          </div>
        </Reveal>
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {workProjects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <article className="group relative h-full rounded-2xl bg-gradient-to-br from-brand-500 via-fuchsia-500 to-pink-500 p-[1.5px] shadow-lg shadow-brand-600/10 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-600/20">
                <div className="flex h-full flex-col rounded-[15px] bg-white p-6 dark:bg-[#12121f]">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-pink-500 text-2xl shadow-md">{p.emoji}</span>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">{t}</span>
                      ))}
                    </div>
                  </div>
                  <h4 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">{p.name}</h4>
                  <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">{p.tagline[lang]}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{p.description[lang]}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <h3 className="mb-4 font-display text-xl font-bold text-slate-900 dark:text-white">{ui.personalTitle[lang]}</h3>
        <div className="mb-8 flex flex-wrap gap-2">
          {['all', ...tags].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                filter === t
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'border border-slate-300 text-slate-600 hover:border-brand-400 dark:border-white/15 dark:text-slate-300'
              }`}
            >
              {t === 'all' ? ui.all[lang] : t}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                layout
                key={p.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="card group flex flex-col p-6 transition hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-xl hover:shadow-brand-600/10"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-pink-100 text-2xl dark:from-brand-500/20 dark:to-pink-500/20">
                    {p.emoji}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{p.year}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">
                  {p.name}
                  {p.featured && <span className="ml-2 align-middle text-xs text-amber-500">★</span>}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">{p.tagline[lang]}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.description[lang]}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
                {p.links && (
                  <div className="mt-4 flex gap-4 border-t border-slate-200 pt-4 dark:border-white/10">
                    {p.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-brand-600 dark:text-slate-200">
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
              <div className="card h-full p-6">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{g.group[lang]}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 dark:border-brand-400/20 dark:bg-brand-500/10 dark:text-brand-300">
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
            <div className="card h-full p-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">🎓 {ui.education[lang]}</h3>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.period}>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{e.degree[lang]}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {e.school} · {e.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="card h-full p-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">🌍 {ui.languages[lang]}</h3>
              <ul className="mt-4 space-y-4">
                {languages.map((l) => (
                  <li key={l.name.en}>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{l.name[lang]}</span>
                      <span className="text-slate-500">{l.level[lang]}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-brand-600 to-pink-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
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
          <div className="card relative overflow-hidden p-8 text-center sm:p-12">
            <div className="blob pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500" />
            <p className="relative mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-300">{ui.contactText[lang]}</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <a className="btn-primary" href={`mailto:${profile.email}`}>
                <MailIcon className="h-4 w-4" /> {profile.email}
              </a>
              <a className="btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </a>
              <a className="btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
                <GitHubIcon className="h-4 w-4" /> GitHub
              </a>
            </div>
            <div className="relative mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <a className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline dark:text-brand-400" href={asset(profile.cv.en)} download>
                <DownloadIcon /> CV English
              </a>
              <a className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline dark:text-brand-400" href={asset(profile.cv.fr)} download>
                <DownloadIcon /> CV Français
              </a>
            </div>
          </div>
        </Reveal>
      </Section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-white/5">
        © {new Date().getFullYear()} {profile.name} · {ui.footer[lang]}
      </footer>
    </div>
  );
}
