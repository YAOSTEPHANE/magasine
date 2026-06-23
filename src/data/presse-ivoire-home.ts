import { IMG } from "@/lib/images";

export const TICKER_ITEMS = [
  "Élection présidentielle : les résultats du premier tour attendus dans la soirée",
  "Économie : le FCFA sous pression face au dollar — les experts se prononcent",
  "Football africain : Abidjan accueillera la CAN 2027 — décision officielle de la CAF",
  "Tech : le géant Wave lève 350 millions de dollars pour son expansion continentale",
  "Santé : nouveau protocole contre le paludisme adopté dans 12 pays d'Afrique de l'Ouest",
];

export const HEADER_NAV = [
  { label: "Accueil", href: "/", active: true },
  { label: "Monde", href: "/categorie/monde" },
  { label: "Politique", href: "/categorie/actualites" },
  { label: "Économie", href: "/categorie/finance" },
  { label: "Sport", href: "/categorie/sports" },
];

export const NAV_RUBRIQUES = [
  { label: "🔥 Urgent", href: "/#urgent", featured: true },
  { label: "Actualités", href: "/categorie/actualites" },
  { label: "Sports", href: "/categorie/sports" },
  { label: "Finance", href: "/categorie/finance" },
  { label: "Technologie", href: "/categorie/technologie" },
  { label: "Santé", href: "/categorie/sante" },
  { label: "Divertissement", href: "/categorie/divertissement" },
  { label: "Opinion", href: "/categorie/opinion" },
  { label: "Multimédia", href: "/categorie/multimedia" },
  { label: "Investigations", href: "/categorie/investigations" },
  { label: "Local", href: "/categorie/local" },
];

export const HERO_MAIN = {
  slug: "la-grande-reforme-fiscale-ouest-africaine-qui-gagne-qui-perd-dans-luemoa",
  image: IMG.finance,
  badge: "Enquête Exclusive",
  title: "La grande réforme fiscale ouest-africaine :",
  titleEm: "qui gagne, qui perd dans l'UEMOA ?",
  category: "Économie",
  excerpt:
    "Une analyse approfondie des nouvelles directives fiscales communes aux huit États membres de l'Union. Nos experts décryptent les enjeux pour les entreprises, les ménages et les gouvernements de la région.",
  author: "Ama Kouassi",
  authorRole: "Correspondante Économique",
  authorInitials: "AK",
  readingTime: "7 min de lecture",
  timeAgo: "Il y a 2 h",
  date: "22 juin 2026, 09h15",
  isPremium: true,
};

export const HERO_MINI_CARDS = [
  {
    cat: "Politique",
    title: "Le Parlement vote la loi sur la protection des données personnelles",
    meta: "Il y a 3h · 5 min",
    image: IMG.politics,
    slug: "/article/le-parlement-vote-la-loi-sur-la-protection-des-donnees-personnelles",
  },
  {
    cat: "Technologie",
    title: "Abidjan Tech Valley : 40 startups sélectionnées pour l'accélérateur continental 2026",
    meta: "Il y a 5h · 4 min",
    image: IMG.tech,
    slug: "/article/abidjan-tech-valley-40-startups-selectionnees-pour-laccelerateur-continental-2026",
  },
  {
    cat: "Monde",
    title: "Sommet de l'UA : le continent adopte une feuille de route pour l'autonomie alimentaire",
    meta: "Il y a 6h · 6 min",
    image: IMG.africa,
    slug: "/article/sommet-de-l-ua-le-continent-adopte-une-feuille-de-route-pour-l-autonomie-alimentaire",
  },
  {
    cat: "Sports",
    title: "CAN 2027 : le stade Félix Houphouët-Boigny accueillera la finale, capacité portée à 60 000",
    meta: "Il y a 8h · 3 min",
    image: IMG.football,
    slug: "/article/can-2027-le-stade-felix-houphouet-boigny-accueillera-la-finale-capacite-portee-a-60-000",
  },
];

