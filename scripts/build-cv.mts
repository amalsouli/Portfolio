// Generates the one-page CV (EN + FR) from src/data/profile.ts and prints it to PDF
// with a headless Chromium browser (Edge or Chrome).
// Usage: node scripts/build-cv.mts
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

const avatar = `data:image/jpeg;base64,${readFileSync(resolve(root, 'cv/avatar.jpg')).toString('base64')}`;
const portfolio = 'https://amalsouli.github.io/Portfolio/';

const t = {
  summary: { en: 'Profile', fr: 'Profil' },
  experience: { en: 'Experience', fr: 'Expérience' },
  projects: { en: 'Selected projects', fr: 'Projets sélectionnés' },
  skills: { en: 'Skills', fr: 'Compétences' },
  education: { en: 'Education', fr: 'Formation' },
  languages: { en: 'Languages', fr: 'Langues' },
  contact: { en: 'Contact', fr: 'Contact' },
  earlier: { en: 'Earlier', fr: 'Auparavant' },
  pitch: {
    en: 'Software engineer building enterprise, web and mobile applications end to end. Hands-on with C# / .NET, Angular, Python (FastAPI) and Flutter / .NET MAUI, from REST APIs and data models to polished cross-platform UIs. Comfortable in multi-team delivery: migrations, regression testing, customer releases and AI-assisted development.',
    fr: 'Ingénieure logiciel qui conçoit des applications d’entreprise, web et mobiles de bout en bout. Pratique de C# / .NET, Angular, Python (FastAPI) et Flutter / .NET MAUI, des API REST et modèles de données jusqu’aux interfaces cross-platform soignées. À l’aise en livraison multi-équipes : migrations, tests de non-régression, livraisons clients et développement assisté par l’IA.',
  },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(lang: Lang): string {
  const detailed = experiences.slice(0, 3);
  const earlier = experiences.slice(3);
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${profile.name} — CV</title>
<style>
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 9pt; line-height: 1.42; color: #1f2937; width: 210mm; height: 297mm; display: grid; grid-template-columns: 64mm 1fr; }
aside { background: linear-gradient(180deg, #2e1065 0%, #4c1d95 55%, #6d28d9 100%); color: #ede9fe; padding: 11mm 7mm 9mm; }
main { padding: 10mm 9mm 8mm 8mm; }
.photo { width: 34mm; height: 34mm; border-radius: 50%; border: 2.5px solid #f0abfc; display: block; margin: 0 auto 4mm; object-fit: cover; }
aside h2 { font-size: 8.4pt; letter-spacing: .14em; text-transform: uppercase; color: #f0abfc; margin: 5.5mm 0 2mm; padding-bottom: 1mm; border-bottom: 1px solid rgba(240,171,252,.35); }
aside a, aside p { color: #ede9fe; text-decoration: none; word-break: break-word; }
.ci { margin-bottom: 1.3mm; font-size: 8pt; }
.ci b { display: block; font-size: 6.8pt; letter-spacing: .08em; text-transform: uppercase; color: #c4b5fd; font-weight: 600; }
.sg { margin-bottom: 2.2mm; }
.sg b { display: block; font-size: 7.6pt; color: #fff; margin-bottom: .6mm; }
.sg span { display: inline-block; background: rgba(255,255,255,.12); border-radius: 3px; padding: .25mm 1.4mm; margin: 0 .8mm .9mm 0; font-size: 7.3pt; }
.lang { display: flex; justify-content: space-between; font-size: 8pt; margin-bottom: .6mm; }
.bar { height: 1.3mm; background: rgba(255,255,255,.15); border-radius: 1mm; margin-bottom: 1.8mm; }
.bar i { display: block; height: 100%; border-radius: 1mm; background: linear-gradient(90deg, #f0abfc, #f9a8d4); }
.edu { margin-bottom: 2mm; font-size: 8pt; }
.edu b { color: #fff; display: block; }
h1 { font-size: 24pt; line-height: 1.05; color: #1e1b4b; letter-spacing: -.01em; }
h1 span { color: #7c3aed; }
.role { font-size: 11pt; font-weight: 600; color: #7c3aed; margin-top: 1mm; }
.links { margin-top: 1.5mm; font-size: 7.8pt; color: #6b7280; }
.links a { color: #4c1d95; text-decoration: none; font-weight: 600; }
main h2 { font-size: 9.6pt; letter-spacing: .12em; text-transform: uppercase; color: #4c1d95; margin: 4.2mm 0 2mm; display: flex; align-items: center; gap: 2mm; }
main h2::after { content: ''; flex: 1; height: 1.5px; background: linear-gradient(90deg, #c4b5fd, transparent); }
.pitch { font-size: 9.1pt; color: #374151; }
.job { margin-bottom: 2.6mm; }
.jh { display: flex; justify-content: space-between; align-items: baseline; gap: 2mm; }
.jh b { font-size: 9.4pt; color: #111827; }
.jh b em { font-style: normal; color: #7c3aed; }
.jh span { font-size: 7.6pt; color: #6b7280; white-space: nowrap; }
.job ul { margin: .8mm 0 0 4mm; }
.job li { margin-bottom: .35mm; }
.tech { font-size: 7.4pt; color: #6d28d9; margin-top: .6mm; }
.early { font-size: 8.4pt; margin-bottom: 1.3mm; }
.early b { color: #111827; }
.early span { color: #6b7280; }
.proj { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2.2mm; }
.pc { border: 1px solid #ddd6fe; border-radius: 2mm; padding: 2mm; background: #faf5ff; }
.pc b { font-size: 8.8pt; color: #111827; display: block; }
.pc p { font-size: 8pt; margin-top: .6mm; color: #374151; }
.pc .tech { margin-top: 1mm; }
.more { font-size: 7.8pt; margin-top: 2mm; color: #374151; }
.more b { color: #111827; }
</style></head><body>
<aside>
  <img class="photo" src="${avatar}" alt="${profile.name}">
  <h2>${t.contact[lang]}</h2>
  <div class="ci"><b>E-mail</b><a href="mailto:${profile.email}">${profile.email}</a></div>
  <div class="ci"><b>Portfolio</b><a href="${portfolio}">amalsouli.github.io/Portfolio</a></div>
  <div class="ci"><b>LinkedIn</b><a href="${profile.linkedin}">linkedin.com/in/amalsouli</a></div>
  <div class="ci"><b>GitHub</b><a href="${profile.github}">github.com/amalsouli</a></div>
  <div class="ci"><b>${lang === 'fr' ? 'Localisation' : 'Location'}</b>${esc(profile.location[lang])}</div>
  <h2>${t.skills[lang]}</h2>
  ${skills.map((g) => `<div class="sg"><b>${esc(g.group[lang])}</b>${g.items.map((i) => `<span>${esc(i)}</span>`).join('')}</div>`).join('')}
  <h2>${t.education[lang]}</h2>
  ${education.map((e) => `<div class="edu"><b>${esc(e.degree[lang])}</b>${esc(e.school.split(' — ')[0])} · ${e.period}</div>`).join('')}
  <h2>${t.languages[lang]}</h2>
  ${languages.map((l) => `<div class="lang"><span>${esc(l.name[lang])}</span><span>${esc(l.level[lang])}</span></div><div class="bar"><i style="width:${l.value}%"></i></div>`).join('')}
</aside>
<main>
  <h1>Amal <span>SOULI</span></h1>
  <div class="role">${esc(profile.title[lang])} · .NET · Angular · Flutter · Python</div>
  <h2>${t.summary[lang]}</h2>
  <p class="pitch">${esc(t.pitch[lang])}</p>
  <h2>${t.experience[lang]}</h2>
  ${detailed
    .map(
      (e) => `<div class="job"><div class="jh"><b>${esc(e.role[lang])} <em>· ${esc(e.company)}</em></b><span>${esc(e.period[lang])}</span></div>
  <ul>${e.points[lang].map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
  <div class="tech">${e.stack.map(esc).join(' · ')}</div></div>`,
    )
    .join('')}
  ${earlier
    .map(
      (e) => `<div class="early"><b>${esc(e.role[lang])} · ${esc(e.company)}</b> <span>(${esc(e.period[lang])})</span> — ${esc(e.points[lang][0])}${
        e.stack.length ? ` <span>[${e.stack.map(esc).join(', ')}]</span>` : ''
      }</div>`,
    )
    .join('')}
  <h2>${t.projects[lang]}</h2>
  <div class="proj">${featured
    .map((p) => `<div class="pc"><b>${p.emoji} ${esc(p.name)} <span style="font-weight:400;color:#6b7280">· ${p.year}</span></b><p>${esc(p.tagline[lang])}.</p><div class="tech">${p.stack.map(esc).join(' · ')}</div></div>`)
    .join('')}</div>
  <p class="more">${others.map((p) => `<b>${esc(p.name)}</b> (${p.stack.slice(0, 3).map(esc).join(', ')})`).join(' · ')}</p>
</main>
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
