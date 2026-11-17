'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface StartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StartModal({ isOpen, onClose }: StartModalProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim() || !websiteUrl.includes('.')) {
      setError('Enter your website or store URL (e.g. yourbrand.com).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address to receive your 5 free statics.');
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
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="start-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-2xl text-[#0B0B0E]"
          >
            <button
              type="button"
              onClick={resetAndClose}
              aria-label="Close dialog"
              className="absolute top-4 right-4 w-9 h-9 inline-flex items-center justify-center rounded-full text-neutral-500 hover:text-[#0B0B0E] hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-3">
                <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 id="start-modal-title" className="font-display text-2xl font-bold tracking-tight">
                  Your first 5 statics are generating
                </h2>
                <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                  We sent your workspace access link to{' '}
                  <span className="font-semibold text-[#0B0B0E]">{email}</span> while Fastlane analyzes{' '}
                  <span className="font-semibold text-[#047857]">{websiteUrl}</span>.
                </p>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="mt-6 w-full py-3 px-5 bg-[#111114] hover:bg-[#232329] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer min-h-[44px]"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold text-[#047857]">
                  First 5 Statics Free · No Credit Card Required
                </p>
                <h2 id="start-modal-title" className="mt-2 font-display text-2xl font-bold tracking-tight">
                  Launch your winning ad batch
                </h2>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Paste your website URL so Fastlane can generate 5 ready-to-run ad statics tailored to
                  your brand.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div>
                    <label htmlFor="fastlane-url" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Website URL
                    </label>
                    <input
                      id="fastlane-url"
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yourstore.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="fastlane-email" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Work Email
                    </label>
                    <input
                      id="fastlane-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@brand.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                      required
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-rose-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 bg-gradient-to-b from-[#059669] to-[#047857] hover:from-[#047857] hover:to-[#065F46] text-white text-sm font-semibold rounded-xl shadow-[0_10px_25px_-6px_rgba(5,150,105,0.42)] transition-all inline-flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
                  >
                    <span>First 5 statics free</span>
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