export const TOP_STORIES = [
  { num: "01", cat: "Finance", title: "Wave et Orange Money annoncent leur fusion : naissance du premier super-portefeuille africain", meta: "12 min de lecture · Il y a 1h", image: IMG.fintech, slug: "/article/wave-et-orange-money-annoncent-leur-fusion-naissance-du-premier-super-portefeuille-africain" },
  { num: "02", cat: "Investigation", title: "Détournement de fonds publics : trois ministres mis en examen dans l'affaire des marchés de construction", meta: "8 min · Il y a 2h", image: IMG.investigation, slug: "/article/detournement-de-fonds-publics-trois-ministres-mis-en-examen-dans-laffaire-des-marches-de-construction" },
  { num: "03", cat: "Santé", title: "Vaccin antipaludisme RTS,S : la Côte d'Ivoire lance sa campagne nationale de vaccination de masse", meta: "5 min · Il y a 4h", image: IMG.health, slug: "/article/vaccin-antipaludisme-rtss-la-cote-divoire-lance-sa-campagne-nationale-de-vaccination-de-masse" },
  { num: "04", cat: "Technologie", title: "Google dévoile son premier data center d'Afrique subsaharienne, installé à Accra", meta: "4 min · Il y a 5h", image: IMG.datacenter, slug: "/article/google-devoile-son-premier-data-center-dafrique-subsaharienne-installe-a-accra" },
  { num: "05", cat: "Local", title: "Grand Bassam classée au patrimoine mondial : l'UNESCO officialise l'extension du site colonial", meta: "3 min · Il y a 7h", image: IMG.heritage, slug: "/article/grand-bassam-classee-au-patrimoine-mondial-lunesco-officialise-lextension-du-site-colonial" },
  { num: "06", cat: "Monde", title: "L'ONU adopte une résolution historique sur la dette souveraine des pays en développement", meta: "6 min · Il y a 9h", image: IMG.un, slug: "/article/lonu-adopte-une-resolution-historique-sur-la-dette-souveraine-des-pays-en-developpement" },
];

export const POPULAR_TAGS = [
  "#CAN2027", "#UEMOA", "#FinTech", "#Agriculture", "#Élections",
  "#Abidjan", "#Mobile Money", "#Climat", "#Diaspora",
];

export const EDITORS_CHOICE = {
  featured: {
    tags: ["Reportage", "★ À la Une"],
    title: "Ces agriculteurs ivoiriens qui transforment le cacao en chocolat haut de gamme — et défient les grandes marques",
    excerpt: "Ils produisent, transforment et exportent. Une nouvelle génération de cacaoculteurs bouscule les règles du marché mondial du chocolat depuis les plantations du Bélier.",
    author: "Brice Ahi",
    meta: "12 min de lecture · 21 juin 2026",
    image: IMG.cacao,
    slug: "/article/ces-agriculteurs-ivoiriens-qui-transforment-le-cacao-en-chocolat-haut-de-gamme",
  },
  rows: [
    { cat: "Technologie", title: "L'IA au service de l'agriculture : Agrotech CI déploie son assistant vocal en dioula et baoulé", author: "Kadi Traoré", time: "6 min", image: IMG.agriculture, slug: "/article/lia-au-service-de-lagriculture-agrotech-ci-deploie-son-assistant-vocal-en-dioula-et-baoule" },
    { cat: "Opinion", title: "Faut-il repenser le modèle de la dette publique en Afrique francophone ? Une perspective économiste", author: "Prof. Adjoua Mensah", time: "9 min", image: IMG.economy, slug: "/article/faut-il-repenser-le-modele-de-la-dette-publique-en-afrique-francophone" },
    { cat: "Environnement", title: "Déforestation du Sassandra : l'enquête qui révèle l'ampleur réelle des pertes forestières depuis 2020", author: "Équipe Investigation", time: "11 min", image: IMG.forest, slug: "/article/deforestation-du-sassandra-lenquete-qui-revele-lampleur-reelle-des-pertes-forestieres" },
  ],
  side: {
    cat: "Diaspora",
    title: "Ivoiriens de France : comment la deuxième génération réinvente le lien avec le pays",
    excerpt: "Portraits croisés de huit jeunes Franco-Ivoiriens qui ont fait le choix du retour au pays pour entreprendre et construire.",
    author: "Marie-Jo Bamba",
    time: "8 min",
    image: IMG.diaspora,
    slug: "/article/ivoiriens-de-france-comment-la-deuxieme-generation-reinvente-le-lien-avec-le-pays",
  },
};

