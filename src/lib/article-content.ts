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
        heading: "A fiscal turning point for WAEMU",
        paragraphs: [
          "The eight member states of the West African Economic and Monetary Union have just adopted a package of coordinated tax reforms—the largest since the monetary union was created. The legislation harmonizes VAT, revises corporate income tax, and redefines sectoral exemptions that, for decades, have shaped regional competitiveness.",
          "For cross-border businesses, the most anticipated measure concerns the alignment of VAT rates on digital services and the simplification of filings through a single BCEAO-WAEMU platform, scheduled for rollout over eighteen months.",
        ],
      },
      {
        heading: "Who wins, who loses?",
        paragraphs: [
          "Agri-food SMEs benefit from targeted relief on local processing investments. Conversely, extractive sectors and certain large importers see their preferential regimes gradually reduced over five years, with a phased timetable to limit shocks to employment.",
          "Our simulations, based on customs data from 2020–2025, show a net gain for urban middle-income households thanks to lower indirect taxes. However, border areas where informal trade remains structural could face short-term tensions.",
        ],
      },
      {
        heading: "Reaction from the capitals",
        paragraphs: [
          "In Abidjan, the Ivorian government welcomed a \"necessary modernization\" while announcing a 120 billion FCFA transition fund to support micro-enterprises. In Dakar and Lomé, opposition parties are calling for more transparent parliamentary impact studies before final ratification.",
        ],
      },
    ],
    quote: {
      text: "This reform aims to make the system fairer while preserving regional competitiveness.",
      author: "WAEMU Commission",
    },
    list: {
      title: "Key points of the legislation",
      items: [
        "Gradual harmonization of VAT on digital services",
        "Reduction of extractive-sector exemptions over five years",
        "Single regional tax filing platform",
        "Transition fund for agri-food SMEs",
      ],
    },
  },
  "wave-et-orange-money-annoncent-leur-fusion-naissance-du-premier-super-portefeuille-africain": {
    sections: [
      {
        heading: "A historic consolidation",
        paragraphs: [
          "Wave and Orange Money have formalized their merger plan, which would create the continent's largest mobile money entity with more than 180 million active users across 24 countries. Announced valuation: over $8 billion.",
          "The deal responds to growing regulatory pressure from the BCEAO and competition from global digital payment players seeking to establish themselves in West Africa.",
        ],
      },
      {
        heading: "What's at stake for users",
        paragraphs: [
          "Cross-border transfers, which are costly and slow today, could be simplified through a single network. Analysts estimate an average 15–25% reduction in fees on WAEMU corridors within two years, if competition authorities approve the proposed commitments.",
        ],
      },
    ],
    quote: {
      text: "We are building the payment infrastructure that West Africa deserves.",
    },
  },
  "can-2027-le-stade-felix-houphouet-boigny-accueillera-la-finale-capacite-portee-a-60-000": {
    sections: [
      {
        heading: "Abidjan at the heart of the continent",
        paragraphs: [
          "CAF has confirmed that Abidjan will host the 2027 AFCON final. Félix Houphouët-Boigny Stadium will see its capacity increase from 45,000 to 60,000 seats after renovations estimated at €120 million.",
          "This decision cements Côte d'Ivoire as a major sports hub, following the successful hosting of AFCON 2024 and massive investments in transport infrastructure around the Abidjan plateau.",
        ],
      },
      {
        heading: "Expected economic impact",
        paragraphs: [
          "The Ministry of Sports projects 250,000 additional visitors during the tournament and a direct impact of 180 billion FCFA on hospitality, restaurants, and services. Local authorities are already preparing a dedicated mobility plan including river shuttles and an extension of the Abidjan metro.",
        ],
      },
    ],
  },
  "abidjan-tech-valley-40-startups-selectionnees-pour-laccelerateur-continental-2026": {
    sections: [
      {
        heading: "A pan-African cohort",
        paragraphs: [
          "Forty startups from fifteen countries have been selected for the 2026 Abidjan Tech Valley cohort. The program offers twelve months of mentoring, a $2 million fund, and privileged access to investors from the tech diaspora.",
          "Dominant sectors this year: agritech, digital health, and clean energy—a reflection of the region's development priorities.",
        ],
      },
      {
        heading: "Spotlight on three winners",
        paragraphs: [
          "AgroVoice (Côte d'Ivoire) provides agricultural advice via voice SMS in local languages. MedConnect (Senegal) digitizes the care pathway in rural areas. SolarGrid (Ghana) deploys solar microgrids for food markets.",
        ],
      },
    ],
  },
  "sommet-de-lua-le-continent-adopte-une-feuille-de-route-pour-l-autonomie-alimentaire": {
    sections: [
      {
        heading: "An ambitious five-year plan",
        paragraphs: [
          "African heads of state have adopted a roadmap aiming to reduce food imports by 50% by 2031. The plan mobilizes $25 billion in public and private investment, with a focus on local seeds, irrigation, and agri-food processing.",
        ],
      },
      {
        heading: "Implementation challenges",
        paragraphs: [
          "Experts highlight the gap between announcements and actual financing capacity. Land tenure security, access to agricultural credit, and climate resilience remain the three bottlenecks identified by the FAO in its supporting report.",
        ],
      },
    ],
  },
  "detournement-de-fonds-publics-trois-ministres-mis-en-examen-dans-laffaire-des-marches-de-construction": {
    sections: [
      {
        heading: "Eight months of investigation",
        paragraphs: [
          "Our investigation documented a system of massive overbilling on major infrastructure projects launched between 2019 and 2024. Three former ministers have been placed under formal investigation; estimated losses exceed €400 million.",
          "Shell companies based in Dubai and Geneva allegedly laundered misappropriated funds through fictitious service invoices and inflated subcontracting contracts.",
        ],
      },
      {
        heading: "The mechanism",
        paragraphs: [
          "The scheme relies on multiplying contract amendments after awards—a practice difficult to detect without independent audits. Documents we were able to review show gaps of 30–70% between initial estimates and amounts ultimately paid.",
        ],
      },
    ],
    quote: {
      text: "Transparency in public procurement is not a democratic luxury—it is a condition of economic sovereignty.",
      author: "Investigating magistrate",
    },
  },
  "ces-agriculteurs-ivoiriens-qui-transforment-le-cacao-en-chocolat-haut-de-gamme": {
    sections: [
      {
        heading: "From bean to bar",
        paragraphs: [
          "In the Bélier region, family cooperatives produce, ferment, and export their own bean-to-bar chocolate to Europe and Asia. This model challenges the dominance of large processors who capture most of the added value from Ivorian cocoa.",
          "\"We no longer sell a raw material—we sell a story, a terroir, and quality,\" explains Kouamé N'Guessan, president of the Bélier Cacao collective.",
        ],
      },
      {
        heading: "Logistical challenges",
        paragraphs: [
          "Cold chain and organic certification remain obstacles. Yet premium bars sell for up to €12 in specialty shops in Paris—ten times the price of raw cocoa per kilo.",
        ],
      },
    ],
  },
  "vaccin-antipaludisme-rtss-la-cote-divoire-lance-sa-campagne-nationale-de-vaccination-de-masse": {
    sections: [
      {
        heading: "A regional first",
        paragraphs: [
          "Côte d'Ivoire becomes the first Francophone country in West Africa to launch a mass malaria vaccination campaign with the RTS,S vaccine. Goal: 2.5 million children vaccinated in six months.",
        ],
      },
      {
        heading: "Operations on the ground",
        paragraphs: [
          "The Ministry of Health has mobilized 3,200 mobile teams and strengthened the cold chain in 82 districts. Authorities stress the complementary role of vaccination, bed nets, and early diagnosis.",
        ],
      },
    ],
  },
  "google-devoile-son-premier-data-center-dafrique-subsaharienne-installe-a-accra": {
    sections: [
      {
        heading: "$600 million invested",
        paragraphs: [
          "Google has inaugurated its first data center in sub-Saharan Africa in Accra. The facility will power cloud services for the entire West African region and create 1,200 direct and indirect jobs.",
        ],
      },
      {
        heading: "Digital sovereignty",
        paragraphs: [
          "Ghana is positioning itself as a regional digital hub, but debates over the localization of sensitive data and the energy consumption of data centers remain heated within civil society.",
        ],
      },
    ],
  },
  "le-parlement-vote-la-loi-sur-la-protection-des-donnees-personnelles": {
    sections: [
      {
        heading: "An unprecedented framework in the Francophone zone",
        paragraphs: [
          "Parliament adopted the personal data protection law by a wide majority, transposing international standards and creating an independent supervisory authority.",
          "Businesses will have eighteen months to comply. Penalties can reach 5% of annual revenue for the most serious violations.",
        ],
      },
      {
        heading: "Impact on tech",
        paragraphs: [
          "Mobile money and targeted advertising players are particularly affected. Legal experts recommend immediate internal audits and the appointment of a data protection officer.",
        ],
      },
    ],
  },
  "lia-au-service-de-lagriculture-agrotech-ci-deploie-son-assistant-vocal-en-dioula-et-baoule": {
    sections: [
      {
        heading: "AI in local languages",
        paragraphs: [
          "Agrotech CI is launching a multilingual voice assistant for smallholder farmers. The tool works offline on basic phones and covers twelve main crops, from cashew to cocoa.",
        ],
      },
      {
        heading: "Pilot results",
        paragraphs: [
          "In the central region, maize yields increased by 18% during the pilot season thanks to personalized advice on planting dates and fertilizer doses.",
        ],
      },
    ],
  },
  "faut-il-repenser-le-modele-de-la-dette-publique-en-afrique-francophone": {
    sections: [
      {
        heading: "Debt that has doubled",
        paragraphs: [
          "African public debt has doubled in ten years. Global interest rates and the depreciation of certain local currencies are worsening debt service, to the detriment of social spending.",
        ],
      },
      {
        heading: "Toward new instruments",
        paragraphs: [
          "The author argues for suspension clauses in the event of climate shocks, greater transparency on loans backed by natural resources, and strengthening fiscal capacity rather than taking on new commercial borrowing.",
        ],
      },
    ],
    quote: {
      text: "Indebtedness for the continent's climate future to finance yesterday's infrastructure is no longer sustainable.",
      author: "Prof. Adjoua Mensah",
    },
  },
  "ivoiriens-de-france-comment-la-deuxieme-generation-reinvente-le-lien-avec-le-pays": {
    sections: [
      {
        heading: "Eight return journeys",
        paragraphs: [
          "They grew up in the Paris suburbs and chose to return to Abidjan to launch their startup or take over a family farm. Eight intersecting portraits of a diaspora in transition.",
        ],
      },
      {
        heading: "Between two cultures",
        paragraphs: [
          "Returning is never simple: diploma recognition, bureaucracy, family expectations. Yet many see an opportunity to contribute to the country's economic transformation with skills acquired in Europe.",
        ],
      },
    ],
  },
  "le-port-dabidjan-comment-il-est-devenu-le-premier-hub-logistique-dafrique-de-louest": {
    sections: [
      {
        heading: "25 million tonnes per year",
        paragraphs: [
          "With 25 million tonnes of freight handled annually, the Port of Abidjan has established itself as the commercial gateway to the West African hinterland, serving Mali, Burkina Faso, and Niger.",
        ],
      },
      {
        heading: "Modernization underway",
        paragraphs: [
          "The Vridi container terminal has doubled its capacity. A digital logistics corridor now enables real-time cargo tracking, reducing customs clearance times by 40% for accredited operators.",
        ],
      },
    ],
  },
  "grand-bassam-classee-au-patrimoine-mondial-lunesco-officialise-lextension-du-site-colonial": {
    sections: [
      {
        heading: "UNESCO site extension",
        paragraphs: [
          "UNESCO has formalized the extension of the Grand-Bassam historic site, including newly restored colonial buildings and the Quartier France, the city's tourist heart.",
        ],
      },
      {
        heading: "Tourism and memory",
        paragraphs: [
          "Local authorities hope to double tourist visits by 2030 while preserving architectural authenticity. A visitor flow management plan takes effect from the next high season.",
        ],
      },
    ],
  },
  "lonu-adopte-une-resolution-historique-sur-la-dette-souveraine-des-pays-en-developpement": {
    sections: [
      {
        heading: "A strong symbolic vote",
        paragraphs: [
          "The UN General Assembly adopted a resolution calling for coordinated restructuring of debt for the most vulnerable countries, paving the way for fairer mechanisms for the Global South.",
        ],
      },
      {
        heading: "Limits of the text",
        paragraphs: [
          "The resolution is not binding on private creditors. NGOs nevertheless welcome a narrative shift that could facilitate future negotiations.",
        ],
      },
    ],
  },
  "ligue-1-ci-lasec-remporte-le-derby-dabidjan-3-1": {
    sections: [
      {
        heading: "A heated derby",
        paragraphs: [
          "ASEC Mimosas beat Africa Sports 3–1 at Robert-Champroux Stadium before 25,000 spectators. A brace from an Ivorian striker turned the match around after a difficult start for the Mimosas.",
        ],
      },
      {
        heading: "Title race",
        paragraphs: [
          "This win puts ASEC back on top of the league table, two points ahead of WAC with three matchdays left in the regular season.",
        ],
      },
    ],
  },
  "deforestation-du-sassandra-lenquete-qui-revele-lampleur-reelle-des-pertes-forestieres": {
    sections: [
      {
        heading: "Damning satellite imagery",
        paragraphs: [
          "Our investigation cross-references satellite imagery, customs data, and villager testimonies to quantify forest losses in the Sassandra region since 2020: more than 47,000 hectares deforested—a 34% increase compared to the previous decade.",
        ],
      },
      {
        heading: "Industries involved",
        paragraphs: [
          "The expansion of oil palm plantations and illegal exploitation of precious timber are driving deforestation. Authorities announce strengthened patrols, but residents remain skeptical given the scale of the networks involved.",
        ],
      },
    ],
  },
  "global-south-talks-la-dette-africaine-sous-le-microscope-des-economistes": {
    sections: [
      {
        heading: "Special podcast episode",
        paragraphs: [
          "In this episode of Global South Talks, three economists debate restructuring mechanisms, the role of the IMF, and alternatives proposed by Global South countries to break out of the debt trap.",
        ],
      },
    ],
  },
  "la-bad-annonce-un-financement-de-800m-pour-les-pme-ivoiriennes-dans-le-secteur-agroalimentaire": {
    sections: [
      {
        heading: "$800 million for agri-food",
        paragraphs: [
          "The African Development Bank is unlocking a package for Ivorian agri-food processing SMEs, with a focus on cashew, cocoa, and tropical fruits for export.",
          "The scheme provides preferential rates and technical support for quality certification and access to European markets.",
        ],
      },
    ],
  },
  "nations-unies-le-conseil-de-securite-se-reunit-en-urgence-sur-la-situation-au-sahel": {
    sections: [
      {
        heading: "Extraordinary session",
        paragraphs: [
          "The UN Security Council is meeting urgently as the security and humanitarian situation deteriorates in several Sahel countries. Global South states are calling for strengthened peacekeeping operations and expanded humanitarian access.",
        ],
      },
    ],
  },
  "meta-deploie-son-service-whatsapp-pay-en-cote-divoire-avec-integration-cinetpay-native": {
    sections: [
      {
        heading: "Payments built into WhatsApp",
        paragraphs: [
          "Meta is launching WhatsApp Pay in Côte d'Ivoire through a partnership with CinetPay, enabling P2P and merchant payments directly in the country's most widely used messaging app.",
        ],
      },
    ],
  },
  "nouveaux-cas-de-meningite-a-bouake-le-ministere-de-la-sante-active-le-protocole-durgence-regional": {
    sections: [
      {
        heading: "Emergency protocol",
        paragraphs: [
          "Following a resurgence of meningitis cases in Bouaké, the Ministry of Health has activated a regional emergency protocol including targeted vaccination, strengthened epidemiological surveillance, and an awareness campaign.",
        ],
      },
    ],
  },
  "interview-exclusive-le-premier-ministre-repond-aux-critiques-sur-la-reforme-de-leducation": {
    sections: [
      {
        heading: "Education reform",
        paragraphs: [
          "In this exclusive interview, the Prime Minister responds to criticism of the education reform and details the rollout schedule in public institutions.",
        ],
      },
    ],
  },
  "les-elephants-en-route-pour-la-can-reportage-dans-le-centre-de-preparation-de-la-fif": {
    sections: [
      {
        heading: "AFCON preparation",
        paragraphs: [
          "Report from the Ivorian Football Federation's training center, where the Elephants are fine-tuning their squad ahead of AFCON 2027.",
        ],
      },
    ],
  },
  "orpaillage-illegal-dans-le-nord-le-grand-documentaire-sur-les-filieres-clandestines": {
    sections: [
      {
        heading: "Investigative documentary",
        paragraphs: [
          "Our team spent six months following clandestine gold-mining networks in the north of the country, documenting environmental impact and parallel export channels.",
        ],
      },
    ],
  },
  "afcfta-implementation-accelerates-kenya-ghana-first-tariff-schedules": {
    sections: [
      {
        heading: "A continental trade milestone",
        paragraphs: [
          "Kenya and Ghana filed the first major tariff schedules under AfCFTA, allowing preferential movement of goods among ratifying states.",
          "Customs unions in East and West Africa are aligning documentation so traders can use a single certificate of origin across borders.",
        ],
      },
    ],
    quote: { text: "This is the moment AfCFTA stops being a treaty and becomes a marketplace.", author: "Wamkele Mene, AfCFTA Secretary-General" },
  },
  "great-green-wall-sahel-reforestation-fifteen-years-progress": {
    sections: [
      {
        heading: "Measurable green recovery",
        paragraphs: [
          "Independent satellite monitoring shows vegetation gains along priority corridors from Senegal to Djibouti, though drought years still set back fragile zones.",
        ],
      },
    ],
  },
  "lagos-abidjan-corridor-ecowas-regional-rail-master-plan": {
    sections: [
      {
        heading: "Coastal integration",
        paragraphs: [
          "The approved master plan sequences civil works over fifteen years, prioritizing freight links between Lagos, Cotonou, Lomé, Accra, and Abidjan.",
        ],
      },
    ],
  },
  "southern-africa-mining-royalties-debate-resource-nationalism": {
    sections: [
      {
        heading: "Who owns the boom?",
        paragraphs: [
          "Windfall taxes on copper and lithium are framed as correcting historical under-taxation; operators warn that fiscal uncertainty could delay new mine openings.",
        ],
      },
    ],
  },
  "amazon-fund-brazil-2-4-billion-rainforest-protection-pledges": {
    sections: [
      {
        heading: "Financing stewardship",
        paragraphs: [
          "Donors tied disbursements to verified deforestation reductions and strengthened indigenous territorial protections in the Amazon biome.",
        ],
      },
    ],
  },
  "mexico-nearshoring-boom-industrial-north-supply-chains": {
    sections: [
      {
        heading: "Factories at capacity",
        paragraphs: [
          "Automotive and electronics assemblers are expanding footprints in Nuevo León and Coahuila as lead times from Asia remain volatile.",
        ],
      },
    ],
  },
  "colombia-peace-process-rural-councils-budget-autonomy": {
    sections: [
      {
        heading: "Peace dividends",
        paragraphs: [
          "Rural councils will propose investments in roads, schools, and crop substitution, with federal auditors retaining oversight on procurement.",
        ],
      },
    ],
  },
  "argentina-brazil-common-trade-currency-mercosur-study": {
    sections: [
      {
        heading: "Settlement innovation",
        paragraphs: [
          "Technical teams will pilot invoicing in a basket of reals and pesos for bilateral trade, without creating a parallel legal tender.",
        ],
      },
    ],
  },
  "india-digital-public-infrastructure-export-bangladesh-sri-lanka": {
    sections: [
      {
        heading: "Stack diplomacy",
        paragraphs: [
          "Bangladesh will adapt India's open APIs for payments and identity; Sri Lanka focuses on port logistics digitization and customs single windows.",
        ],
      },
    ],
  },
  "bangladesh-garment-sector-living-wage-framework": {
    sections: [
      {
        heading: "A phased floor",
        paragraphs: [
          "The agreement indexes minimum wages to inflation in Dhaka and Chattogram zones, with brand auditors publishing compliance scores twice yearly.",
        ],
      },
    ],
  },
  "indus-waters-treaty-talks-pakistan-india-mediation": {
    sections: [
      {
        heading: "Water under pressure",
        paragraphs: [
          "Glacial melt and erratic monsoons have revived disputes over eastern rivers; mediators seek updated flow data sharing before summer peaks.",
        ],
      },
    ],
  },
  "sri-lanka-tourism-recovery-pre-crisis-arrivals": {
    sections: [
      {
        heading: "Visitors return",
        paragraphs: [
          "Visa-on-arrival for Gulf travelers and stable exchange rates helped hotels exceed 2019 occupancy during the April festival season.",
        ],
      },
    ],
  },
  "gulf-states-40-billion-african-energy-transition": {
    sections: [
      {
        heading: "South–South capital",
        paragraphs: [
          "Funds target solar parks, green hydrogen hubs, and cross-border transmission in the Sahel and Horn of Africa, with co-financing from African development banks.",
        ],
      },
    ],
  },
  "iran-nuclear-talks-regional-oil-markets-shipping": {
    sections: [
      {
        heading: "Strait calculus",
        paragraphs: [
          "Partial sanctions relief scenarios are being modeled by insurers and tanker operators ahead of renewed talks in Muscat.",
        ],
      },
    ],
  },
  "turkey-black-sea-grain-corridor-extension-un": {
    sections: [
      {
        heading: "Food corridors",
        paragraphs: [
          "Ankara extended inspection protocols for Odessa-area exports, keeping wheat flows to North Africa and the Levant on stable footing.",
        ],
      },
    ],
  },
  "saudi-arabia-megacity-solar-hub-50-gw-photovoltaic": {
    sections: [
      {
        heading: "Desert gigawatts",
        paragraphs: [
          "NEOM Energy will pair panel manufacturing with hydrogen export terminals, signing preliminary offtake deals with European steelmakers.",
        ],
      },
    ],
  },
};

export function resolveArticleContent(
  title: string,
  excerpt: string,
  fallbackHtml: string,
  slugOverride?: string
): string {
  const slug = slugOverride ?? slugify(title, { lower: true, strict: true });
  const spec = ARTICLE_BODIES[slug];
  if (!spec) return fallbackHtml;
  return renderBody(excerpt, spec);
}

export function getArticleBodySlugs(): string[] {
  return Object.keys(ARTICLE_BODIES);
}
