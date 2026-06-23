import { IMG } from "@/lib/images";

export const SEED_CATEGORIES = [
  { name: "Actualités", slug: "actualites", color: "#1a3896", order: 1, description: "L'actualité nationale et locale du Sud global" },
  { name: "Sports", slug: "sports", color: "#2D6A4F", order: 2, description: "Toute l'actualité sportive africaine" },
  { name: "Divertissement", slug: "divertissement", color: "#9B5DE5", order: 3 },
  { name: "Santé", slug: "sante", color: "#00B4D8", order: 4 },
  { name: "Finance", slug: "finance", color: "#94563c", order: 5, description: "Économie et marchés financiers" },
  { name: "Technologie", slug: "technologie", color: "#4361EE", order: 6 },
  { name: "Monde", slug: "monde", color: "#F77F00", order: 7, description: "L'actualité internationale" },
  { name: "Investigations", slug: "investigations", color: "#D62828", order: 8 },
  { name: "Opinion", slug: "opinion", color: "#6B6B6B", order: 9 },
  { name: "Multimédia", slug: "multimedia", color: "#1a3896", order: 10 },
  { name: "Local", slug: "local", color: "#588157", order: 11 },
  { name: "Reportages Spéciaux", slug: "reportages-speciaux", color: "#94563c", order: 12 },
];

export const SEED_AUTHORS = [
  { name: "Ama Kouassi", slug: "ama-kouassi", bio: "Correspondante économique — Global South Watch, Abidjan." },
  { name: "Brice Ahi", slug: "brice-ahi", bio: "Grand reporter, spécialiste agriculture et développement rural." },
  { name: "Kadi Traoré", slug: "kadi-traore", bio: "Journaliste tech et innovation en Afrique de l'Ouest." },
  { name: "Marie-Jo Bamba", slug: "marie-jo-bamba", bio: "Chroniqueuse diaspora et société." },
  { name: "Sékou Koné", slug: "sekou-kone", bio: "Correspondant politique et institutions." },
  { name: "Prof. Adjoua Mensah", slug: "adjoua-mensah", bio: "Économiste, chroniqueuse opinion." },
];

export const SEED_ALERTS = [
  { text: "Réforme fiscale UEMOA : notre enquête exclusive sur les gagnants et les perdants", link: "/article/la-grande-reforme-fiscale-ouest-africaine-qui-gagne-qui-perd-dans-luemoa", order: 1 },
  { text: "CAN 2027 : Abidjan accueillera la finale — décision officielle de la CAF", order: 2 },
  { text: "Wave et Orange Money annoncent leur fusion historique", order: 3 },
  { text: "Google inaugure son premier data center en Afrique subsaharienne à Accra", order: 4 },
  { text: "Sommet UA : feuille de route pour l'autonomie alimentaire du continent", order: 5 },
];

export interface SeedArticle {
  title: string;
  subtitle?: string;
  category: string;
  excerpt: string;
  content: string;
  tags: string[];
  image: string;
  isFeatured?: boolean;
  isTopStory?: boolean;
  isUrgent?: boolean;
  isEditorsChoice?: boolean;
  isPremium?: boolean;
  contentType?: "article" | "video" | "podcast" | "gallery";
  videoUrl?: string;
  authorIndex?: number;
}

