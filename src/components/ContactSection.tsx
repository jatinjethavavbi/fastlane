'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Mail, Send, CheckCircle2, Sparkles, MessageSquare, ShieldCheck, Clock } from 'lucide-react';

interface ContactSectionProps {
  onStartNow?: () => void;
}

export function ContactSection({ onStartNow }: ContactSectionProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#151413] text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-[140px] opacity-25 z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(52, 211, 153, 0.4) 0%, rgba(10, 127, 90, 0.15) 50%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Info Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[#34d399] text-xs font-semibold uppercase tracking-wider mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
              </span>
              <span>LIVE CREATIVE DESK · ONLINE</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to automate your direct-response video ads?
            </h2>

            <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
              Connect with our creative engineering team or request custom format training for your Shopify catalog.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3.5 text-xs text-neutral-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#34d399] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Rapid Response SLA</span>
                  <span className="text-neutral-400">Average team response under 8 minutes</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs text-neutral-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#34d399] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Enterprise Data Privacy</span>
                  <span className="text-neutral-400">Proprietary assets never trained on public datasets</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card / Notification Form */}
          <div className="rounded-3xl bg-[#1e1c1a] border border-white/10 p-7 sm:p-9 shadow-2xl relative">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="relative p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#34d399]">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Priority Ad Desk</h3>
                  <span className="text-[11px] text-neutral-400 font-mono">Status: Accepting 10 New Brands</span>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                ACTIVE
              </span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-[#34d399] flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Invitation Requested!</h4>
                <p className="mt-1 text-xs text-neutral-300 max-w-xs">
                  We sent your creative teardown access link to your inbox.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                    Your Store or Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@yourbrand.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#34d399] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00D084] to-[#00BF79] hover:opacity-95 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_24px_rgba(0,208,132,0.35)]"
                >
                  <span>Request Instant Access</span>
                  <Send className="w-3.5 h-3.5" />
                </button>

                <p className="text-[10px] text-center text-neutral-400">
                  Instant webhook setup available · No credit card required to audit.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

