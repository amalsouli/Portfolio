// Single source of truth for the portfolio content.
// Edit this file to update the site; every section reads from here.

export type Lang = 'en' | 'fr';
export type L = Record<Lang, string>;

export const profile = {
  name: 'Amal Souli',
  title: { en: 'Software Engineer', fr: 'Ingénieure Logiciel' } as L,
  roles: {
    en: ['AI assistants & document extraction', 'Enterprise integrations in C# / .NET', 'Web apps in JavaScript, TypeScript & Angular', 'Mobile apps with Flutter & .NET MAUI'],
    fr: ['Assistants IA & extraction de documents', 'Intégrations d’entreprise en C# / .NET', 'Apps web JavaScript, TypeScript & Angular', 'Apps mobiles Flutter & .NET MAUI'],
  },
  location: { en: 'Ariana, Tunisia', fr: 'Ariana, Tunisie' } as L,
  email: 'Amal.Souli@esprit.tn',
  github: 'https://github.com/amalsouli',
  linkedin: 'https://www.linkedin.com/in/amalsouli',
  cv: { en: 'cv/Amal-Souli-CV-EN.pdf', fr: 'cv/Amal-Souli-CV-FR.pdf' } as L,
  about: {
    en: [
      'Software Engineer specialising in enterprise applications, AI integration and system interoperability. I design and deliver reliable, maintainable solutions with C# / .NET, JavaScript / TypeScript, Angular and Python.',
      'At Bassetti Group, I contribute to TEEXMA, an enterprise knowledge-management and LIMS platform. My recent work covers the integration of an agentic AI assistant, AI-based extraction of safety data sheets with Azure OpenAI, and a LIMS–SAP integration built on .NET REST APIs. My background in cross-platform mobile development (Flutter, .NET MAUI) and web platforms gives me a complete view of the product lifecycle, from requirements to production.',
    ],
    fr: [
      'Ingénieure logiciel spécialisée dans les applications d’entreprise, l’intégration de l’IA et l’interopérabilité des systèmes. Je conçois et livre des solutions fiables et maintenables en C# / .NET, JavaScript / TypeScript, Angular et Python.',
      'Chez Bassetti Group, je contribue à TEEXMA, plateforme d’entreprise de gestion des connaissances et LIMS. Mes réalisations récentes couvrent l’intégration d’un assistant IA agentique, l’extraction de fiches de données de sécurité par IA avec Azure OpenAI et une intégration LIMS–SAP reposant sur des API REST .NET. Mon expérience en développement mobile cross-platform (Flutter, .NET MAUI) et en plateformes web me donne une vision complète du cycle de vie produit, du besoin à la mise en production.',
    ],
  },
};

export type Experience = {
  role: L;
  company: string;
  period: L;
  current?: boolean;
  stack: string[];
  points: Record<Lang, string[]>;
};