export const LATEST = {
  featured: {
    cat: "Politique",
    badge: "IL Y A 12 MIN",
    title: "Le Parlement vote la loi sur la protection des données personnelles — première en Afrique de l'Ouest francophone",
    author: "Sékou Koné",
    time: "4 min de lecture",
    image: IMG.politics,
    slug: "/article/le-parlement-vote-la-loi-sur-la-protection-des-donnees-personnelles",
  },
  items: [
    { cat: "Économie", title: "La BAD annonce un financement de 800M$ pour les PME ivoiriennes dans le secteur agroalimentaire", time: "Il y a 25 min · 3 min", image: IMG.cacao, slug: "/article/la-bad-annonce-un-financement-de-800m-pour-les-pme-ivoiriennes-dans-le-secteur-agroalimentaire" },
    { cat: "Sports", title: "Ligue 1 CI : l'ASEC remporte le derby d'Abidjan 3-1, retour au sommet du classement", time: "Il y a 1h · 2 min", image: IMG.stadium, slug: "/article/ligue-1-ci-lasec-remporte-le-derby-dabidjan-3-1" },
    { cat: "Monde", title: "Nations Unies : le Conseil de sécurité se réunit en urgence sur la situation au Sahel", time: "Il y a 2h · 5 min", image: IMG.un, slug: "/article/nations-unies-le-conseil-de-securite-se-reunit-en-urgence-sur-la-situation-au-sahel" },
    { cat: "Technologie", title: "Meta déploie son service WhatsApp Pay en Côte d'Ivoire avec intégration CinetPay native", time: "Il y a 3h · 4 min", image: IMG.datacenter, slug: "/article/meta-deploie-son-service-whatsapp-pay-en-cote-divoire-avec-integration-cinetpay-native" },
    { cat: "Santé", title: "Nouveaux cas de méningite à Bouaké : le ministère de la Santé active le protocole d'urgence régional", time: "Il y a 4h · 3 min", image: IMG.health, slug: "/article/nouveaux-cas-de-meningite-a-bouake-le-ministere-de-la-sante-active-le-protocole-durgence-regional" },
  ],
};

export const VIDEOS = [
  { cat: "Économie", title: "Le port d'Abidjan : comment il est devenu le premier hub logistique d'Afrique de l'Ouest", duration: "12:34", views: "2,4k vues · Il y a 3h", image: IMG.port, slug: "/article/le-port-dabidjan-comment-il-est-devenu-le-premier-hub-logistique-dafrique-de-louest" },
  { cat: "Politique", title: "Interview exclusive : le Premier Ministre répond aux critiques sur la réforme de l'éducation", duration: "08:12", views: "5,1k vues · Il y a 5h", image: IMG.politics, slug: "/article/interview-exclusive-le-premier-ministre-repond-aux-critiques-sur-la-reforme-de-leducation" },
  { cat: "Sports", title: "Les Éléphants en route pour la CAN — reportage dans le centre de préparation de la FIF", duration: "05:47", views: "8,9k vues · Il y a 8h", image: IMG.football, slug: "/article/les-elephants-en-route-pour-la-can-reportage-dans-le-centre-de-preparation-de-la-fif" },
  { cat: "Investigation", title: "Orpaillage illégal dans le nord : le grand documentaire sur les filières clandestines", duration: "21:05", views: "14k vues · Il y a 1j", image: IMG.forest, slug: "/article/orpaillage-illegal-dans-le-nord-le-grand-documentaire-sur-les-filieres-clandestines" },
];

