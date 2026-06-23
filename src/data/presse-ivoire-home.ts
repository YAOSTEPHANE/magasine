import { IMG } from "@/lib/images";

export const TICKER_ITEMS = [
  "Presidential election: first-round results expected tonight",
  "Economy: CFA franc under pressure against the dollar — experts weigh in",
  "African football: Abidjan to host AFCON 2027 final — CAF confirms",
  "Tech: Wave raises $350M for continental expansion",
  "Health: new anti-malaria protocol adopted across 12 West African countries",
];

export const HEADER_NAV = [
  { label: "Home", href: "/", active: true },
  { label: "World", href: "/category/monde" },
  { label: "Politics", href: "/category/actualites" },
  { label: "Economy", href: "/category/finance" },
  { label: "Sports", href: "/category/sports" },
];

export const NAV_RUBRIQUES = [
  { label: "🔥 Breaking", href: "/#urgent", featured: true },
  { label: "News", href: "/category/actualites" },
  { label: "Sports", href: "/category/sports" },
  { label: "Finance", href: "/category/finance" },
  { label: "Technology", href: "/category/technologie" },
  { label: "Health", href: "/category/sante" },
  { label: "Entertainment", href: "/category/divertissement" },
  { label: "Opinion", href: "/category/opinion" },
  { label: "Multimedia", href: "/category/multimedia" },
  { label: "Investigations", href: "/category/investigations" },
  { label: "Local", href: "/category/local" },
];

export const HERO_MAIN = {
  slug: "la-grande-reforme-fiscale-ouest-africaine-qui-gagne-qui-perd-dans-luemoa",
  image: IMG.finance,
  badge: "Exclusive Investigation",
  title: "West Africa's major tax reform:",
  titleEm: "who wins and who loses in WAEMU?",
  category: "Economy",
  excerpt:
    "An in-depth look at new common tax directives across the Union's eight member states. Our experts break down the stakes for businesses, households, and governments across the region.",
  author: "Ama Kouassi",
  authorRole: "Economics Correspondent",
  authorInitials: "AK",
  readingTime: "7 min read",
  timeAgo: "2 hours ago",
  date: "June 22, 2026, 9:15 AM",
  isPremium: true,
};

export const HERO_MINI_CARDS = [
  {
    cat: "Politics",
    title: "Parliament passes personal data protection law",
    meta: "3h ago · 5 min",
    image: IMG.politics,
    slug: "/article/le-parlement-vote-la-loi-sur-la-protection-des-donnees-personnelles",
  },
  {
    cat: "Technology",
    title: "Abidjan Tech Valley: 40 startups selected for 2026 continental accelerator",
    meta: "5h ago · 4 min",
    image: IMG.tech,
    slug: "/article/abidjan-tech-valley-40-startups-selectionnees-pour-laccelerateur-continental-2026",
  },
  {
    cat: "World",
    title: "AU Summit: continent adopts roadmap for food self-sufficiency",
    meta: "6h ago · 6 min",
    image: IMG.africa,
    slug: "/article/sommet-de-l-ua-le-continent-adopte-une-feuille-de-route-pour-l-autonomie-alimentaire",
  },
  {
    cat: "Sports",
    title: "AFCON 2027: Félix Houphouët-Boigny Stadium to host final, capacity raised to 60,000",
    meta: "8h ago · 3 min",
    image: IMG.football,
    slug: "/article/can-2027-le-stade-felix-houphouet-boigny-accueillera-la-finale-capacite-portee-a-60-000",
  },
];

export const TOP_STORIES = [
  { num: "01", cat: "Finance", title: "Wave and Orange Money announce merger: birth of Africa's first super-wallet", meta: "12 min read · 1h ago", image: IMG.fintech, slug: "/article/wave-et-orange-money-annoncent-leur-fusion-naissance-du-premier-super-portefeuille-africain" },
  { num: "02", cat: "Investigation", title: "Embezzlement probe: three ministers charged in public construction contracts case", meta: "8 min · 2h ago", image: IMG.investigation, slug: "/article/detournement-de-fonds-publics-trois-ministres-mis-en-examen-dans-laffaire-des-marches-de-construction" },
  { num: "03", cat: "Health", title: "RTS,S malaria vaccine: Côte d'Ivoire launches nationwide mass vaccination campaign", meta: "5 min · 4h ago", image: IMG.health, slug: "/article/vaccin-antipaludisme-rtss-la-cote-divoire-lance-sa-campagne-nationale-de-vaccination-de-masse" },
  { num: "04", cat: "Technology", title: "Google unveils its first sub-Saharan Africa data center in Accra", meta: "4 min · 5h ago", image: IMG.datacenter, slug: "/article/google-devoile-son-premier-data-center-dafrique-subsaharienne-installe-a-accra" },
  { num: "05", cat: "Local", title: "Grand-Bassam UNESCO extension: colonial heritage site officially expanded", meta: "3 min · 7h ago", image: IMG.heritage, slug: "/article/grand-bassam-classee-au-patrimoine-mondial-lunesco-officialise-lextension-du-site-colonial" },
  { num: "06", cat: "World", title: "UN adopts historic resolution on developing countries' sovereign debt", meta: "6 min · 9h ago", image: IMG.un, slug: "/article/lonu-adopte-une-resolution-historique-sur-la-dette-souveraine-des-pays-en-developpement" },
];

