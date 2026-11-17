export const GENERATED_IMAGES = {
  skincare: '/src/assets/images/ad_skincare_editorial_1794908395716.jpg',
  audio: '/src/assets/images/ad_audio_hardware_1794908395903.jpg',
  lifestyle: '/src/assets/images/ad_creator_lifestyle_1794908396875.jpg',
  athletic: '/src/assets/images/ad_athletic_runner_1794908396789.jpg',
  roastery: '/src/assets/images/case_study_roastery_1794908397891.jpg',
} as const;

export type GalleryFormat = 'all' | 'creator' | 'editorial' | 'comparison';

export interface CreativeCardItem {
  id: string;
  brand: string;
  formatLabel: string;
  category: Exclude<GalleryFormat, 'all'>;
  channel: string;
  hookText: string;
  outcomeMetric: string;
  aspectLabel: string;
  image: string;
  alt: string;
  tiltDeg: number;
}

export const HERO_CREATIVE_CARDS: CreativeCardItem[] = [
  {
    id: 'hero-1',
    brand: 'Aurora Botanicals',
    formatLabel: 'Editorial Product Still',
    category: 'editorial',
    channel: 'Meta Feed',
    hookText: 'Why vitamin C oxidizes before it reaches your skin',
    outcomeMetric: '3.4x ROAS · 28-day run',
    aspectLabel: '4:5 Static',
    image: GENERATED_IMAGES.skincare,
    alt: 'Amber glass facial serum bottle on travertine stone in morning sunlight',
    tiltDeg: -6,
  },
  {
    id: 'hero-2',
    brand: 'Solstice Roasters',
    formatLabel: 'Founder Kitchen Hook',
    category: 'creator',
    channel: 'TikTok Spark',
    hookText: 'The 90-second pour-over swap that cut our morning cafe spend',
    outcomeMetric: '41% Hook Rate · 142k views',
    aspectLabel: '9:16 Video',
    image: GENERATED_IMAGES.lifestyle,
    alt: 'Founder holding a matte ceramic coffee carafe in a sunlit kitchen',
    tiltDeg: 0,
  },
  {
    id: 'hero-3',
    brand: 'Kestrel Acoustics',
    formatLabel: 'Hardware Spec Split',
    category: 'comparison',
    channel: 'YouTube Shorts',
    hookText: '42dB active isolation measured on the commuter line',
    outcomeMetric: '-29% CPA · Batch 04',
    aspectLabel: '9:16 Video',
    image: GENERATED_IMAGES.audio,
    alt: 'Matte charcoal wireless headphones on brushed aluminum surface',
    tiltDeg: 6,
  },
];

