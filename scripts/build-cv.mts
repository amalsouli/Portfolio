// Generates an international, ATS-friendly CV (EN + FR) from src/data/profile.ts
// and prints it to PDF with a headless Chromium browser (Edge or Chrome).
// Format rules: single column, real selectable text, standard section headings,
// reverse-chronological order, no photo / age / icons / skill bars, A4.
// Usage: npm run cv
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { profile, experiences, projects, skills, education, languages, type Lang } from '../src/data/profile.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/cv');
const tmpDir = resolve(root, 'cv/.out');
mkdirSync(outDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const t = {
  summary: { en: 'Professional Summary', fr: 'Profil professionnel' },
  skills: { en: 'Technical Skills', fr: 'Compétences techniques' },
  experience: { en: 'Professional Experience', fr: 'Expérience professionnelle' },
  projects: { en: 'Academic Projects', fr: 'Projets académiques' },
  education: { en: 'Education', fr: 'Formation' },
  languages: { en: 'Languages', fr: 'Langues' },
  pitch: {
    en: 'Full-stack Software Engineer who designs and delivers enterprise, web and mobile applications, from front-end (Angular, TypeScript, JavaScript) to back-end (C# / .NET, Python). At Bassetti Group, I build AI features and integrations between enterprise systems. Earlier experience in mobile development with Flutter and .NET MAUI.',
    fr: 'Ingénieure logiciel full-stack, je conçois et livre des applications d’entreprise, web et mobiles, du front-end (Angular, TypeScript, JavaScript) au back-end (C# / .NET, Python). Chez Bassetti Group, je développe des fonctionnalités d’IA et des intégrations entre systèmes d’entreprise. Expérience antérieure en développement mobile avec Flutter et .NET MAUI.',
  },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const host = (u: string) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const portfolio = 'https://amalsouli.github.io/Portfolio/';
// Profile photo embedded as a data URI so the PDF is self-contained.
const photo = `data:image/jpeg;base64,${readFileSync(resolve(root, 'public/avatar.jpg')).toString('base64')}`;

function html(lang: Lang): string {
  // Multi-bullet roles get a full block; single-bullet roles (internships, student job) a compact one.
  const main = experiences.filter((e) => e.points[lang].length > 1);
  // Non-technical student job is kept on the portfolio only, to fit one page.
  const compact = experiences.filter((e) => e.points[lang].length === 1 && e.stack.length > 0);
  // Hotix Guest is already covered by the PFE internship.
  const academic = projects.filter((p) => !p.work && ['Brainiacs', 'Ecocircuit', 'QuickShip'].includes(p.name));

  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<title>Amal Souli - ${lang === 'fr' ? 'CV' : 'Resume'}</title>
<meta name="author" content="Amal Souli">
<style>
@page { size: A4; margin: 9mm 13mm 7mm; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Calibri, Carlito, 'Segoe UI', Arial, sans-serif; font-size: 9.5pt; line-height: 1.25; color: #111; }
a { color: inherit; text-decoration: none; }
header { display: flex; align-items: center; gap: 5mm; padding-bottom: 2mm; border-bottom: 1.2pt solid #1f3a5f; }
header img { width: 23mm; height: 23mm; border-radius: 50%; object-fit: cover; border: 1pt solid #1f3a5f; flex: none; }
header .id { flex: 1; }
p.langs { margin-top: .3mm; }
h1 { font-size: 19pt; letter-spacing: .04em; color: #1f3a5f; font-weight: 700; }
.headline { font-size: 11pt; font-weight: 600; margin-top: .6mm; }
.contact { font-size: 9.2pt; margin-top: .6mm; color: #222; }
.contact span + span::before { content: '  |  '; color: #888; white-space: pre; }
h2 { font-size: 10.6pt; text-transform: uppercase; letter-spacing: .08em; color: #1f3a5f; border-bottom: .6pt solid #9aa9bd; padding-bottom: .5mm; margin: 2.2mm 0 1mm; }
p.summary { text-align: justify; }
table.skills { border-collapse: collapse; width: 100%; }
table.skills td { padding: .25mm 0; vertical-align: top; }
table.skills td:first-child { width: 43mm; font-weight: 700; }
.job { margin-bottom: 1.3mm; page-break-inside: avoid; }
.row { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
.row .what { font-weight: 700; }
.row .what em { font-style: normal; font-weight: 400; }
.row .when { white-space: nowrap; font-size: 9.6pt; }
ul { margin: .7mm 0 0 4.6mm; }
li { margin-bottom: .2mm; padding-left: .5mm; }
.tech { font-size: 9.2pt; color: #333; margin-top: .5mm; }
.tech b { font-weight: 700; }
.compact li { margin-bottom: .3mm; }
.job.small { margin-bottom: 1.1mm; }
</style></head><body>
<header>
  <img src="${photo}" alt="Amal Souli">
  <div class="id">
  <h1>AMAL SOULI</h1>
  <div class="headline">${esc(profile.title[lang])} | C# / .NET · JavaScript / TypeScript · Angular · Python · Flutter</div>
  <div class="contact">
    <span>${esc(profile.location[lang])}</span><span><a href="mailto:${profile.email}">${profile.email}</a></span></div>
  <div class="contact"><span><a href="${profile.linkedin}">${host(profile.linkedin)}</a></span><span><a href="${profile.github}">${host(profile.github)}</a></span><span><a href="${portfolio}">${host(portfolio)}</a></span>
  </div>
  </div>
</header>

<h2>${t.summary[lang]}</h2>
<p class="summary">${esc(t.pitch[lang])}</p>

<h2>${t.skills[lang]}</h2>
<table class="skills">${skills.map((g) => `<tr><td>${esc(g.group[lang])}</td><td>${g.items.map(esc).join(', ')}</td></tr>`).join('')}</table>

<h2>${t.experience[lang]}</h2>
${main
  .map(
    (e) => `<div class="job"><div class="row"><span class="what">${esc(e.role[lang])} <em>— ${esc(e.company)}</em></span><span class="when">${esc(e.period[lang])}</span></div>
<ul>${e.points[lang].map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
<div class="tech"><b>${lang === 'fr' ? 'Environnement' : 'Tech'} :</b> ${e.stack.map(esc).join(', ')}</div></div>`,
  )
  .join('')}
${compact
  .map(
    (e) => `<div class="job small"><div class="row"><span class="what">${esc(e.role[lang])} <em>— ${esc(e.company)}</em></span><span class="when">${esc(e.period[lang])}</span></div>
<div>${esc(e.points[lang][0])}${e.stack.length ? ` <i>(${e.stack.map(esc).join(', ')})</i>` : ''}</div></div>`,
  )
  .join('')}

<h2>${t.projects[lang]}</h2>
<ul class="compact">${academic
  .map((p) => `<li><b>${esc(p.name)}</b> (${p.year}) — ${esc(p.tagline[lang])}. <i>${p.stack.map(esc).join(', ')}.</i></li>`)
  .join('')}</ul>

<h2>${t.education[lang]}</h2>
${education
  .map((e) => `<div class="row"><span class="what">${esc(e.degree[lang])} <em>— ${esc(e.school)}</em></span><span class="when">${e.period}</span></div>`)
  .join('')}

<h2>${t.languages[lang]}</h2>
<p class="langs">${languages.map((l) => `<b>${esc(l.name[lang])}</b>: ${esc(l.level[lang])}`).join('  ·  ')}</p>
</body></html>`;
}

const browsers = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const browser = browsers.find((b) => existsSync(b));
if (!browser) throw new Error('No Chromium browser found to print the CV.');

for (const lang of ['en', 'fr'] as Lang[]) {
  const htmlPath = resolve(tmpDir, `cv-${lang}.html`);
  writeFileSync(htmlPath, html(lang), 'utf8');
  const pdf = resolve(outDir, `Amal-Souli-CV-${lang.toUpperCase()}.pdf`);
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--user-data-dir=${resolve(tmpDir, 'profile')}`,
    `--print-to-pdf=${pdf}`,
    pathToFileURL(htmlPath).href,
  ]);
  console.log('CV written:', pdf);
}