export const SEED_ARTICLES: SeedArticle[] = [
  {
    title: "La grande réforme fiscale ouest-africaine : qui gagne, qui perd dans l'UEMOA ?",
    subtitle: "Analyse approfondie des nouvelles directives fiscales communes",
    category: "finance",
    excerpt: "Une analyse approfondie des nouvelles directives fiscales communes aux huit États membres de l'Union. Nos experts décryptent les enjeux pour les entreprises, les ménages et les gouvernements de la région.",
    content: `<p>Les États membres de l'UEMOA viennent d'adopter un paquet de réformes fiscales sans précédent depuis la création de l'union monétaire. Cette refonte touche la TVA, l'impôt sur les sociétés et les exonérations sectorielles.</p>
    <h2>Des impacts différenciés</h2>
    <p>Les PME agroalimentaires bénéficient de allègements ciblés, tandis que les secteurs extractifs voient leurs avantages fiscaux réduits progressivement sur cinq ans.</p>
    <blockquote>« Cette réforme vise à rendre le système plus équitable tout en préservant la compétitivité régionale. »</blockquote>
    <p>Nos simulations montrent un gain net pour les ménages urbains à moyens revenus, mais des tensions possibles dans les zones frontalières.</p>`,
    tags: ["UEMOA", "économie", "fiscalité", "Afrique de l'Ouest"],
    isFeatured: true,
    isTopStory: true,
    isUrgent: true,
    isEditorsChoice: true,
    isPremium: true,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
    authorIndex: 0,
  },
  {
    title: "Wave et Orange Money annoncent leur fusion : naissance du premier super-portefeuille africain",
    category: "finance",
    excerpt: "L'opération créerait une entité valorisée à plus de 8 milliards de dollars, redessinant le paysage de la FinTech sur le continent.",
    content: `<p>Deux géants du mobile money viennent d'annoncer leur intention de fusionner. L'entité résultante couvrirait 24 pays et plus de 180 millions d'utilisateurs actifs.</p>
    <h2>Une consolidation attendue</h2>
    <p>Les régulateurs BCEAO et ARTP devront valider l'opération d'ici la fin de l'année. Les analystes anticipent des synergies majeures sur les transferts transfrontaliers.</p>`,
    tags: ["FinTech", "Mobile Money", "fusion", "Afrique"],
    isTopStory: true,
    isUrgent: true,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
    authorIndex: 0,
  },
  {
    title: "CAN 2027 : le stade Félix Houphouët-Boigny accueillera la finale, capacité portée à 60 000",
    category: "sports",
    excerpt: "La CAF a confirmé qu'Abidjan sera le théâtre de la finale du tournoi continental, après des travaux d'extension du stade emblématique.",
    content: `<p>La Côte d'Ivoire accueillera la finale de la CAN 2027 au stade Félix Houphouët-Boigny, dont la capacité sera portée à 60 000 places. Un investissement de 120 millions d'euros est prévu.</p>`,
    tags: ["CAN2027", "football", "Abidjan", "sport"],
    isTopStory: true,
    isUrgent: true,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop",
    authorIndex: 2,
  },
  {
    title: "Abidjan Tech Valley : 40 startups sélectionnées pour l'accélérateur continental 2026",
    category: "technologie",
    excerpt: "Le programme sélectionne les startups les plus prometteuses d'Afrique de l'Ouest pour un accompagnement de 12 mois et un fonds de 2M$.",
    content: `<p>Quarante startups issues de 15 pays ont été retenues pour la promotion 2026 d'Abidjan Tech Valley. Les secteurs dominants : agritech, santé numérique et énergie propre.</p>`,
    tags: ["startups", "tech", "Abidjan", "innovation"],
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    authorIndex: 2,
  },
  {
    title: "Sommet de l'UA : le continent adopte une feuille de route pour l'autonomie alimentaire",
    category: "monde",
    excerpt: "Les chefs d'État africains ont adopté un plan quinquennal visant à réduire de 50% les importations alimentaires d'ici 2031.",
    content: `<p>Le sommet extraordinaire de l'Union africaine a abouti à un accord historique sur l'autonomie alimentaire. Le plan prévoit 25 milliards de dollars d'investissements publics et privés.</p>`,
    tags: ["UA", "agriculture", "autonomie alimentaire", "Afrique"],
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=800&fit=crop",
    authorIndex: 4,
  },
  {
    title: "Détournement de fonds publics : trois ministres mis en examen dans l'affaire des marchés de construction",
    category: "investigations",
    excerpt: "Notre enquête de huit mois révèle un système de surfacturation massif dans les grands chantiers d'infrastructure.",
    content: `<p>Trois anciens ministres ont été mis en examen dans le cadre d'une vaste enquête sur les marchés publics de construction. Le préjudice estimé dépasse les 400 millions d'euros.</p>
    <h2>Un réseau tentaculaire</h2>
    <p>Des sociétés écrans basées à Dubai et Genève auraient servi à blanchir les fonds détournés sur cinq ans.</p>`,
    tags: ["enquête", "corruption", "infrastructure"],
    isTopStory: true,
    isUrgent: true,
    isEditorsChoice: true,
    isPremium: true,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop",
    authorIndex: 1,
  },
  {
    title: "Ces agriculteurs ivoiriens qui transforment le cacao en chocolat haut de gamme",
    category: "reportages-speciaux",
    excerpt: "Une nouvelle génération de cacaoculteurs bouscule les règles du marché mondial du chocolat depuis les plantations du Bélier.",
    content: `<p>Dans la région du Bélier, des coopératives familiales produisent désormais du chocolat bean-to-bar exporté vers l'Europe et l'Asie. Un modèle qui remet en question la domination des grands transformateurs.</p>`,
    tags: ["cacao", "agriculture", "chocolat", "Côte d'Ivoire"],
    isEditorsChoice: true,
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200&h=800&fit=crop",
    authorIndex: 1,
  },
  {
    title: "Vaccin antipaludisme RTS,S : la Côte d'Ivoire lance sa campagne nationale de vaccination de masse",
    category: "sante",
    excerpt: "Le ministère de la Santé vise 2,5 millions d'enfants vaccinés dans les six premiers mois de la campagne.",
    content: `<p>La Côte d'Ivoire devient le premier pays francophone d'Afrique de l'Ouest à lancer une campagne de vaccination de masse contre le paludisme avec le vaccin RTS,S.</p>`,
    tags: ["santé", "paludisme", "vaccination"],
    isTopStory: true,
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&h=800&fit=crop",
    authorIndex: 5,
  },
  {
    title: "Google dévoile son premier data center d'Afrique subsaharienne, installé à Accra",
    category: "technologie",
    excerpt: "L'investissement de 600 millions de dollars positionne le Ghana comme hub numérique régional.",
    content: `<p>Google a inauguré son premier data center en Afrique subsaharienne à Accra. L'installation alimentera les services cloud pour l'ensemble de la région ouest-africaine.</p>`,
    tags: ["Google", "data center", "Ghana", "tech"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
    authorIndex: 2,
  },
  {
    title: "Le Parlement vote la loi sur la protection des données personnelles",
    subtitle: "Première en Afrique de l'Ouest francophone",
    category: "actualites",
    excerpt: "Le texte transpose les standards internationaux de protection des données et crée une autorité de contrôle indépendante.",
    content: `<p>Le Parlement a adopté à une large majorité la loi sur la protection des données personnelles, une première dans l'espace francophone ouest-africain.</p>`,
    tags: ["données personnelles", "politique", "RGPD"],
    isTopStory: true,
    isUrgent: true,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
    authorIndex: 4,
  },
  {
    title: "L'IA au service de l'agriculture : Agrotech CI déploie son assistant vocal en dioula et baoulé",
    category: "technologie",
    excerpt: "L'application permet aux agriculteurs d'obtenir des conseils personnalisés sur les cultures, la météo et les prix du marché.",
    content: `<p>Agrotech CI lance un assistant vocal multilingue destiné aux petits producteurs. L'outil fonctionne hors connexion et couvre 12 cultures principales.</p>`,
    tags: ["IA", "agriculture", "innovation"],
    isEditorsChoice: true,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop",
    authorIndex: 2,
  },
  {
    title: "Faut-il repenser le modèle de la dette publique en Afrique francophone ?",
    category: "opinion",
    excerpt: "Une perspective économiste sur les limites du modèle actuel et les alternatives possibles pour les États du Sud global.",
    content: `<p>La dette publique africaine a doublé en dix ans. Il est temps de repenser les mécanismes d'emprunt et les conditions de remboursement pour libérer des ressources pour le développement.</p>`,
    tags: ["dette", "économie", "opinion"],
    isEditorsChoice: true,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop",
    authorIndex: 5,
  },
  {
    title: "Ivoiriens de France : comment la deuxième génération réinvente le lien avec le pays",
    category: "reportages-speciaux",
    excerpt: "Portraits croisés de huit jeunes Franco-Ivoiriens qui ont fait le choix du retour au pays pour entreprendre.",
    content: `<p>Ils ont grandi en banlieue parisienne et ont choisi de revenir à Abidjan pour lancer leur startup ou reprendre une exploitation familiale. Huit parcours qui racontent une diaspora en mutation.</p>`,
    tags: ["diaspora", "retour", "entrepreneuriat"],
    isEditorsChoice: true,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop",
    authorIndex: 3,
  },
  {
    title: "Le port d'Abidjan : comment il est devenu le premier hub logistique d'Afrique de l'Ouest",
    category: "multimedia",
    excerpt: "Reportage vidéo sur la transformation du port en plateforme logistique continentale.",
    content: `<p>Avec 25 millions de tonnes de fret traitées par an, le port d'Abidjan s'impose comme la porte d'entrée commerciale de l'hinterland ouest-africain.</p>`,
    tags: ["port", "logistique", "économie", "Abidjan"],
    contentType: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isFeatured: true,
    isTopStory: true,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=800&fit=crop",
    authorIndex: 1,
  },
  {
    title: "Grand Bassam classée au patrimoine mondial : l'UNESCO officialise l'extension du site colonial",
    category: "local",
    excerpt: "L'extension du site historique de Grand-Bassam renforce l'attractivité touristique et patrimoniale de la Côte d'Ivoire.",
    content: `<p>L'UNESCO a officialisé l'extension du site de Grand-Bassam au patrimoine mondial, incluant de nouveaux bâtiments coloniaux restaurés.</p>`,
    tags: ["UNESCO", "patrimoine", "tourisme", "Grand-Bassam"],
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&h=800&fit=crop",
    authorIndex: 3,
  },
  {
    title: "L'ONU adopte une résolution historique sur la dette souveraine des pays en développement",
    category: "monde",
    excerpt: "Le Conseil de sécurité appelle à une restructuration coordonnée de la dette des pays les plus vulnérables.",
    content: `<p>Une résolution historique sur la dette souveraine a été adoptée à l'ONU, ouvrant la voie à des mécanismes de restructuration plus équitables pour les pays du Sud global.</p>`,
    tags: ["ONU", "dette", "développement"],
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?w=1200&h=800&fit=crop",
    authorIndex: 4,
  },
  {
    title: "Ligue 1 CI : l'ASEC remporte le derby d'Abidjan 3-1",
    category: "sports",
    excerpt: "L'ASEC Mimosas s'impose face à l'Africa Sports et reprend la tête du championnat ivoirien.",
    content: `<p>Dans un derby d'Abidjan bouillant, l'ASEC s'est imposée 3-1 face à l'Africa Sports au stade Robert-Champroux devant 25 000 spectateurs.</p>`,
    tags: ["football", "ASEC", "Ligue 1", "Abidjan"],
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=800&fit=crop",
    authorIndex: 2,
  },
  {
    title: "Déforestation du Sassandra : l'enquête qui révèle l'ampleur réelle des pertes forestières",
    category: "investigations",
    excerpt: "Des images satellite et des témoignages locaux documentent une déforestation accélérée depuis 2020.",
    content: `<p>Notre enquête croise des images satellite, des données douanières et des témoignages de villageois pour quantifier les pertes forestières dans la région du Sassandra.</p>`,
    tags: ["environnement", "déforestation", "enquête"],
    isEditorsChoice: true,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=800&fit=crop",
    authorIndex: 1,
  },
  {
    title: "Global South Talks : la dette africaine sous le microscope des économistes",
    category: "opinion",
    excerpt: "Épisode podcast avec trois experts sur la restructuration de la dette souveraine en Afrique.",
    content: `<p>Dans cet épisode, nos invités débattent des mécanismes de restructuration, du rôle du FMI et des alternatives proposées par les pays du Sud global.</p>`,
    tags: ["podcast", "dette", "économie"],
    contentType: "podcast",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=800&fit=crop",
    authorIndex: 5,
  },
  {
    title: "La BAD annonce un financement de 800M$ pour les PME ivoiriennes dans le secteur agroalimentaire",
    category: "finance",
    excerpt: "La Banque africaine de développement débloque une enveloppe majeure pour la transformation locale et l'export agroalimentaire.",
    content: `<p>La BAD confirme un prêt de 800 millions de dollars pour soutenir les PME ivoiriennes.</p>`,
    tags: ["BAD", "PME", "agroalimentaire"],
    image: IMG.agriculture,
    authorIndex: 0,
  },
  {
    title: "Nations Unies : le Conseil de sécurité se réunit en urgence sur la situation au Sahel",
    category: "monde",
    excerpt: "La détérioration sécuritaire au Sahel place l'ONU face à un dilemme humanitaire et politique.",
    content: `<p>Le Conseil de sécurité se réunit en session extraordinaire sur la crise au Sahel.</p>`,
    tags: ["ONU", "Sahel", "sécurité"],
    isUrgent: true,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=800&fit=crop",
    authorIndex: 4,
  },
  {
    title: "Meta déploie son service WhatsApp Pay en Côte d'Ivoire avec intégration CinetPay native",
    category: "technologie",
    excerpt: "Le paiement via WhatsApp arrive en Côte d'Ivoire grâce à un partenariat avec CinetPay.",
    content: `<p>Meta lance WhatsApp Pay en Côte d'Ivoire avec CinetPay.</p>`,
    tags: ["Meta", "WhatsApp", "FinTech"],
    image: IMG.tech,
    authorIndex: 2,
  },
  {
    title: "Nouveaux cas de méningite à Bouaké : le ministère de la Santé active le protocole d'urgence régional",
    category: "sante",
    excerpt: "Face à la recrudescence des cas, les autorités sanitaires déploient un dispositif d'urgence.",
    content: `<p>Protocole d'urgence activé après de nouveaux cas de méningite à Bouaké.</p>`,
    tags: ["santé", "méningite", "Bouaké"],
    isUrgent: true,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=800&fit=crop",
    authorIndex: 5,
  },
  {
    title: "Interview exclusive : le Premier Ministre répond aux critiques sur la réforme de l'éducation",
    category: "actualites",
    excerpt: "Le Premier Ministre détaille la feuille de route de la réforme éducative nationale.",
    content: `<p>Entretien exclusif sur la réforme de l'éducation.</p>`,
    tags: ["politique", "éducation", "interview"],
    contentType: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop",
    authorIndex: 4,
  },
  {
    title: "Les Éléphants en route pour la CAN — reportage dans le centre de préparation de la FIF",
    category: "sports",
    excerpt: "Immersion au centre de préparation de l'équipe nationale ivoirienne.",
    content: `<p>Reportage au centre de préparation de la FIF.</p>`,
    tags: ["CAN", "football"],
    contentType: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop",
    authorIndex: 2,
  },
  {
    title: "Orpaillage illégal dans le nord : le grand documentaire sur les filières clandestines",
    category: "investigations",
    excerpt: "Documentaire sur les réseaux d'orpaillage illégal et leurs conséquences.",
    content: `<p>Enquête vidéo sur l'orpaillage clandestin dans le nord du pays.</p>`,
    tags: ["enquête", "orpaillage"],
    contentType: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=800&fit=crop",
    authorIndex: 1,
  },
];

export const SEED_NEWSLETTER = [
  { email: "lecteur1@example.com", preferences: ["general", "finance"] },
  { email: "lecteur2@example.com", preferences: ["sports", "general"] },
  { email: "redaction@globalsouthwatch.test", preferences: ["investigations", "opinion"] },
];