export const experiences: Experience[] = [
  {
    role: { en: 'Software Engineer', fr: 'Ingénieure Logiciel' },
    company: 'Bassetti Group',
    period: { en: '2026 – Present', fr: '2026 – aujourd’hui' },
    current: true,
    stack: ['C#', '.NET', 'JavaScript', 'TypeScript', 'Angular', 'Python', 'Azure OpenAI', 'Delphi', 'SAP API', 'Jenkins', 'SonarQube'],
    points: {
      en: [
        'Integrated an agentic AI assistant into the web client of TEEXMA, an enterprise knowledge-management and LIMS platform: Angular chat UI, tool-step panel, answer rendering and rating (TypeScript).',
        'Delivered an AI-powered safety-data-sheet extractor: Angular upload portal, Azure OpenAI section extraction, and one-click release packaging of API, portal and file publisher.',
        'Built a laboratory-reception integration between the LIMS and SAP: C# / .NET REST API for scanned samples, authenticated SAP gateway calls, Delphi business module and regression tests.',
        'Shipped platform features in JavaScript and Delphi (time-tracking comments and permissions, generic map) and migrated customer developments to a new major platform version.',
        'Fixed SonarQube issues and delivered through pull requests, Jenkins builds and bilingual impact analyses.',
      ],
      fr: [
        'Intégration d’un assistant IA agentique dans le client web de TEEXMA, plateforme d’entreprise de gestion des connaissances et LIMS : interface de chat Angular, panneau des étapes d’outils, rendu et notation des réponses (TypeScript).',
        'Livraison d’un extracteur de fiches de données de sécurité par IA : portail Angular d’import, extraction des sections via Azure OpenAI et packaging en une seule release de l’API, du portail et du publieur de fichiers.',
        'Intégration de la réception laboratoire entre le LIMS et SAP : API REST C# / .NET pour les échantillons scannés, appels authentifiés à la passerelle SAP, module métier Delphi et tests de non-régression.',
        'Fonctionnalités plateforme en JavaScript et Delphi (commentaires et permissions du suivi des temps, carte générique) et migration de développements clients vers une nouvelle version majeure.',
        'Correction des anomalies SonarQube, livraison via pull requests, builds Jenkins et analyses d’impact bilingues.',
      ],
    },
  },
  {
    role: { en: 'IT Engineer', fr: 'Ingénieure IT' },
    company: 'Dar Ammar Meuble',
    period: { en: 'Nov 2025 – present', fr: 'nov. 2025 – aujourd’hui' },
    stack: ['WordPress', 'PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'Flutter'],
    points: {
      en: [
        'Own the development and maintenance of all the company’s web solutions.',
        'Design and optimise customer-facing websites and internal platforms used to manage the showrooms, with a focus on performance, security and usability.',
      ],
      fr: [
        'Responsable du développement et de la maintenance de l’ensemble des solutions web de l’entreprise.',
        'Conception et optimisation des sites clients et des plateformes internes de gestion des showrooms, avec un accent sur la performance, la sécurité et l’ergonomie.',
      ],
    },
  },
  {
    role: { en: 'Final-year internship (PFE)', fr: 'Stage de fin d’études (PFE)' },
    company: 'Hotix',
    period: { en: 'Jan 2025 – Jul 2025', fr: 'janv. 2025 – juil. 2025' },
    stack: ['.NET MAUI', 'C#', 'MySQL'],
    points: {
      en: [
        'Built a cross-platform mobile app for hotel guests to browse services, activities and stay information.',
        'Personal space with invoices, service requests, bookings and a loyalty programme with redeemable points.',
      ],
      fr: [
        'Application mobile cross-platform permettant aux clients d’un hôtel de consulter services, activités et informations de séjour.',
        'Espace personnel avec factures, demandes de services, réservations et programme de fidélité à points échangeables.',
      ],
    },
  },
  {
    role: { en: 'Engineering internship', fr: 'Stage ingénieur' },
    company: 'ESPRIT',
    period: { en: 'Jul 2024 – Sep 2024', fr: 'juil. 2024 – sept. 2024' },
    stack: ['FlutterFlow', 'Firebase'],
    points: {
      en: ['Built a mobile app for a perfumery that recommends fragrances from the customer’s favourite olfactory notes.'],
      fr: ['Application mobile pour une parfumerie qui recommande un parfum selon les notes olfactives préférées du client.'],
    },
  },
  {
    role: { en: 'Immersion internship', fr: 'Stage d’immersion' },
    company: 'Sagemcom',
    period: { en: 'Aug 2023 – Sep 2023', fr: 'août 2023 – sept. 2023' },
    stack: ['Python', 'Django', 'MySQL'],
    points: {
      en: ['Built an automated test-data management system to streamline production testing and keep critical data available.'],
      fr: ['Système de gestion automatisée des données de test pour rationaliser la production et garder les données critiques disponibles.'],
    },
  },
  {
    role: { en: 'Admissions assistant', fr: 'Assistante Admission' },
    company: 'ESPRIT',
    period: { en: '2020 – 2024', fr: '2020 – 2024' },
    stack: [],
    points: {
      en: ['Welcomed and enrolled new students, ran open days and admission sessions, and handled admission communication and marketing.'],
      fr: ['Accueil et inscription des étudiants, organisation des journées portes ouvertes et concours, communication et marketing de l’admission.'],
    },
  },
  {
    role: { en: 'Summer internship', fr: 'Stage ouvrier' },
    company: 'STB Bank',
    period: { en: 'Jul 2022 – Aug 2022', fr: 'juil. 2022 – août 2022' },
    stack: ['HTML', 'CSS', 'PHP'],
    points: {
      en: ['Built a responsive website to improve communication between the bank and its customers.'],
      fr: ['Site web responsive pour améliorer la communication entre la banque et ses clients.'],
    },
  },
];

export type Project = {
  name: string;
  year: string;
  emoji: string;
  tagline: L;
  description: L;
  stack: string[];
  tags: ('Mobile' | 'Web' | 'Backend' | 'Desktop' | 'AI' | 'Integration')[];
  links?: { label: string; url: string }[];
  featured?: boolean;
  /** Professional project at the current employer (private code, shown in the "Current work" block). */
  work?: boolean;
};

export const projects: Project[] = [
  {
    name: 'Agentic AI Assistant',
    year: '2026',
    emoji: '🤖',
    work: true,
    tagline: { en: 'AI agent inside an enterprise web platform', fr: 'Agent IA intégré à une plateforme web d’entreprise' },
    description: {
      en: 'Integrated an agentic conversational assistant into the platform’s web client: chat UI, live panel of the agent’s tool steps, rich answer rendering with custom tags, file-metadata editing and answer rating. Hardened through bug fixing and SonarQube clean-up.',
      fr: 'Intégration d’un assistant conversationnel agentique dans le client web de la plateforme : interface de chat, panneau temps réel des étapes d’outils de l’agent, rendu enrichi des réponses, édition de métadonnées de fichiers et notation des réponses. Fiabilisé par corrections de bugs et nettoyage SonarQube.',
    },
    stack: ['Angular', 'TypeScript', 'JavaScript', 'SCSS', 'Python', 'FastAPI', 'LLM agents'],
    tags: ['AI', 'Web'],
  },
  {
    name: 'AI Safety Data Sheet Extractor',
    year: '2026',
    emoji: '🧪',
    work: true,
    tagline: { en: 'AI reads chemical safety data sheets', fr: 'L’IA lit les fiches de données de sécurité' },
    description: {
      en: 'Portal to upload safety data sheets (PDF) and extract their sections with an Azure OpenAI model into the platform. I built portal features and the release pipeline that packages the API, the Angular portal and the file publisher into one deliverable.',
      fr: 'Portail d’import de fiches de données de sécurité (PDF) dont les sections sont extraites par un modèle Azure OpenAI vers la plateforme. J’ai développé des fonctionnalités du portail et le pipeline de release qui package l’API, le portail Angular et le publieur de fichiers en un seul livrable.',
    },
    stack: ['Angular', 'TypeScript', 'Python', 'Azure OpenAI', 'CI/CD'],
    tags: ['AI', 'Web'],
  },
  {
    name: 'LIMS ↔ SAP Lab Reception',
    year: '2026',
    emoji: '🔗',
    work: true,
    tagline: { en: 'Laboratory ↔ ERP integration in .NET', fr: 'Intégration laboratoire ↔ ERP en .NET' },
    description: {
      en: 'End-to-end sample reception for a quality laboratory: a .NET REST API receives scanned samples, creates them on the right analysis request, and exchanges statuses and results with SAP through an authenticated gateway. Delphi business module, regression tests and single-build Jenkins delivery.',
      fr: 'Réception d’échantillons de bout en bout pour un laboratoire qualité : une API REST .NET reçoit les échantillons scannés, les crée sur la bonne demande d’analyse et échange statuts et résultats avec SAP via une passerelle authentifiée. Module métier Delphi, tests de non-régression et livraison Jenkins en un build.',
    },
    stack: ['C#', '.NET', 'ASP.NET Core', 'REST', 'SAP API', 'Delphi', 'Jenkins'],
    tags: ['Integration', 'Backend'],
  },
  {
    name: 'Platform features & migrations',
    year: '2026',
    emoji: '🧭',
    work: true,
    tagline: { en: 'JavaScript & Delphi on a large codebase', fr: 'JavaScript & Delphi sur une large base de code' },
    description: {
      en: 'Time-tracking evolutions (comments on locked entries, separate view / edit permissions, historical overruns), a generic map component, publishing fixes, and migration of customer developments to a new major platform version.',
      fr: 'Évolutions du suivi des temps (commentaires sur saisies verrouillées, permissions de lecture / écriture séparées, dépassements historiques), composant de carte générique, corrections de publication et migration de développements clients vers une nouvelle version majeure.',
    },
    stack: ['JavaScript', 'Delphi', 'XML', 'Git'],
    tags: ['Web', 'Backend'],
  },
  {
    name: 'Brainiacs',
    year: '2024',
    emoji: '🧩',
    featured: true,
    tagline: { en: 'Educational games & care for autistic children', fr: 'Jeux éducatifs et suivi pour enfants autistes' },
    description: {
      en: 'Mobile app with educational and cultural games for autistic children, built-in screening tests for a quick first assessment, and geolocation to find, call and book the nearest doctor.',
      fr: 'Application mobile de jeux éducatifs et culturels pour enfants autistes, avec tests de dépistage intégrés et géolocalisation pour trouver, contacter et réserver le médecin le plus proche.',
    },
    stack: ['Flutter', 'Node.js', 'Express', 'MongoDB', 'Unity'],
    tags: ['Mobile', 'Backend'],
    links: [{ label: 'Backend', url: 'https://github.com/PIM-Brainiacs/back_final' }],
  },
  {
    name: 'Ecocircuit',
    year: '2024',
    emoji: '♻️',
    featured: true,
    tagline: { en: 'Raising awareness about e-waste recycling', fr: 'Sensibiliser au recyclage des appareils électroniques' },
    description: {
      en: 'Native Android and iOS apps plus a Flutter admin dashboard, backed by a Node.js API: articles, recycling events users can join, and content management.',
      fr: 'Applications natives Android et iOS et dashboard admin Flutter, sur une API Node.js : articles, événements de recyclage auxquels participer et gestion de contenu.',
    },
    stack: ['Kotlin', 'Swift', 'Flutter', 'Node.js'],
    tags: ['Mobile', 'Backend'],
  },
  {
    name: 'Hotix Guest',
    year: '2025',
    emoji: '🏨',
    featured: true,
    tagline: { en: 'Hotel guest companion app (final-year project)', fr: 'Application compagnon pour clients d’hôtel (PFE)' },
    description: {
      en: 'Cross-platform app connecting hotel guests and staff: services, activities, invoices, service requests, bookings and a points-based loyalty programme.',
      fr: 'Application cross-platform reliant clients et personnel hôtelier : services, activités, factures, demandes, réservations et programme de fidélité à points.',
    },
    stack: ['.NET MAUI', 'C#', 'MySQL'],
    tags: ['Mobile'],
  },
  {
    name: 'QuickShip',
    year: '2023',
    emoji: '🚚',
    tagline: { en: 'Transport & logistics management', fr: 'Gestion de transport et logistique' },
    description: {
      en: 'Desktop platform for companies booking carriers for staff or goods: users, vehicles and trailers, orders, routes with checkpoints, maintenance reports, statistics, and SMS / e-mail notifications.',
      fr: 'Plateforme desktop pour les entreprises qui réservent des transporteurs pour leur personnel ou leurs produits : utilisateurs, véhicules et remorques, commandes, trajets avec checkpoints, maintenance, statistiques et notifications SMS / e-mail.',
    },
    stack: ['Java', 'JavaFX', 'MySQL', 'Symfony'],
    tags: ['Desktop', 'Web'],
    links: [{ label: 'GitHub', url: 'https://github.com/amalsouli/QuickShip' }],
  },
  {
    name: 'Ski Station',
    year: '2024',
    emoji: '⛷️',
    tagline: { en: 'Spring Boot API in a DevOps course', fr: 'API Spring Boot dans un cours DevOps' },
    description: {
      en: 'Team project managing skiers, instructors, courses, slopes, registrations and subscriptions, built with a feature-branch workflow and unit tests.',
      fr: 'Projet d’équipe de gestion des skieurs, moniteurs, cours, pistes, inscriptions et abonnements, avec un workflow par branche et des tests unitaires.',
    },
    stack: ['Java', 'Spring Boot', 'Maven', 'JUnit', 'MySQL'],
    tags: ['Backend'],
    links: [{ label: 'GitHub', url: 'https://github.com/amalsouli/5Sim1_G3_SKISTATION' }],
  },
  {
    name: 'Scent Finder',
    year: '2024',
    emoji: '🌸',
    tagline: { en: 'Fragrance recommendation app', fr: 'Recommandation de parfums' },
    description: {
      en: 'Mobile app for a perfumery that helps customers pick a fragrance from their favourite olfactory notes.',
      fr: 'Application mobile pour une parfumerie qui aide les clients à choisir un parfum selon leurs notes olfactives préférées.',
    },
    stack: ['FlutterFlow', 'Firebase'],
    tags: ['Mobile'],
  },
  {
    name: 'Beauty Center',
    year: '2022',
    emoji: '💅',
    tagline: { en: 'Beauty salon web platform', fr: 'Plateforme web pour institut de beauté' },
    description: {
      en: 'Team web project with appointment booking (create, edit, cancel), products, orders, care services and complaints, with front and back office.',
      fr: 'Projet web d’équipe avec prise de rendez-vous (ajout, modification, annulation), produits, commandes, soins et réclamations, en front et back office.',
    },
    stack: ['PHP', 'MySQL', 'HTML5', 'CSS', 'JavaScript'],
    tags: ['Web'],
    links: [{ label: 'GitHub', url: 'https://github.com/amalsouli/projet-web' }],
  },
];

export const skills: { group: L; items: string[] }[] = [
  { group: { en: 'Languages', fr: 'Langages' }, items: ['JavaScript', 'TypeScript', 'C#', 'Python', 'Dart', 'Kotlin', 'Java', 'PHP', 'SQL', 'Delphi'] },
  { group: { en: 'Web & Backend', fr: 'Web & Backend' }, items: ['Angular', 'React', 'Node.js', 'Express', 'Nest.js', '.NET / ASP.NET Core', 'REST APIs', 'FastAPI', 'Spring Boot', 'Django', 'WordPress'] },
  { group: { en: 'AI & Integration', fr: 'IA & Intégration' }, items: ['Azure OpenAI', 'LLM agents', 'Document extraction', 'SAP API integration'] },
  { group: { en: 'Mobile', fr: 'Mobile' }, items: ['Flutter', 'FlutterFlow', '.NET MAUI', 'Android (Kotlin)', 'iOS (Swift)'] },
  { group: { en: 'Data, DevOps & Tools', fr: 'Données, DevOps & Outils' }, items: ['SQL Server', 'MySQL', 'MongoDB', 'Firebase', 'Git / GitHub', 'Jenkins', 'SonarQube', 'Postman', 'Figma'] },
];

export const education = [
  { degree: { en: 'Software Engineering degree', fr: 'Diplôme d’ingénieur en génie logiciel' } as L, school: 'ESPRIT — École Supérieure Privée d’Ingénierie et de Technologies', period: '2022 – 2025' },
  { degree: { en: 'Integrated preparatory cycle, Computer Science', fr: 'Cycle préparatoire intégré, Informatique' } as L, school: 'ESPRIT', period: '2020 – 2022' },
];

export const languages: { name: L; level: L; value: number }[] = [
  { name: { en: 'Arabic', fr: 'Arabe' }, level: { en: 'Native', fr: 'Langue maternelle' }, value: 100 },
  { name: { en: 'French', fr: 'Français' }, level: { en: 'Fluent', fr: 'Courant' }, value: 90 },
  { name: { en: 'English', fr: 'Anglais' }, level: { en: 'Advanced', fr: 'Avancé' }, value: 80 },
];

export const ui = {
  nav: { about: { en: 'About', fr: 'À propos' }, experience: { en: 'Experience', fr: 'Expérience' }, projects: { en: 'Projects', fr: 'Projets' }, skills: { en: 'Skills', fr: 'Compétences' }, contact: { en: 'Contact', fr: 'Contact' } },
  hello: { en: 'Hi, I’m', fr: 'Bonjour, je suis' },
  downloadCv: { en: 'Download CV', fr: 'Télécharger le CV' },
  contactMe: { en: 'Get in touch', fr: 'Me contacter' },
  current: { en: 'Current', fr: 'Actuel' },
  all: { en: 'All', fr: 'Tous' },
  workTitle: { en: 'Current work · Bassetti Group', fr: 'Travaux actuels · Bassetti Group' },
  workNote: {
    en: 'Professional projects on an enterprise knowledge-management & LIMS platform. Code is private; descriptions are generic.',
    fr: 'Projets professionnels sur une plateforme d’entreprise de gestion des connaissances & LIMS. Code privé, descriptions génériques.',
  },
  personalTitle: { en: 'Academic & personal projects', fr: 'Projets académiques & personnels' },
  education: { en: 'Education', fr: 'Formation' },
  languages: { en: 'Languages', fr: 'Langues' },
  contactText: {
    en: 'Open to new opportunities and collaborations in mobile, web and .NET development. The fastest way to reach me is by e-mail or LinkedIn.',
    fr: 'Ouverte aux nouvelles opportunités et collaborations en développement mobile, web et .NET. Le plus rapide : e-mail ou LinkedIn.',
  },
  footer: { en: 'Built with React, TypeScript and Tailwind CSS.', fr: 'Réalisé avec React, TypeScript et Tailwind CSS.' },
} satisfies Record<string, L | Record<string, L>>;
