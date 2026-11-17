import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Check } from 'lucide-react';
import { BRAND_PRESETS, type BrandResearchPreset } from '../data/veloxData';
import { SplitTextReveal } from './SplitTextReveal';

interface BrandResearchSectionProps {
  externalUrl?: string;
}

function buildCustomDossier(domainInput: string): BrandResearchPreset {
  const cleanHost = domainInput
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')[0]
    .trim();

  const matched = BRAND_PRESETS.find((p) => p.domain.toLowerCase() === cleanHost.toLowerCase());
  if (matched) return matched;

  const brandTitle = cleanHost.split('.')[0]?.replace(/[-_]/g, ' ') || 'Custom Brand';
  const formattedName = brandTitle.replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: `custom-${cleanHost}`,
    name: formattedName,
    domain: cleanHost,
    category: 'Live URL Extraction',
    positioning: `${formattedName} delivers differentiated product performance engineered for measurable daily outcomes—extracted directly from ${cleanHost}.`,
    primaryPersona: `High-intent category buyers comparing ${formattedName} against legacy alternatives`,
    objections: [
      'Proof of real-world results within the first 14 days of purchase',
      'Clarity on pricing vs. recurring subscription commitments',
      'Side-by-side quality comparison with established market incumbents',
    ],
    toneCalibration: 'Clear, proof-led, direct response without inflated claims',
    hooks: [
      {
        angle: 'Mechanism Contrast',
        format: 'Creator POV · 9:16',
        openingLine: `Here is what ${formattedName} changed that legacy options still ignore.`,
      },
      {
        angle: 'Objection Reversal',
        format: 'Editorial Static · 4:5',
        openingLine: `Why buyers switching to ${cleanHost} rarely go back after week two.`,
      },
      {
        angle: 'Cost-Value Breakdown',
        format: 'Comparison Split · 4:5',
        openingLine: `Three reasons ${formattedName} lowers long-term cost per use.`,
      },
      {
        angle: 'Founder Proof',
        format: 'Native Story · 9:16',
        openingLine: `Inside the production standard behind every order at ${cleanHost}.`,
      },
    ],
  };
}

