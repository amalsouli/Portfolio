// Single source of truth for the portfolio content.
// Edit this file to update the site; every section reads from here.

export type Lang = 'en' | 'fr';
export type L = Record<Lang, string>;

export const profile = {
  name: 'Amal Souli',
  title: { en: 'Software Engineer', fr: 'Ingénieure Logiciel' } as L,
  roles: {
    en: ['Mobile apps with Flutter & .NET MAUI', 'Full-stack web with Angular & Node.js', 'Enterprise software in C# / .NET', 'AI-assisted features'],
    fr: ['Apps mobiles Flutter & .NET MAUI', 'Web full-stack Angular & Node.js', 'Logiciels d’entreprise C# / .NET', 'Fonctionnalités assistées par l’IA'],
  },
  location: { en: 'Ariana, Tunisia', fr: 'Ariana, Tunisie' } as L,
  email: 'Amal.Souli@esprit.tn',
  github: 'https://github.com/amalsouli',
  linkedin: 'https://www.linkedin.com/in/amalsouli',
  cv: { en: 'cv/Amal-Souli-CV-EN.pdf', fr: 'cv/Amal-Souli-CV-FR.pdf' } as L,
  about: {
    en: [
      'I am a software engineer (ESPRIT, 2025) who likes building products end to end: from the data model and the API to the screen people actually touch.',
      'Today I work on an enterprise knowledge-management and laboratory (LIMS) platform, across C# / .NET services, REST APIs, Angular front-ends and Python services. Before that I shipped mobile apps in Flutter, .NET MAUI and Kotlin, and web platforms in PHP and WordPress.',
    ],
    fr: [
      'Je suis ingénieure logiciel (ESPRIT, 2025) et j’aime construire des produits de bout en bout : du modèle de données et de l’API jusqu’à l’écran que les utilisateurs touchent vraiment.',
      'Aujourd’hui je travaille sur une plateforme d’entreprise de gestion des connaissances et de laboratoire (LIMS) : services C# / .NET, API REST, front-ends Angular et services Python. Avant cela, j’ai livré des applications mobiles en Flutter, .NET MAUI et Kotlin, et des plateformes web en PHP et WordPress.',
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
    period: { en: 'Present', fr: 'Aujourd’hui' },
    current: true,
    stack: ['C#', '.NET', 'Delphi', 'Angular', 'Python', 'FastAPI', 'SQL Server', 'Git'],
    points: {
      en: [
        'Build and maintain customer-specific modules of TEEXMA, an enterprise knowledge-management and LIMS platform (Delphi, C# / .NET).',
        'Develop REST API endpoints in .NET and Angular front-end features for the platform.',
        'Contribute to Python (FastAPI) services, including an AI conversational assistant and a document-extraction module.',
        'Handle migrations to new platform versions, regression testing and customer deliveries.',
      ],
      fr: [
        'Développement et maintenance de modules spécifiques clients de TEEXMA, plateforme d’entreprise de gestion des connaissances et LIMS (Delphi, C# / .NET).',
        'Développement d’endpoints d’API REST .NET et de fonctionnalités front-end Angular.',
        'Contribution à des services Python (FastAPI), dont un assistant conversationnel IA et un module d’extraction de documents.',
        'Migrations vers les nouvelles versions de la plateforme, tests de non-régression et livraisons clients.',
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
        'Design and optimise customer-facing websites and internal platforms used to manage the showrooms.',
        'Keep the applications fast, secure and easy to use, and answer the needs of each department.',
      ],
      fr: [
        'Responsable du développement et de la maintenance de l’ensemble des solutions web de l’entreprise.',
        'Conception et optimisation des sites clients et des plateformes internes de gestion des showrooms.',
        'Performance, sécurité et ergonomie des applications, en réponse aux besoins de chaque département.',
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
  tags: ('Mobile' | 'Web' | 'Backend' | 'Desktop' | 'AI')[];
  links?: { label: string; url: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
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
  { group: { en: 'Languages', fr: 'Langages' }, items: ['C#', 'TypeScript', 'JavaScript', 'Dart', 'Kotlin', 'Java', 'Python', 'PHP', 'SQL', 'Delphi'] },
  { group: { en: 'Mobile', fr: 'Mobile' }, items: ['Flutter', 'FlutterFlow', '.NET MAUI', 'Android (Kotlin)', 'iOS (Swift)'] },
  { group: { en: 'Web & Backend', fr: 'Web & Backend' }, items: ['Angular', '.NET / ASP.NET', 'Node.js', 'Nest.js', 'Express', 'FastAPI', 'Spring Boot', 'Django', 'WordPress'] },
  { group: { en: 'Data & Tools', fr: 'Données & Outils' }, items: ['MySQL', 'SQL Server', 'MongoDB', 'Firebase', 'Git / GitHub', 'Postman', 'Figma', 'Visual Studio', 'AI coding assistants'] },
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
  education: { en: 'Education', fr: 'Formation' },
  languages: { en: 'Languages', fr: 'Langues' },
  contactText: {
    en: 'Open to new opportunities and collaborations in mobile, web and .NET development. The fastest way to reach me is by e-mail or LinkedIn.',
    fr: 'Ouverte aux nouvelles opportunités et collaborations en développement mobile, web et .NET. Le plus rapide : e-mail ou LinkedIn.',
  },
  footer: { en: 'Built with React, TypeScript and Tailwind CSS.', fr: 'Réalisé avec React, TypeScript et Tailwind CSS.' },
} satisfies Record<string, L | Record<string, L>>;