export const OPINIONS = [
  { accent: true, text: "La démocratie électorale ne suffit plus. Ce qu'il faut construire, c'est une démocratie de résultats — où l'accès à l'eau, à l'école et à la santé n'est pas une promesse mais un droit exigible.", initials: "PK", avatar: IMG.portrait1, name: "Prof. Paul Konan", role: "Politologue, Université Félix Houphouët-Boigny" },
  { accent: false, text: "L'Afrique ne peut plus se permettre d'importer ses propres matières premières transformées. La vraie indépendance économique commence dans nos usines, pas dans nos mines.", initials: "FM", avatar: IMG.portrait2, name: "Fatou Mbaye", role: "Économiste, Banque Mondiale — Bureau Afrique" },
  { accent: false, text: "La jeunesse africaine n'a pas besoin qu'on lui construise un avenir. Elle en construit déjà un, avec ses téléphones, ses idées et son refus d'attendre la permission des institutions.", initials: "YD", avatar: IMG.portrait3, name: "Yaya Diabaté", role: "Entrepreneur & Auteur, Abidjan" },
];

export const THEMATIC = [
  {
    title: "Technologie",
    href: "/categorie/technologie",
    main: { cat: "Technologie", title: "La 5G arrive à Abidjan : Orange CI et MTN déploient simultanément leurs réseaux en zones pilotes", image: IMG.datacenter },
    subs: [
      { num: "01", cat: "Startups", title: "InnovaCI remporte le Grand Prix de l'innovation de la francophonie 2026" },
      { num: "02", cat: "Cybersécurité", title: "Hausse de 340% des cyberattaques contre les banques ouest-africaines en 2025" },
      { num: "03", cat: "Mobile", title: "Rapport GSMA : l'Afrique comptera 1,5 milliard de connexions mobiles d'ici 2030" },
    ],
  },
  {
    title: "Sports",
    href: "/categorie/sports",
    main: { cat: "Football", title: "Didier Drogba nommé Directeur Technique Fédéral — une décision qui divise la FIF et les supporters", image: IMG.stadium },
    subs: [
      { num: "01", cat: "Basketball", title: "Les Lions de Côte d'Ivoire qualifiés pour le Mondial FIBA 2027 après leur victoire contre le Cameroun" },
      { num: "02", cat: "Boxe", title: "Souleymane Cissokho, champion WBC : la fierté retrouvée de la boxe ivoirienne" },
      { num: "03", cat: "Athlétisme", title: "JO 2028 : quatre athlètes ivoiriens qualifiés dans les disciplines phares du sprint" },
    ],
  },
];

export const STATS = [
  { num: "2", suffix: "M+", label: "Lecteurs Mensuels" },
  { num: "145", suffix: "k", label: "Abonnés Newsletter" },
  { num: "12", suffix: "+", label: "Rubriques Éditoriales" },
  { num: "48", suffix: "h", label: "Couverture Continue" },
];

export const FOOTER_COLS = {
  rubriques: [
    { label: "Actualités", href: "/categorie/actualites" },
    { label: "Politique", href: "/categorie/actualites" },
    { label: "Économie & Finance", href: "/categorie/finance" },
    { label: "Technologie", href: "/categorie/technologie" },
    { label: "Sports", href: "/categorie/sports" },
    { label: "Santé", href: "/categorie/sante" },
    { label: "Divertissement", href: "/categorie/divertissement" },
    { label: "Monde", href: "/categorie/monde" },
  ],
  presse: [
    { label: "À propos", href: "/a-propos" },
    { label: "Notre équipe", href: "/equipe" },
    { label: "Espace presse", href: "/espace-presse" },
    { label: "Publicité", href: "/publicite" },
    { label: "Charte éditoriale", href: "/charte-editoriale" },
    { label: "Carrières", href: "/carrieres" },
    { label: "Contact", href: "/contact" },
  ],
  formats: [
    { label: "Investigations", href: "/categorie/investigations" },
    { label: "Reportages", href: "/categorie/reportages-speciaux" },
    { label: "Opinions", href: "/categorie/opinion" },
    { label: "Vidéos", href: "/videos" },
    { label: "Podcasts", href: "/podcasts" },
    { label: "Infographies", href: "/categorie/multimedia" },
    { label: "Galeries Photos", href: "/categorie/multimedia" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "CGU", href: "/cgu" },
    { label: "Cookies", href: "/cookies" },
    { label: "Droit à l'oubli", href: "/confidentialite" },
  ],
};