export function BrandResearchSection({ externalUrl }: BrandResearchSectionProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(BRAND_PRESETS[0].id);
  const [customUrl, setCustomUrl] = useState('');
  const [customDossier, setCustomDossier] = useState<BrandResearchPreset | null>(null);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    if (!externalUrl) return;
    setCustomUrl(externalUrl);
    const built = buildCustomDossier(externalUrl);
    const existingPreset = BRAND_PRESETS.find((p) => p.id === built.id);
    if (existingPreset) {
      setCustomDossier(null);
      setSelectedPresetId(existingPreset.id);
    } else {
      setCustomDossier(built);
      setSelectedPresetId(built.id);
    }
  }, [externalUrl]);

  const activeDossier =
    customDossier && selectedPresetId === customDossier.id
      ? customDossier
      : BRAND_PRESETS.find((b) => b.id === selectedPresetId) || BRAND_PRESETS[0];

  const handleAnalyzeSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = customUrl.trim();
    if (!trimmed || !trimmed.includes('.')) {
      setInputError('Enter a valid domain such as yourbrand.com');
      return;
    }
    setInputError('');
    const built = buildCustomDossier(trimmed);
    const existingPreset = BRAND_PRESETS.find((p) => p.id === built.id);
    if (existingPreset) {
      setCustomDossier(null);
      setSelectedPresetId(existingPreset.id);
    } else {
      setCustomDossier(built);
      setSelectedPresetId(built.id);
    }
  };

  return (
    <section
      id="brand-research"
      className="py-20 sm:py-24 lg:py-28 bg-[#FAFAFA] border-b border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-[#2563EB] tracking-tight">
            01. Brand Research Demonstration
          </p>
          <SplitTextReveal
            as="h2"
            mode="words"
            text="Structured brand intelligence before a single frame is generated."
            className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#111216] leading-[1.1]"
          />
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            Switch between pre-indexed stores or enter any domain to inspect how Kestrel distills
            positioning, buyer objections, and tested hook matrices.
          </p>
        </div>

        {/* Workspace Controls */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 border border-neutral-200 rounded-xl self-start">
            {BRAND_PRESETS.map((preset) => {
              const isSelected = activeDossier.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setSelectedPresetId(preset.id);
                    setCustomUrl(preset.domain);
                    setInputError('');
                  }}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                    isSelected
                      ? 'bg-white text-[#111216] shadow-xs'
                      : 'text-neutral-600 hover:text-[#111216]'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
            {customDossier && (
              <button
                type="button"
                onClick={() => setSelectedPresetId(customDossier.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                  activeDossier.id === customDossier.id
                    ? 'bg-white text-[#111216] shadow-xs'
                    : 'text-neutral-600 hover:text-[#111216]'
                }`}
              >
                {customDossier.domain}
              </button>
            )}
          </div>

          <form onSubmit={handleAnalyzeSubmit} className="flex items-center gap-2 w-full lg:w-auto" noValidate>
            <div className="relative flex-1 lg:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <label htmlFor="research-url" className="sr-only">
                Test any domain
              </label>
              <input
                id="research-url"
                type="text"
                value={customUrl}
                onChange={(e) => {
                  setCustomUrl(e.target.value);
                  if (inputError) setInputError('');
                }}
                placeholder="Test any domain (e.g. stridewear.com)"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-[#111216] hover:bg-[#2563EB] text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[38px]"
            >
              Extract Dossier
            </button>
          </form>
        </div>

        {inputError && (
          <p role="alert" className="mt-2 text-xs font-medium text-red-600">
            {inputError}
          </p>
        )}

        {/* Dossier Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDossier.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 bg-white border border-neutral-200 rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-4 bg-neutral-50/70">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-display font-semibold text-[#111216]">{activeDossier.name}</span>
                <span aria-hidden="true" className="text-neutral-300">/</span>
                <span className="font-mono text-xs text-neutral-500">{activeDossier.domain}</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className="text-xs text-neutral-600">{activeDossier.category}</span>
              </div>
              <span className="text-xs font-mono text-emerald-700">
                Dossier Verified · 4 Hooks Ready
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
              {/* Brand Positioning & Objections */}
              <div className="lg:col-span-5 p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xs font-medium text-neutral-500">Extracted Value Proposition</h3>
                  <p className="mt-2 text-sm sm:text-base text-[#111216] leading-relaxed font-medium">
                    {activeDossier.positioning}
                  </p>
                </div>

                <div className="pt-5 border-t border-neutral-100">
                  <h3 className="text-xs font-medium text-neutral-500">Primary Target Buyer</h3>
                  <p className="mt-1.5 text-sm text-neutral-700 leading-relaxed">
                    {activeDossier.primaryPersona}
                  </p>
                </div>

                <div className="pt-5 border-t border-neutral-100">
                  <h3 className="text-xs font-medium text-neutral-500">Key Conversion Objections</h3>
                  <ul className="mt-2.5 space-y-2">
                    {activeDossier.objections.map((obj) => (
                      <li key={obj} className="flex items-start gap-2.5 text-sm text-neutral-700">
                        <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-neutral-100">
                  <h3 className="text-xs font-medium text-neutral-500">Tone Calibration</h3>
                  <p className="mt-1.5 text-sm text-neutral-700">{activeDossier.toneCalibration}</p>
                </div>
              </div>

              {/* Generated Hook Matrix */}
              <div className="lg:col-span-7 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xs font-medium text-neutral-500">
                    Synthesized Creative Angles & Opening Hooks
                  </h3>
                  <span className="text-xs font-mono text-neutral-400">Batch Seed 01</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeDossier.hooks.map((hook, idx) => (
                    <div
                      key={hook.angle}
                      className="p-4 rounded-xl border border-neutral-200 bg-[#FAFAFA] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs text-neutral-500">
                          <span className="font-medium text-[#111216]">
                            0{idx + 1}. {hook.angle}
                          </span>
                          <span className="font-mono text-[11px]">{hook.format}</span>
                        </div>
                        <p className="mt-2.5 text-sm text-neutral-800 leading-relaxed font-medium">
                          “{hook.openingLine}”
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
