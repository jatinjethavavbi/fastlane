import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  initialPlan?: string;
  initialUrl?: string;
  onClose: () => void;
}

export function TrialModal({ isOpen, initialPlan = 'Growth', initialUrl = '', onClose }: TrialModalProps) {
  const [email, setEmail] = useState('');
  const [brandUrl, setBrandUrl] = useState(initialUrl);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelectedPlan(initialPlan);
  }, [initialPlan]);

  useEffect(() => {
    if (initialUrl) setBrandUrl(initialUrl);
  }, [initialUrl]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError('Enter a valid work email address.');
      return;
    }
    if (!brandUrl.trim() || brandUrl.trim().length < 4) {
      setError('Enter your brand domain or product landing page URL.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="trial-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <button
              type="button"
              onClick={resetAndClose}
              aria-label="Close trial modal"
              className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center rounded-lg text-neutral-500 hover:text-[#111216] hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3
                  id="trial-modal-title"
                  className="font-display text-2xl font-semibold tracking-tight text-[#111216]"
                >
                  Workspace provisioning queued
                </h3>
                <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                  We sent your 7-day <span className="font-medium text-[#111216]">{selectedPlan}</span> workspace
                  activation link to <span className="font-medium text-[#111216]">{email}</span>. Kestrel has begun
                  indexing <span className="font-mono text-xs text-[#2563EB]">{brandUrl}</span>.
                </p>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="mt-6 w-full py-3 px-4 bg-[#111216] hover:bg-[#2563EB] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer min-h-[44px]"
                >
                  Return to Preview
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs font-medium text-[#2563EB] tracking-tight">
                  7-Day Trial · 250 Starter Credits · No Card Required
                </p>
                <h3
                  id="trial-modal-title"
                  className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#111216]"
                >
                  Initialize your creative workspace
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Enter your product URL so Kestrel can extract positioning and draft your first ad test batch.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div>
                    <label htmlFor="trial-plan" className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Selected Plan
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-lg">
                      {['Starter', 'Growth', 'Scale'].map((plan) => (
                        <button
                          key={plan}
                          type="button"
                          onClick={() => setSelectedPlan(plan)}
                          className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                            selectedPlan === plan
                              ? 'bg-white text-[#111216] shadow-xs'
                              : 'text-neutral-600 hover:text-[#111216]'
                          }`}
                        >
                          {plan}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="trial-email" className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Work Email
                    </label>
                    <input
                      id="trial-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@brand.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="trial-url" className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Product or Store URL
                    </label>
                    <input
                      id="trial-url"
                      type="url"
                      value={brandUrl}
                      onChange={(e) => setBrandUrl(e.target.value)}
                      placeholder="https://yourstore.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                      required
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#111216] hover:bg-[#2563EB] text-white text-sm font-medium rounded-lg transition-colors duration-150 inline-flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <span>Generate Brand Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