export const POPULAR_TAGS = [
  "#AFCON2027", "#WAEMU", "#FinTech", "#Agriculture", "#Elections",
  "#Abidjan", "#MobileMoney", "#Climate", "#Diaspora",
];

export const EDITORS_CHOICE = {
  featured: {
    tags: ["Report", "★ Top Story"],
    title: "Ivorian farmers turning cocoa into premium chocolate — and challenging global brands",
    excerpt: "They grow, process, and export. A new generation of cocoa growers is reshaping the world chocolate market from plantations in Bélier.",
    author: "Brice Ahi",
    meta: "12 min read · June 21, 2026",
    image: IMG.cacao,
    slug: "/article/ces-agriculteurs-ivoiriens-qui-transforment-le-cacao-en-chocolat-haut-de-gamme",
  },
  rows: [
    { cat: "Technology", title: "AI for agriculture: Agrotech CI rolls out voice assistant in Dioula and Baoulé", author: "Kadi Traoré", time: "6 min", image: IMG.agriculture, slug: "/article/lia-au-service-de-lagriculture-agrotech-ci-deploie-son-assistant-vocal-en-dioula-et-baoule" },
    { cat: "Opinion", title: "Should Francophone Africa rethink public debt? An economist's view", author: "Prof. Adjoua Mensah", time: "9 min", image: IMG.economy, slug: "/article/faut-il-repenser-le-modele-de-la-dette-publique-en-afrique-francophone" },
    { cat: "Environment", title: "Sassandra deforestation: investigation reveals true scale of forest loss since 2020", author: "Investigations Desk", time: "11 min", image: IMG.forest, slug: "/article/deforestation-du-sassandra-lenquete-qui-revele-lampleur-reelle-des-pertes-forestieres" },
  ],
  side: {
    cat: "Diaspora",
    title: "Ivoirians in France: how the second generation is reinventing ties with home",
    excerpt: "Portraits of eight young Franco-Ivorian entrepreneurs who chose to return and build in Côte d'Ivoire.",
    author: "Marie-Jo Bamba",
    time: "8 min",
    image: IMG.diaspora,
    slug: "/article/ivoiriens-de-france-comment-la-deuxieme-generation-reinvente-le-lien-avec-le-pays",
  },
};

export const LATEST = {
  featured: {
    cat: "Politics",
    badge: "12 MIN AGO",
    title: "Parliament passes personal data protection law — a first for Francophone West Africa",
    author: "Sékou Koné",
    time: "4 min read",
    image: IMG.politics,
    slug: "/article/le-parlement-vote-la-loi-sur-la-protection-des-donnees-personnelles",
  },
  items: [
    { cat: "Economy", title: "AfDB announces $800M financing for Ivorian agri-food SMEs", time: "25 min ago · 3 min", image: IMG.cacao, slug: "/article/la-bad-annonce-un-financement-de-800m-pour-les-pme-ivoiriennes-dans-le-secteur-agroalimentaire" },
    { cat: "Sports", title: "Ligue 1 CI: ASEC wins Abidjan derby 3-1, back on top of the table", time: "1h ago · 2 min", image: IMG.stadium, slug: "/article/ligue-1-ci-lasec-remporte-le-derby-dabidjan-3-1" },
    { cat: "World", title: "United Nations: Security Council holds emergency session on Sahel crisis", time: "2h ago · 5 min", image: IMG.un, slug: "/article/nations-unies-le-conseil-de-securite-se-reunit-en-urgence-sur-la-situation-au-sahel" },
    { cat: "Technology", title: "Meta launches WhatsApp Pay in Côte d'Ivoire with native CinetPay integration", time: "3h ago · 4 min", image: IMG.datacenter, slug: "/article/meta-deploie-son-service-whatsapp-pay-en-cote-divoire-avec-integration-cinetpay-native" },
    { cat: "Health", title: "New meningitis cases in Bouaké: Health Ministry activates regional emergency protocol", time: "4h ago · 3 min", image: IMG.health, slug: "/article/nouveaux-cas-de-meningite-a-bouake-le-ministere-de-la-sante-active-le-protocole-durgence-regional" },
  ],
};