export const GALLERY_CREATIVES: CreativeCardItem[] = [
  {
    id: 'gal-1',
    brand: 'Aurora Botanicals',
    formatLabel: 'Ingredient Proof Frame',
    category: 'editorial',
    channel: 'Instagram Stories',
    hookText: 'Clinical stability in amber glass vs. clear dropper bottles',
    outcomeMetric: '3.4x ROAS · +48% CTR',
    aspectLabel: '9:16 Static',
    image: GENERATED_IMAGES.skincare,
    alt: 'Frosted amber skincare serum bottle on natural stone pedestal',
    tiltDeg: 0,
  },
  {
    id: 'gal-2',
    brand: 'Solstice Roasters',
    formatLabel: 'Creator Morning Routine',
    category: 'creator',
    channel: 'TikTok Feed',
    hookText: 'I stopped buying $7 oat lattes once I dialed in this single-origin roast',
    outcomeMetric: '44% 3s Hold · 1.9% CVR',
    aspectLabel: '9:16 Video',
    image: GENERATED_IMAGES.lifestyle,
    alt: 'Smiling woman holding ceramic coffee carafe near sunny window',
    tiltDeg: 0,
  },
  {
    id: 'gal-3',
    brand: 'Kestrel Acoustics',
    formatLabel: 'Acoustic Teardown',
    category: 'comparison',
    channel: 'Meta Reels',
    hookText: 'Why machined aluminum earcups outlast molded plastic hinges',
    outcomeMetric: '-34% CPA · 18-day winner',
    aspectLabel: '4:5 Video',
    image: GENERATED_IMAGES.audio,
    alt: 'Wireless over-ear studio headphones beside braided USB-C cable',
    tiltDeg: 0,
  },
  {
    id: 'gal-4',
    brand: 'Stride Lab',
    formatLabel: 'Dawn Track Test',
    category: 'creator',
    channel: 'YouTube Shorts',
    hookText: 'Mile 400 review: carbon plate return vs. traditional EVA foam',
    outcomeMetric: '39% Hook Rate · 2.8x ROAS',
    aspectLabel: '9:16 Video',
    image: GENERATED_IMAGES.athletic,
    alt: 'Runner lacing dark minimalist running shoes on urban track at dawn',
    tiltDeg: 0,
  },
  {
    id: 'gal-5',
    brand: 'Solstice Roasters',
    formatLabel: 'Small-Batch Transparency',
    category: 'editorial',
    channel: 'Meta Carousel',
    hookText: 'Roasted within 48 hours of dispatch—never warehoused for months',
    outcomeMetric: '+64% Subscription Lift',
    aspectLabel: '1:1 Carousel',
    image: GENERATED_IMAGES.roastery,
    alt: 'Specialty coffee roastery tasting bar with stainless steel roasters',
    tiltDeg: 0,
  },
  {
    id: 'gal-6',
    brand: 'Stride Lab',
    formatLabel: 'Before / After Split',
    category: 'comparison',
    channel: 'Meta Feed',
    hookText: 'Midfoot impact load compared across 12km tempo sessions',
    outcomeMetric: '2.6x Blended ROAS',
    aspectLabel: '4:5 Static',
    image: GENERATED_IMAGES.athletic,
    alt: 'Athlete preparing for dawn track interval training',
    tiltDeg: 0,
  },
];

export interface WorkflowStage {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
  metricNote: string;
}

export const HOW_IT_WORKS_STAGES: WorkflowStage[] = [
  {
    index: '01',
    title: 'Ingest any product URL',
    subtitle: 'Automated positioning & offer extraction',
    description:
      'Kestrel crawls your landing page, reviews, and SKU catalog in under 45 seconds—isolating your core mechanism, buyer objections, and visual grammar without manual creative briefs.',
    deliverable: 'Structured Brand Dossier · 12 Verified Angles',
    metricNote: 'Replaces 6 hours of manual brief writing',
  },
  {
    index: '02',
    title: 'Map competitor creative gaps',
    subtitle: 'Live ad library telemetry & saturation checks',
    description:
      'Before rendering a single pixel, Velox inspects active creative libraries across your category, flagging overused hooks and surfacing uncontested formats ready to convert.',
    deliverable: 'Category Saturation Matrix · Counter-Hooks',
    metricNote: 'Identifies fatigued angles before media spend is wasted',
  },
  {
    index: '03',
    title: 'Ship multi-format batches',
    subtitle: 'Creator video, editorial stills, and native carousels',
    description:
      'Review curated ad variations in an interactive approval queue, swap aspect ratios for Meta, TikTok, and YouTube Shorts, and push ready-to-test campaigns directly into your ad account.',
    deliverable: '30–180 Native Variations · Direct Ad Export',
    metricNote: 'Average 4.2x faster creative testing cadence',
  },
];

export interface BrandResearchPreset {
  id: string;
  name: string;
  domain: string;
  category: string;
  positioning: string;
  primaryPersona: string;
  objections: string[];
  toneCalibration: string;
  hooks: {
    angle: string;
    format: string;
    openingLine: string;
  }[];
}

