import slugify from "slugify";

interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

interface ArticleBodySpec {
  sections: ArticleSection[];
  quote?: { text: string; author?: string };
  list?: { title: string; items: string[] };
}

function renderBody(excerpt: string, spec: ArticleBodySpec): string {
  const parts: string[] = [`<p class="article-lead">${excerpt}</p>`];

  for (const section of spec.sections) {
    parts.push(`<h2>${section.heading}</h2>`);
    for (const p of section.paragraphs) {
      parts.push(`<p>${p}</p>`);
    }
  }

  if (spec.quote) {
    const cite = spec.quote.author
      ? `<cite>— ${spec.quote.author}</cite>`
      : "";
    parts.push(`<blockquote><p>${spec.quote.text}</p>${cite}</blockquote>`);
  }

  if (spec.list) {
    parts.push(`<h3>${spec.list.title}</h3><ul>`);
    for (const item of spec.list.items) {
      parts.push(`<li>${item}</li>`);
    }
    parts.push("</ul>");
  }

  return parts.join("\n");
}

const ARTICLE_BODIES: Record<string, ArticleBodySpec> = {
  "la-grande-reforme-fiscale-ouest-africaine-qui-gagne-qui-perd-dans-luemoa": {
    sections: [
      {
        heading: "Un tournant fiscal pour l'UEMOA",
        paragraphs: [
          "Les huit États membres de l'Union économique et monétaire ouest-africaine viennent d'adopter un paquet de réformes fiscales coordonnées, la plus vaste depuis la création de l'union monétaire. Le texte harmonise la TVA, révise l'impôt sur les sociétés et redéfinit les exonérations sectorielles qui, pendant des décennies, ont structuré l'attractivité régionale.",
          "Pour les entreprises transfrontalières, la mesure la plus attendue concerne l'alignement des taux de TVA sur les services numériques et la simplification des déclarations via une plateforme unique BCEAO-UEMOA, dont le déploiement est prévu sur dix-huit mois.",
        ],
      },
      {
        heading: "Qui gagne, qui perd ?",
        paragraphs: [
          "Les PME agroalimentaires bénéficient d'allègements ciblés sur les investissements en transformation locale. À l'inverse, les secteurs extractifs et certains grands importateurs voient leurs régimes dérogatoires réduits progressivement sur cinq ans, avec un calendrier échelonné pour limiter les chocs sur l'emploi.",
          "Nos simulations, réalisées avec des données douanières 2020-2025, montrent un gain net pour les ménages urbains à revenus moyens grâce à la baisse de certaines taxes indirectes. En revanche, les zones frontalières où le commerce informel reste structurant pourraient subir des tensions à court terme.",
        ],
      },
      {
        heading: "La réaction des capitales",
        paragraphs: [
          "À Abidjan, le gouvernement ivoirien a salué une « modernisation nécessaire » tout en annonçant un fonds de transition de 120 milliards FCFA pour accompagner les TPE. À Dakar et à Lomé, les oppositions réclament des études d'impact parlementaires plus transparentes avant la ratification finale.",
        ],
      },
    ],
    quote: {
      text: "Cette réforme vise à rendre le système plus équitable tout en préservant la compétitivité régionale.",
      author: "Commission UEMOA",
    },
    list: {
      title: "Points clés du texte",
      items: [
        "Harmonisation progressive de la TVA sur les services numériques",
        "Réduction des exonérations extractives sur cinq ans",
        "Plateforme unique de déclaration fiscale régionale",
        "Fonds de transition pour les PME agroalimentaires",
      ],
    },
  },
  "wave-et-orange-money-annoncent-leur-fusion-naissance-du-premier-super-portefeuille-africain": {
    sections: [
      {
        heading: "Une consolidation historique",
        paragraphs: [
          "Wave et Orange Money ont officialisé leur projet de fusion, qui créerait la plus grande entité de mobile money du continent avec plus de 180 millions d'utilisateurs actifs dans 24 pays. Valorisation annoncée : plus de 8 milliards de dollars.",
          "L'opération répond à une pression réglementaire croissante de la BCEAO et à la concurrence des acteurs globaux du paiement digital qui cherchent à s'implanter en Afrique de l'Ouest.",
        ],
      },
      {
        heading: "Enjeux pour les utilisateurs",
        paragraphs: [
          "Les transferts transfrontaliers, aujourd'hui coûteux et lents, pourraient être simplifiés avec un réseau unique. Les analystes estiment une baisse moyenne de 15 à 25 % des frais sur les corridors UEMOA d'ici deux ans, si l'autorité de la concurrence valide les engagements proposés.",
        ],
      },
    ],
    quote: {
      text: "Nous construisons l'infrastructure de paiement que l'Afrique de l'Ouest mérite.",
    },
  },
  "can-2027-le-stade-felix-houphouet-boigny-accueillera-la-finale-capacite-portee-a-60-000": {
    sections: [
      {
        heading: "Abidjan au centre du continent",
        paragraphs: [
          "La CAF a confirmé qu'Abidjan accueillera la finale de la CAN 2027. Le stade Félix Houphouët-Boigny verra sa capacité portée de 45 000 à 60 000 places après des travaux estimés à 120 millions d'euros.",
          "Cette décision consacre la Côte d'Ivoire comme hub sportif majeur, après l'organisation réussie de la CAN 2024 et les investissements massifs dans les infrastructures de transport autour du plateau d'Abidjan.",
        ],
      },
      {
        heading: "Retombées économiques attendues",
        paragraphs: [
          "Le ministère des Sports projette 250 000 visiteurs additionnels sur la période du tournoi et un impact direct de 180 milliards FCFA sur l'hôtellerie, la restauration et les services. Les autorités locales préparent déjà un plan de mobilité spécifique incluant navettes fluviales et extension du métro d'Abidjan.",
        ],
      },
    ],
  },
  "abidjan-tech-valley-40-startups-selectionnees-pour-laccelerateur-continental-2026": {
    sections: [
      {
        heading: "Une promotion panafricaine",
        paragraphs: [
          "Quarante startups issues de quinze pays ont été retenues pour la promotion 2026 d'Abidjan Tech Valley. Le programme offre douze mois d'accompagnement, un fonds de 2 millions de dollars et un accès privilégié aux investisseurs de la diaspora tech.",
          "Les secteurs dominants cette année : agritech, santé numérique et énergie propre — un reflet des priorités de développement de la région.",
        ],
      },
      {
        heading: "Focus sur trois lauréates",
        paragraphs: [
          "AgroVoice (Côte d'Ivoire) propose des conseils agricoles par SMS vocal en langues locales. MedConnect (Sénégal) digitalise le parcours de soins en zone rurale. SolarGrid (Ghana) déploie des micro-réseaux solaires pour les marchés alimentaires.",
        ],
      },
    ],
  },
  "sommet-de-lua-le-continent-adopte-une-feuille-de-route-pour-l-autonomie-alimentaire": {
    sections: [
      {
        heading: "Un plan quinquennal ambitieux",
        paragraphs: [
          "Les chefs d'État africains ont adopté une feuille de route visant à réduire de 50 % les importations alimentaires d'ici 2031. Le plan mobilise 25 milliards de dollars d'investissements publics et privés, avec un accent sur les semences locales, l'irrigation et la transformation agroalimentaire.",
        ],
      },
      {
        heading: "Défis de mise en œuvre",
        paragraphs: [
          "Les experts soulignent l'écart entre les annonces et les capacités de financement réelles. La sécurisation des terres, l'accès au crédit agricole et la résilience climatique restent les trois verrous identifiés par la FAO dans son rapport d'accompagnement.",
        ],
      },
    ],
  },
  "detournement-de-fonds-publics-trois-ministres-mis-en-examen-dans-laffaire-des-marches-de-construction": {
    sections: [
      {
        heading: "Huit mois d'investigation",
        paragraphs: [
          "Notre enquête a documenté un système de surfacturation massif sur les grands chantiers d'infrastructure lancés entre 2019 et 2024. Trois anciens ministres ont été mis en examen ; le préjudice estimé dépasse 400 millions d'euros.",
          "Des sociétés écrans basées à Dubaï et Genève auraient servi à blanchir les fonds détournés via des factures de prestations fictives et des contrats de sous-traitance gonflés.",
        ],
      },
      {
        heading: "Le mécanisme",
        paragraphs: [
          "Le schéma repose sur la multiplication des avenants contractuels après attribution des marchés, une pratique difficile à détecter sans audit indépendant. Les documents que nous avons pu consulter montrent des écarts de 30 à 70 % entre les devis initiaux et les montants finalement payés.",
        ],
      },
    ],
    quote: {
      text: "La transparence sur les marchés publics n'est pas un luxe démocratique — c'est une condition de souveraineté économique.",
      author: "Magistrat instructeur",
    },
  },
  "ces-agriculteurs-ivoiriens-qui-transforment-le-cacao-en-chocolat-haut-de-gamme": {
    sections: [
      {
        heading: "Du bean au barreau",
        paragraphs: [
          "Dans la région du Bélier, des coopératives familiales produisent, fermentent et exportent leur propre chocolat bean-to-bar vers l'Europe et l'Asie. Ce modèle remet en question la domination des grands transformateurs qui captent la majeure partie de la valeur ajoutée du cacao ivoirien.",
          "« Nous ne vendons plus une matière première — nous vendons une histoire, un terroir et une qualité », explique Kouamé N'Guessan, président du collectif Bélier Cacao.",
        ],
      },
      {
        heading: "Des défis logistiques",
        paragraphs: [
          "Le froid et la certification bio restent des obstacles. Pourtant, les barres premium se vendent jusqu'à 12 euros en boutique spécialisée à Paris, soit dix fois le prix du cacao brut au kilo.",
        ],
      },
    ],
  },
  "vaccin-antipaludisme-rtss-la-cote-divoire-lance-sa-campagne-nationale-de-vaccination-de-masse": {
    sections: [
      {
        heading: "Une première régionale",
        paragraphs: [
          "La Côte d'Ivoire devient le premier pays francophone d'Afrique de l'Ouest à lancer une campagne de vaccination de masse contre le paludisme avec le vaccin RTS,S. Objectif : 2,5 millions d'enfants vaccinés en six mois.",
        ],
      },
      {
        heading: "Organisation sur le terrain",
        paragraphs: [
          "Le ministère de la Santé a mobilisé 3 200 équipes mobiles et renforcé la chaîne du froid dans 82 districts. Les autorités insistent sur la complémentarité vaccin / moustiquaire / diagnostic précoce.",
        ],
      },
    ],
  },
  "google-devoile-son-premier-data-center-dafrique-subsaharienne-installe-a-accra": {
    sections: [
      {
        heading: "600 millions de dollars investis",
        paragraphs: [
          "Google a inauguré son premier data center en Afrique subsaharienne à Accra. L'installation alimentera les services cloud pour l'ensemble de la région ouest-africaine et créera 1 200 emplois directs et indirects.",
        ],
      },
      {
        heading: "Souveraineté numérique",
        paragraphs: [
          "Le Ghana se positionne comme hub numérique régional, mais les débats sur la localisation des données sensibles et la consommation énergétique des centres de calcul restent vifs dans la société civile.",
        ],
      },
    ],
  },
  "le-parlement-vote-la-loi-sur-la-protection-des-donnees-personnelles": {
    sections: [
      {
        heading: "Un cadre inédit en zone francophone",
        paragraphs: [
          "Le Parlement a adopté à une large majorité la loi sur la protection des données personnelles, transposant les standards internationaux et créant une autorité de contrôle indépendante.",
          "Les entreprises disposeront de dix-huit mois pour se mettre en conformité. Les sanctions peuvent atteindre 5 % du chiffre d'affaires annuel pour les manquements les plus graves.",
        ],
      },
      {
        heading: "Impact sur la tech",
        paragraphs: [
          "Les acteurs du mobile money et de la publicité ciblée sont particulièrement concernés. Les juristes recommandent des audits internes immédiats et la nomination d'un délégué à la protection des données.",
        ],
      },
    ],
  },
  "lia-au-service-de-lagriculture-agrotech-ci-deploie-son-assistant-vocal-en-dioula-et-baoule": {
    sections: [
      {
        heading: "L'IA en langues locales",
        paragraphs: [
          "Agrotech CI lance un assistant vocal multilingue destiné aux petits producteurs. L'outil fonctionne hors connexion sur téléphones basiques et couvre douze cultures principales, de l'anacarde au cacao.",
        ],
      },
      {
        heading: "Résultats pilotes",
        paragraphs: [
          "Dans le centre du pays, les rendements de maïs ont progressé de 18 % sur la saison pilote grâce à des conseils personnalisés sur les dates de semis et les doses d'engrais.",
        ],
      },
    ],
  },
  "faut-il-repenser-le-modele-de-la-dette-publique-en-afrique-francophone": {
    sections: [
      {
        heading: "Une dette qui a doublé",
        paragraphs: [
          "La dette publique africaine a doublé en dix ans. Les taux d'intérêt globaux et la dépréciation de certaines monnaies locales aggravent le service de la dette, au détriment des dépenses sociales.",
        ],
      },
      {
        heading: "Vers de nouveaux instruments",
        paragraphs: [
          "L'auteure plaide pour des clauses de suspension en cas de choc climatique, une meilleure transparence sur les prêts garantis par des ressources naturelles et un renforcement des capacités fiscales plutôt que de nouveaux emprunts commerciaux.",
        ],
      },
    ],
    quote: {
      text: "Endetter l'avenir climatique du continent pour financer des infrastructures d'hier n'est plus tenable.",
      author: "Prof. Adjoua Mensah",
    },
  },
  "ivoiriens-de-france-comment-la-deuxieme-generation-reinvente-le-lien-avec-le-pays": {
    sections: [
      {
        heading: "Huit parcours de retour",
        paragraphs: [
          "Ils ont grandi en banlieue parisienne et ont choisi de revenir à Abidjan pour lancer leur startup ou reprendre une exploitation familiale. Huit portraits croisés d'une diaspora en mutation.",
        ],
      },
      {
        heading: "Entre deux cultures",
        paragraphs: [
          "Le retour n'est jamais simple : reconnaissance des diplômes, bureaucratie, attentes familiales. Pourtant, beaucoup y voient une opportunité de contribuer à la transformation économique du pays avec des compétences acquises en Europe.",
        ],
      },
    ],
  },
  "le-port-dabidjan-comment-il-est-devenu-le-premier-hub-logistique-dafrique-de-louest": {
    sections: [
      {
        heading: "25 millions de tonnes par an",
        paragraphs: [
          "Avec 25 millions de tonnes de fret traitées par an, le port d'Abidjan s'impose comme la porte d'entrée commerciale de l'hinterland ouest-africain, desservant le Mali, le Burkina Faso et le Niger.",
        ],
      },
      {
        heading: "Modernisation en cours",
        paragraphs: [
          "Le terminal à conteneurs du Vridi a doublé de capacité. Un corridor logistique numérique permet désormais le suivi en temps réel des cargaisons, réduisant les délais de dédouanement de 40 % pour les opérateurs agréés.",
        ],
      },
    ],
  },
  "grand-bassam-classee-au-patrimoine-mondial-lunesco-officialise-lextension-du-site-colonial": {
    sections: [
      {
        heading: "Extension du site UNESCO",
        paragraphs: [
          "L'UNESCO a officialisé l'extension du site historique de Grand-Bassam, incluant de nouveaux bâtiments coloniaux restaurés et le quartier France, cœur touristique de la ville.",
        ],
      },
      {
        heading: "Tourisme et mémoire",
        paragraphs: [
          "Les autorités locales espèrent doubler la fréquentation touristique d'ici 2030 tout en préservant la authenticité architecturale. Un plan de gestion des flux visiteurs entre en vigueur dès la prochaine haute saison.",
        ],
      },
    ],
  },
  "lonu-adopte-une-resolution-historique-sur-la-dette-souveraine-des-pays-en-developpement": {
    sections: [
      {
        heading: "Un vote symbolique fort",
        paragraphs: [
          "L'Assemblée générale de l'ONU a adopté une résolution appelant à une restructuration coordonnée de la dette des pays les plus vulnérables, ouvrant la voie à des mécanismes plus équitables pour le Sud global.",
        ],
      },
      {
        heading: "Limites du texte",
        paragraphs: [
          "La résolution n'est pas contraignante pour les créanciers privés. Les ONG saluent néanmoins un changement de narratif qui pourrait faciliter des négociations futures.",
        ],
      },
    ],
  },
  "ligue-1-ci-lasec-remporte-le-derby-dabidjan-3-1": {
    sections: [
      {
        heading: "Un derby bouillant",
        paragraphs: [
          "L'ASEC Mimosas s'est imposée 3-1 face à l'Africa Sports au stade Robert-Champroux devant 25 000 spectateurs. Un doublé de l'attaquant ivoirien a renversé le match après une entame difficile des Mimosas.",
        ],
      },
      {
        heading: "Course au titre",
        paragraphs: [
          "Ce succès permet à l'ASEC de reprendre la tête du championnat avec deux points d'avance sur le WAC, à trois journées de la fin de la phase régulière.",
        ],
      },
    ],
  },
  "deforestation-du-sassandra-lenquete-qui-revele-lampleur-reelle-des-pertes-forestieres": {
    sections: [
      {
        heading: "Des images satellite accablantes",
        paragraphs: [
          "Notre enquête croise imagerie satellite, données douanières et témoignages de villageois pour quantifier les pertes forestières dans la région du Sassandra depuis 2020 : plus de 47 000 hectares déforestés, soit une hausse de 34 % par rapport à la décennie précédente.",
        ],
      },
      {
        heading: "Filières impliquées",
        paragraphs: [
          "L'expansion des plantations de palmier à huile et l'exploitation illégale de bois précieux alimentent la déforestation. Les autorités annoncent un renforcement des patrouilles, mais les habitants restent sceptiques face à l'ampleur des réseaux.",
        ],
      },
    ],
  },
  "global-south-talks-la-dette-africaine-sous-le-microscope-des-economistes": {
    sections: [
      {
        heading: "Épisode spécial podcast",
        paragraphs: [
          "Dans cet épisode de Global South Talks, trois économistes débattent des mécanismes de restructuration, du rôle du FMI et des alternatives proposées par les pays du Sud global pour sortir de l'ornière de la dette.",
        ],
      },
    ],
  },
  "la-bad-annonce-un-financement-de-800m-pour-les-pme-ivoiriennes-dans-le-secteur-agroalimentaire": {
    sections: [
      {
        heading: "800 millions pour l'agroalimentaire",
        paragraphs: [
          "La Banque africaine de développement débloque une enveloppe destinée aux PME ivoiriennes de transformation agroalimentaire, avec un accent sur l'anacarde, le cacao et les fruits tropicaux à export.",
          "Le dispositif prévoit des taux préférentiels et un accompagnement technique pour la certification qualité et l'accès aux marchés européens.",
        ],
      },
    ],
  },
  "nations-unies-le-conseil-de-securite-se-reunit-en-urgence-sur-la-situation-au-sahel": {
    sections: [
      {
        heading: "Session extraordinaire",
        paragraphs: [
          "Le Conseil de sécurité de l'ONU se réunit en urgence alors que la situation sécuritaire et humanitaire se dégrade dans plusieurs pays du Sahel. Les États du Sud global demandent un renforcement des opérations de maintien de la paix et un accès humanitaire élargi.",
        ],
      },
    ],
  },
  "meta-deploie-son-service-whatsapp-pay-en-cote-divoire-avec-integration-cinetpay-native": {
    sections: [
      {
        heading: "Paiement intégré dans WhatsApp",
        paragraphs: [
          "Meta lance WhatsApp Pay en Côte d'Ivoire via un partenariat avec CinetPay, permettant des paiements P2P et marchands directement dans l'application de messagerie la plus utilisée du pays.",
        ],
      },
    ],
  },
  "nouveaux-cas-de-meningite-a-bouake-le-ministere-de-la-sante-active-le-protocole-durgence-regional": {
    sections: [
      {
        heading: "Protocole d'urgence",
        paragraphs: [
          "Après une recrudescence des cas de méningite à Bouaké, le ministère de la Santé active un protocole d'urgence régional incluant vaccination ciblée, surveillance épidémiologique renforcée et campagne de sensibilisation.",
        ],
      },
    ],
  },
  "interview-exclusive-le-premier-ministre-repond-aux-critiques-sur-la-reforme-de-leducation": {
    sections: [
      {
        heading: "Réforme éducative",
        paragraphs: [
          "Dans cet entretien exclusif, le Premier Ministre répond aux critiques sur la réforme de l'éducation et détaille le calendrier de déploiement dans les établissements publics.",
        ],
      },
    ],
  },
  "les-elephants-en-route-pour-la-can-reportage-dans-le-centre-de-preparation-de-la-fif": {
    sections: [
      {
        heading: "Préparation CAN",
        paragraphs: [
          "Reportage au centre de préparation de la Fédération ivoirienne de football où les Éléphants peaufinent leur collectif à quelques mois de la CAN 2027.",
        ],
      },
    ],
  },
  "orpaillage-illegal-dans-le-nord-le-grand-documentaire-sur-les-filieres-clandestines": {
    sections: [
      {
        heading: "Documentaire d'investigation",
        paragraphs: [
          "Notre équipe a suivi pendant six mois les filières clandestines d'orpaillage dans le nord du pays, documentant l'impact environnemental et les réseaux d'exportation parallèles.",
        ],
      },
    ],
  },
};

export function resolveArticleContent(
  title: string,
  excerpt: string,
  fallbackHtml: string
): string {
  const slug = slugify(title, { lower: true, strict: true });
  const spec = ARTICLE_BODIES[slug];
  if (!spec) return fallbackHtml;
  return renderBody(excerpt, spec);
}

export function getArticleBodySlugs(): string[] {
  return Object.keys(ARTICLE_BODIES);
}