export const VIDEOS = [
  { cat: "Economy", title: "Port of Abidjan: how it became West Africa's leading logistics hub", duration: "12:34", views: "2.4k views · 3h ago", image: IMG.port, slug: "/article/le-port-dabidjan-comment-il-est-devenu-le-premier-hub-logistique-dafrique-de-louest" },
  { cat: "Politics", title: "Exclusive interview: Prime Minister responds to criticism of education reform", duration: "08:12", views: "5.1k views · 5h ago", image: IMG.politics, slug: "/article/interview-exclusive-le-premier-ministre-repond-aux-critiques-sur-la-reforme-de-leducation" },
  { cat: "Sports", title: "The Elephants on the road to AFCON — inside the FIF training camp", duration: "05:47", views: "8.9k views · 8h ago", image: IMG.football, slug: "/article/les-elephants-en-route-pour-la-can-reportage-dans-le-centre-de-preparation-de-la-fif" },
  { cat: "Investigation", title: "Illegal gold mining in the north: documentary on clandestine supply chains", duration: "21:05", views: "14k views · 1d ago", image: IMG.forest, slug: "/article/orpaillage-illegal-dans-le-nord-le-grand-documentaire-sur-les-filieres-clandestines" },
];

export const OPINIONS = [
  { accent: true, text: "Electoral democracy is no longer enough. What we must build is a democracy of results — where access to water, schools, and healthcare is not a promise but an enforceable right.", initials: "PK", avatar: IMG.portrait1, name: "Prof. Paul Konan", role: "Political Scientist, Félix Houphouët-Boigny University" },
  { accent: false, text: "Africa can no longer afford to import its own processed raw materials. True economic independence starts in our factories, not our mines.", initials: "FM", avatar: IMG.portrait2, name: "Fatou Mbaye", role: "Economist, World Bank — Africa Bureau" },
  { accent: false, text: "African youth don't need anyone to build their future for them. They're already building it — with their phones, their ideas, and their refusal to wait for institutional permission.", initials: "YD", avatar: IMG.portrait3, name: "Yaya Diabaté", role: "Entrepreneur & Author, Abidjan" },
];

export const THEMATIC = [
  {
    title: "Technology",
    href: "/category/technologie",
    main: { cat: "Technology", title: "5G arrives in Abidjan: Orange CI and MTN simultaneously deploy pilot networks", image: IMG.datacenter },
    subs: [
      { num: "01", cat: "Startups", title: "InnovaCI wins the 2026 Francophonie Innovation Grand Prize" },
      { num: "02", cat: "Cybersecurity", title: "340% surge in cyberattacks against West African banks in 2025" },
      { num: "03", cat: "Mobile", title: "GSMA report: Africa to reach 1.5 billion mobile connections by 2030" },
    ],
  },
  {
    title: "Sports",
    href: "/category/sports",
    main: { cat: "Football", title: "Didier Drogba named Technical Director — a divisive decision for FIF and fans", image: IMG.stadium },
    subs: [
      { num: "01", cat: "Basketball", title: "Ivory Coast Lions qualify for FIBA World Cup 2027 after win over Cameroon" },
      { num: "02", cat: "Boxing", title: "Souleymane Cissokho, WBC champion: Ivorian boxing's renewed pride" },
      { num: "03", cat: "Athletics", title: "LA 2028: four Ivorian athletes qualify in sprint disciplines" },
    ],
  },
];

export const STATS = [
  { num: "2", suffix: "M+", label: "Monthly Readers" },
  { num: "145", suffix: "k", label: "Newsletter Subscribers" },
  { num: "12", suffix: "+", label: "Editorial Sections" },
  { num: "48", suffix: "h", label: "Continuous Coverage" },
];

export const FOOTER_COLS = {
  rubriques: [
    { label: "News", href: "/category/actualites" },
    { label: "Politics", href: "/category/actualites" },
    { label: "Economy & Finance", href: "/category/finance" },
    { label: "Technology", href: "/category/technologie" },
    { label: "Sports", href: "/category/sports" },
    { label: "Health", href: "/category/sante" },
    { label: "Entertainment", href: "/category/divertissement" },
    { label: "World", href: "/category/monde" },
  ],
  presse: [
    { label: "About", href: "/about" },
    { label: "Our team", href: "/team" },
    { label: "Press room", href: "/press" },
    { label: "Advertising", href: "/advertising" },
    { label: "Editorial charter", href: "/editorial-charter" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  formats: [
    { label: "Investigations", href: "/category/investigations" },
    { label: "Features", href: "/category/reportages-speciaux" },
    { label: "Opinion", href: "/category/opinion" },
    { label: "Videos", href: "/videos" },
    { label: "Podcasts", href: "/podcasts" },
    { label: "Infographics", href: "/category/multimedia" },
    { label: "Photo galleries", href: "/category/multimedia" },
  ],
  legal: [
    { label: "Legal notice", href: "/legal" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of use", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
    { label: "Right to erasure", href: "/privacy" },
  ],
};