export const BRAND_PRESETS: BrandResearchPreset[] = [
  {
    id: 'solstice',
    name: 'Solstice Roasters',
    domain: 'solsticeroasters.com',
    category: 'Specialty Coffee Subscription',
    positioning:
      'Single-origin whole beans roasted in small batches 48 hours before shipping, engineered for home espresso and pour-over precision.',
    primaryPersona: 'Home brewers spending $40+/wk at cafes who want cafe-grade clarity at home',
    objections: [
      'Subscription lock-in and stale beans sitting in warehouses',
      'Uncertainty around grind size and brew ratios at home',
      'High upfront shipping thresholds for single bags',
    ],
    toneCalibration: 'Grounded, tactile, sensory-led without barista pretension',
    hooks: [
      {
        angle: 'Roast-Date Contrast',
        format: 'Founder Kitchen Hook',
        openingLine: 'Check the stamped date on your grocery bag—most beans sit 5 months before you open them.',
      },
      {
        angle: 'Cost-Per-Cup Math',
        format: 'Side-by-Side Comparison',
        openingLine: '$1.45 per double shot vs. $6.75 at the corner shop—here is the 90-second dial-in.',
      },
      {
        angle: 'Roastery Proof',
        format: 'Editorial Carousel',
        openingLine: 'Every Tuesday roast ships by Thursday afternoon. Zero warehouse aging.',
      },
      {
        angle: 'Zero-Guesswork Guide',
        format: 'Creator POV',
        openingLine: 'We print the exact water temp and pour timing for every harvest on the sleeve.',
      },
    ],
  },
  {
    id: 'aurora',
    name: 'Aurora Botanicals',
    domain: 'aurorabotanicals.co',
    category: 'Clinical Skincare',
    positioning:
      'Cold-stabilized 15% L-Ascorbic Acid + Hyaluronic serum bottled in UV-filtering amber glass for sensitive barrier repair.',
    primaryPersona: 'Ingredient-literate buyers frustrated by oxidized, sticky vitamin C serums',
    objections: [
      'Fear of redness or barrier stinging from high-acid formulas',
      'Skepticism around shelf stability and color turning orange',
      'Sticky finish under daily mineral sunscreen',
    ],
    toneCalibration: 'Calm, clinical, transparent formulation storytelling',
    hooks: [
      {
        angle: 'Oxidation Test',
        format: 'Macro Texture Video',
        openingLine: 'If your vitamin C serum turned dark amber in the dropper, the active already degraded.',
      },
      {
        angle: 'Under-SPF Layering',
        format: 'Creator Morning Routine',
        openingLine: 'Zero pilling under mineral SPF—watch the 15-second absorption test.',
      },
      {
        angle: 'Barrier-First Formula',
        format: 'Editorial Still',
        openingLine: 'pH-balanced at 3.4 with micro-molecular hyaluronic acid so sensitive skin stays calm.',
      },
      {
        angle: '30-Day Routine Audit',
        format: 'Split Comparison',
        openingLine: 'What changed when I dropped a 6-step routine down to two stabilized actives.',
      },
    ],
  },
  {
    id: 'kestrel',
    name: 'Kestrel Acoustics',
    domain: 'kestrelacoustics.io',
    category: 'Studio Wireless Audio',
    positioning:
      'Machined aluminum wireless headphones with replaceable earpads, 52-hour battery, and zero-compression USB-C studio monitoring.',
    primaryPersona: 'Designers, engineers, and frequent flyers tired of disposable plastic hinges',
    objections: [
      'Whether wireless ANC compromises studio mixing clarity',
      'Long-term durability of headbands and earcup cushions',
      'Clamping pressure during 8-hour workdays',
    ],
    toneCalibration: 'Precision-engineered, understated, material-first authority',
    hooks: [
      {
        angle: 'Teardown Durability',
        format: 'Hardware Spec Split',
        openingLine: 'Most flagship headphones fail at a $2 plastic hinge. We milled ours from solid aluminum.',
      },
      {
        angle: 'Commute Isolation',
        format: 'Real-World Decibel Test',
        openingLine: '42dB low-frequency cabin attenuation measured live on the morning rail.',
      },
      {
        angle: 'Modular Repairability',
        format: 'Editorial Carousel',
        openingLine: 'Magnetic lambskin cushions and a user-swappable battery built for 8 years of daily use.',
      },
      {
        angle: 'Lossless Desk Mode',
        format: 'Creator Desk Tour',
        openingLine: 'One braided USB-C cable switches Kestrel from commute ANC to 24-bit studio reference.',
      },
    ],
  },
];

export interface CompetitorProfile {
  id: string;
  name: string;
  activeAdsCount: number;
  dominantFormat: string;
  saturationScore: 'High Saturation' | 'Moderate Overlap' | 'Under-Indexed';
  overusedHook: string;
  creativeMix: {
    creatorVideo: number;
    staticEditorial: number;
    comparison: number;
  };
  counterAngleTitle: string;
  counterAngleScript: string;
  expectedLift: string;
}

export const COMPETITOR_RADAR: CompetitorProfile[] = [
  {
    id: 'comp-1',
    name: 'Apex Roast Co.',
    activeAdsCount: 142,
    dominantFormat: 'Talking-Head Discount Hook (64%)',
    saturationScore: 'High Saturation',
    overusedHook: '"Stop overpaying for coffee—get 50% off your first box today"',
    creativeMix: { creatorVideo: 68, staticEditorial: 22, comparison: 10 },
    counterAngleTitle: 'Lead with Roast-Date Transparency Instead of Discounting',
    counterAngleScript:
      'Open with a tight close-up comparing a warehouse-aged 4-month bag against a stamped 48-hour roast batch. Frame freshness as the primary flavor upgrade before introducing the starter bundle.',
    expectedLift: 'Projected +34% Thumbstop vs. Discount Hooks',
  },
  {
    id: 'comp-2',
    name: 'Verve Daily Brew',
    activeAdsCount: 89,
    dominantFormat: 'Static Lifestyle Grid (58%)',
    saturationScore: 'Moderate Overlap',
    overusedHook: '"Mornings deserve better coffee"',
    creativeMix: { creatorVideo: 29, staticEditorial: 58, comparison: 13 },
    counterAngleTitle: 'Deploy 9:16 Step-by-Step Dial-In Demonstrations',
    counterAngleScript:
      'Verve under-indexes on instructional short-form video. Capture a tactile 18-second pour-over bloom with on-screen extraction timing to capture high-intent home brewers.',
    expectedLift: 'Uncontested 9:16 Video Auction Pocket',
  },
  {
    id: 'comp-3',
    name: 'Nocturne Espresso',
    activeAdsCount: 54,
    dominantFormat: 'Dark Aesthetic Stills (71%)',
    saturationScore: 'Under-Indexed',
    overusedHook: '"Small-batch Italian tradition"',
    creativeMix: { creatorVideo: 18, staticEditorial: 71, comparison: 11 },
    counterAngleTitle: 'Highlight Bright Daylight Rituals & Cost-Per-Shot Math',
    counterAngleScript:
      'Contrast Nocturne’s heavy dark studio imagery with warm morning window light and an explicit breakdown showing $1.45 per double espresso without sacrificing crema.',
    expectedLift: 'Projected -26% CPM via Creator Feed Native Look',
  },
];

export interface BlitzAdVariation {
  id: string;
  title: string;
  format: string;
  channel: string;
  hook: string;
  bodyCopy: string;
  visualDirection: string;
  ctaLabel: string;
  image: string;
  alt: string;
  remixOptions: {
    hook: string;
    visualDirection: string;
  }[];
}

export const BLITZ_QUEUE_ITEMS: BlitzAdVariation[] = [
  {
    id: 'blitz-1',
    title: 'Freshness Window Audit',
    format: 'Creator Video · 18s',
    channel: 'TikTok & Meta Reels',
    hook: 'Why your morning espresso tastes flat even with a $900 grinder',
    bodyCopy:
      'Supermarket bags spend 16 weeks in transit before hitting the shelf. Solstice roasts to order every Tuesday so CO2 crema peaks right when your box arrives.',
    visualDirection: 'Handheld kitchen close-up, morning window light, crisp roast-date stamp reveal at 0:04.',
    ctaLabel: 'Build Your Roast Box',
    image: GENERATED_IMAGES.lifestyle,
    alt: 'Creator holding ceramic coffee carafe in bright kitchen',
    remixOptions: [
      {
        hook: 'Check the hidden date code on your coffee bag—most beans are 4 months old',
        visualDirection: 'Split-screen grocery shelf vs. stamped kraft valve bag poured into glass hopper.',
      },
      {
        hook: 'Three variables that fixed our home pour-over in under 90 seconds',
        visualDirection: 'Overhead macro bloom shot with clean kinetic time stamps.',
      },
    ],
  },
  {
    id: 'blitz-2',
    title: 'Clinical Stability Proof',
    format: 'Editorial Static · 4:5',
    channel: 'Instagram & Meta Feed',
    hook: '15% Vitamin C that stays clear until the final drop',
    bodyCopy:
      'Formulated in UV-shielded amber glass at pH 3.4 with micro-hyaluronic hydration. Zero sticky residue under daily mineral SPF.',
    visualDirection: 'Travertine pedestal, directional morning shadow, clean sans-serif margin callouts.',
    ctaLabel: 'Shop Radiance Serum',
    image: GENERATED_IMAGES.skincare,
    alt: 'Amber glass facial serum bottle on stone surface',
    remixOptions: [
      {
        hook: 'Stop layering oxidized serum on sensitive skin barriers',
        visualDirection: 'Side-by-side color clarity chart next to frosted amber bottle.',
      },
      {
        hook: 'Two morning actives. Zero pilling under mineral sunscreen.',
        visualDirection: 'Minimalist bathroom counter flat-lay with water droplet texture.',
      },
    ],
  },
  {
    id: 'blitz-3',
    title: 'Machined Hinge Teardown',
    format: 'Comparison Reel · 22s',
    channel: 'YouTube Shorts & Meta',
    hook: 'Built with milled aluminum where every other brand uses brittle plastic',
    bodyCopy:
      'Engineered for 52 hours of continuous ANC, tool-free cushion swaps, and lossless 24-bit USB-C desk monitoring.',
    visualDirection: 'Brushed aluminum workbench, crisp rim light, 3-point material callout.',
    ctaLabel: 'Explore Studio Specs',
    image: GENERATED_IMAGES.audio,
    alt: 'Matte charcoal wireless headphones on brushed aluminum',
    remixOptions: [
      {
        hook: 'One USB-C cable takes Kestrel from commuter ANC to lossless mixing',
        visualDirection: 'Close-up braided cable click into earcup on studio desk.',
      },
      {
        hook: '42dB cabin attenuation tested live on the morning rail',
        visualDirection: 'Ambient waveform overlay dropping smoothly as earcups seal.',
      },
    ],
  },
  {
    id: 'blitz-4',
    title: 'Dawn Tempo Benchmark',
    format: 'Performance POV · 15s',
    channel: 'Meta & TikTok Spark',
    hook: 'Mile 400 outsole check: energy return without ankle instability',
    bodyCopy:
      'Dual-density nitrogen midsole tuned for 5K to marathon tempo blocks, weighing 198g in men’s US 9.',
    visualDirection: 'Low-angle wet asphalt track, dawn architectural shadow, cadence overlay.',
    ctaLabel: 'Compare Road Models',
    image: GENERATED_IMAGES.athletic,
    alt: 'Runner lacing dark minimalist running shoes on urban track',
    remixOptions: [
      {
        hook: 'Why lightweight race shoes usually collapse after 150 miles—and how we fixed it',
        visualDirection: 'Macro midsole compression frame on track lane line.',
      },
      {
        hook: '198 grams at dawn: built for threshold intervals and long progressions',
        visualDirection: 'Clean side profile silhouette with weight & drop callout.',
      },
    ],
  },
];

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  creditsLabel: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For solo founders and single-product stores launching weekly tests.',
    monthlyPrice: 39,
    annualPrice: 31,
    creditsLabel: '600 creative credits / mo · 1 brand workspace',
    features: [
      'Automated URL positioning & hook extraction',
      'Up to 45 static & short-form video variations monthly',
      'Competitor ad library snapshot for 3 rival domains',
      'Direct export in 9:16, 4:5, and 1:1 formats',
    ],
    ctaLabel: 'Start 7-Day Trial',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For performance teams beating creative fatigue across Meta and TikTok.',
    monthlyPrice: 99,
    annualPrice: 79,
    creditsLabel: '2,400 creative credits / mo · 3 brand workspaces',
    features: [
      'Full Kestrel creative batching & Blitz approval queue',
      'Up to 180 multi-format ads monthly with remix iterations',
      'Live competitor saturation alerts for 15 rival domains',
      'Meta Ads Manager & TikTok Spark one-click batch push',
    ],
    highlighted: true,
    ctaLabel: 'Start 7-Day Trial',
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'For multi-brand agencies and high-spend acquisition squads.',
    monthlyPrice: 249,
    annualPrice: 199,
    creditsLabel: '7,500 creative credits / mo · Unlimited workspaces',
    features: [
      'Unlimited brand dossiers and team review seats',
      'Custom digital talent & brand-locked visual templates',
      'Automated creative fatigue detection with replacement drafts',
      'Dedicated Slack onboarding & quarterly creative audits',
    ],
    ctaLabel: 'Start 7-Day Trial',
  },
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Hannah Lindqvist',
    role: 'Head of Growth',
    organization: 'Solstice Roasters',
    beforeChangeOutcome:
      'Before Velox, our two-person team shipped 12 ad variations a month and hit creative fatigue every 10 days. Switching to Kestrel batch workflows took us to 180 tested assets monthly and lifted blended ROAS by +64% over 90 days.',
    metric: '+64% Blended ROAS · 90 Days',
  },
  {
    id: 'test-2',
    name: 'Marcus Vance',
    role: 'VP of Performance',
    organization: 'Aurora Botanicals',
    beforeChangeOutcome:
      'We used to spend $8,500 per studio shoot only to learn our opening hook missed the mark. Now we validate angle winners in the Blitz queue within 48 hours and cut customer acquisition cost by 31% across Meta Prospecting.',
    metric: '-31% Acquisition CPA · Q3',
  },
  {
    id: 'test-3',
    name: 'Devon Takahashi',
    role: 'Co-Founder',
    organization: 'Kestrel Acoustics',
    beforeChangeOutcome:
      'Competitor creative mapping showed every audio brand running identical dark studio stills. Velox surfaced uncontested commuter decibel demos that dropped our YouTube Shorts CPA from $44 to $29 in three weeks.',
    metric: '$44 → $29 Shorts CPA',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'How does the 7-day free trial work?',
    a: 'Every plan starts with a full 7-day trial including 250 starter credits—enough to ingest your brand URL, map up to 3 competitors, and export your first test batch without entering a card upfront.',
  },
  {
    q: 'How are creative credits calculated?',
    a: 'Credits draw from a unified monthly pool: static editorial variations use 4 credits, carousel sets use 12 credits, and rendered 15-second creator video ads use 25 credits. Unused credits roll forward for 30 days on Growth and Scale plans.',
  },
  {
    q: 'Does Velox publish ads automatically without our approval?',
    a: 'Never. Every concept enters the Blitz approval queue first. You approve, remix, or discard variations before pushing selected assets as paused drafts into Meta Ads Manager, TikTok Ads, or YouTube Shorts.',
  },
  {
    q: 'How do you keep generated ads aligned with our brand guidelines?',
    a: 'During URL ingestion, Kestrel locks your typography hierarchy, hex palette, product packshots, and forbidden claim list into a persistent brand dossier so generated copy and layouts never drift off-brand.',
  },
  {
    q: 'Can agencies manage multiple client ad accounts?',
    a: 'Yes. Growth supports up to 3 isolated brand workspaces, and Scale unlocks unlimited client workspaces with separate brand dossiers, competitor watchlists, and team approval permissions.',
  },
];
