'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onStartNow: () => void;
}

export function Navbar({ onStartNow }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4">
      <div
        className={`mx-auto pointer-events-auto w-full transition-all duration-300 ease-out ${
          isScrolled ? 'max-w-[1040px]' : 'max-w-[1160px]'
        }`}
      >
        {/* ================================================================= */}
        {/* 3D SPIRAL RIBBON NAVBAR CONTAINER                                */}
        {/* Continuous helical ribbon wrapping around a horizontal white bar  */}
        {/* Web palette: Crisp Porcelain White & Radiant Emerald Green       */}
        {/* ================================================================= */}
        <div className="relative w-full h-[76px] flex items-center select-none">
          
          {/* =============================================================== */}
          {/* 1. CORE HORIZONTAL WHITE BAR (Background Layer)                 */}
          {/* =============================================================== */}
          <div className="absolute inset-x-0 top-[12px] h-[52px] bg-gradient-to-b from-[#FFFFFF] via-[#FAFBFB] to-[#F1F5F3] rounded-[14px] border border-black/[0.07] shadow-[0_10px_28px_-4px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.04)] pointer-events-auto" />

          {/* =============================================================== */}
          {/* 2. LEFT HANGING DISC TAB (Exact feature from reference design)  */}
          {/* Underneath the white bar on the far left                        */}
          {/* =============================================================== */}
          <div className="absolute left-7 sm:left-10 top-[63px] w-[54px] h-[22px] pointer-events-none z-10">
            <svg
              width="54"
              height="22"
              viewBox="0 0 54 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(0,64,40,0.22)]"
            >
              <defs>
                <linearGradient id="left-tab-grad" x1="27" y1="0" x2="27" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#047857" />
                  <stop offset="45%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#064E3B" />
                </linearGradient>
              </defs>
              {/* Semi-circular tab hanging down */}
              <path
                d="M 1 0 C 1 12, 11 21, 27 21 C 43 21, 53 12, 53 0 Z"
                fill="url(#left-tab-grad)"
              />
              {/* Top ambient shadow tucked under white bar */}
              <path
                d="M 1 0.75 L 53 0.75"
                stroke="rgba(1, 37, 27, 0.6)"
                strokeWidth="1.5"
              />
              {/* Outer edge highlight rim */}
              <path
                d="M 1 0 C 1 12, 11 21, 27 21 C 43 21, 53 12, 53 0"
                stroke="rgba(52, 211, 153, 0.4)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* =============================================================== */}
          {/* 3. LOGO ZONE (Sitting on the clean White Core Bar)              */}
          {/* =============================================================== */}
          <div className="relative z-20 shrink-0 pl-5 sm:pl-7 pr-3 flex items-center h-[52px]">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 sm:gap-2.5 text-[#111114] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D084] rounded-md py-1 group cursor-pointer"
            >
              {/* Fastlane Slanted Emblem */}
              <svg
                width="23"
                height="17"
                viewBox="0 0 26 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover:scale-105"
              >
                <path
                  d="M7.8 2.2C8.2 1.4 9.0 1 9.9 1H23.2C24.2 1 24.8 2.0 24.3 2.9L22.7 5.7C22.3 6.5 21.5 6.9 20.6 6.9H7.3C6.3 6.9 5.7 5.9 6.2 5.0L7.8 2.2Z"
                  fill="#0E0E11"
                />
                <path
                  d="M3.0 10.6C3.4 9.8 4.2 9.4 5.1 9.4H14.5C15.5 9.4 16.1 10.4 15.6 11.3L14.0 14.1C13.6 14.9 12.8 15.3 11.9 15.3H2.5C1.5 15.3 0.9 14.3 1.4 13.4L3.0 10.6Z"
                  fill="#00D084"
                />
              </svg>
              <span className="font-display text-[16px] sm:text-[18px] font-extrabold tracking-tight text-[#0F172A] group-hover:text-black transition-colors">
                Fastlane
              </span>
            </a>
          </div>

          {/* =============================================================== */}
          {/* 4. 3D SPIRAL RIBBON WRAPS (Continuous Helical Coil Layers)      */}
          {/* =============================================================== */}
          <div className="relative flex-1 h-[76px] flex items-center justify-end md:justify-around pr-2 sm:pr-4 overflow-visible">
            
            {/* Global SVG Definitions for 3D Ribbon Lighting & Curls */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
              <defs>
                {/* 3D Glossy Emerald Ribbon Front Face Gradient */}
                <linearGradient id="ribbon-emerald-front" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="28%" stopColor="#10B981" />
                  <stop offset="68%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>

                {/* Ribbon Underside / Inner Cylinder Curl Gradient (Dark Shaded Fold) */}
                <linearGradient id="ribbon-inner-curl" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#022C22" />
                  <stop offset="65%" stopColor="#064E3B" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>

                {/* Soft Drop Shadow for Ribbon Front Face onto White Bar */}
                <filter id="ribbon-cast-shadow" x="-30%" y="-20%" width="160%" height="150%">
                  <feDropShadow dx="-4" dy="3" stdDeviation="3.5" floodColor="#012318" floodOpacity="0.22" />
                </filter>
              </defs>
            </svg>

            {/* ------------------------------------------------------------- */}
            {/* WRAP 1: "AI Creative Suite" Feature Coil (Desktop / Tablet)   */}
            {/* ------------------------------------------------------------- */}
            <div className="hidden lg:flex relative items-center justify-center shrink-0 w-[215px] h-[76px] z-20">
              {/* Vector 3D Curled Ribbon Graphic */}
              <svg
                viewBox="0 0 215 76"
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                fill="none"
              >
                {/* 1. Top Curl: Ribbon looping over top edge from behind the bar */}
                <path
                  d="M 6 12 C 6 3, 20 3, 34 12 C 24 7, 13 8, 6 12 Z"
                  fill="url(#ribbon-inner-curl)"
                />
                <path
                  d="M 6 12 C 6 3, 20 3, 34 12"
                  stroke="rgba(255, 255, 255, 0.75)"
                  strokeWidth="1.2"
                />

                {/* 2. Front Face Slanted Ribbon Band */}
                <path
                  d="M 34 12 
                     L 155 12 
                     Q 163 12, 168 17 
                     L 204 64 
                     L 82 64 
                     Q 74 64, 69 59 
                     L 34 12 
                     Z"
                  fill="url(#ribbon-emerald-front)"
                  filter="url(#ribbon-cast-shadow)"
                />

                {/* Top Specular Sheen Rim */}
                <path
                  d="M 34 12.75 L 155 12.75"
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth="1.3"
                />

                {/* 3. Bottom Curl: Ribbon looping under bottom edge to behind the bar */}
                <path
                  d="M 204 64 C 204 73, 214 73, 214 64 C 214 69, 208 71, 204 64 Z"
                  fill="url(#ribbon-inner-curl)"
                />
                <path
                  d="M 204 64 C 204 73, 214 73, 214 64"
                  stroke="rgba(1, 38, 29, 0.5)"
                  strokeWidth="1"
                />
              </svg>

              {/* Coil 1 Text Content */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center pl-7 pr-3 pointer-events-auto">
                <span className="font-display font-extrabold text-[12px] text-white uppercase tracking-wider flex items-center gap-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D1FAE5] shrink-0" />
                  <span>AI Suite</span>
                </span>
                <span className="font-sans text-[10px] text-emerald-100 font-medium tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  Creative Engine
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* WRAP 2: "Autopilot Ads" Benefit Coil (Desktop Only)           */}
            {/* ------------------------------------------------------------- */}
            <div className="hidden md:flex relative items-center justify-center shrink-0 w-[200px] h-[76px] z-20">
              {/* Vector 3D Curled Ribbon Graphic */}
              <svg
                viewBox="0 0 200 76"
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                fill="none"
              >
                {/* 1. Top Curl */}
                <path
                  d="M 6 12 C 6 3, 20 3, 34 12 C 24 7, 13 8, 6 12 Z"
                  fill="url(#ribbon-inner-curl)"
                />
                <path
                  d="M 6 12 C 6 3, 20 3, 34 12"
                  stroke="rgba(255, 255, 255, 0.75)"
                  strokeWidth="1.2"
                />

                {/* 2. Front Face Slanted Ribbon Band */}
                <path
                  d="M 34 12 
                     L 142 12 
                     Q 150 12, 155 17 
                     L 189 64 
                     L 81 64 
                     Q 73 64, 68 59 
                     L 34 12 
                     Z"
                  fill="url(#ribbon-emerald-front)"
                  filter="url(#ribbon-cast-shadow)"
                />

                {/* Top Specular Sheen Rim */}
                <path
                  d="M 34 12.75 L 142 12.75"
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth="1.3"
                />

                {/* 3. Bottom Curl */}
                <path
                  d="M 189 64 C 189 73, 199 73, 199 64 C 199 69, 193 71, 189 64 Z"
                  fill="url(#ribbon-inner-curl)"
                />
                <path
                  d="M 189 64 C 189 73, 199 73, 199 64"
                  stroke="rgba(1, 38, 29, 0.5)"
                  strokeWidth="1"
                />
              </svg>

              {/* Coil 2 Text Content */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center pl-7 pr-3 pointer-events-auto">
                <span className="font-display font-bold text-[12px] text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                  Winning Ads
                </span>
                <span className="font-sans text-[10px] text-emerald-100 font-medium tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  On Autopilot
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* WRAP 3: CTA Coil with "Start now" Button (All Screen Sizes)   */}
            {/* ------------------------------------------------------------- */}
            <div className="relative flex items-center justify-center shrink-0 w-[190px] sm:w-[210px] h-[76px] z-20">
              {/* Vector 3D Curled Ribbon Graphic */}
              <svg
                viewBox="0 0 210 76"
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                fill="none"
              >
                {/* 1. Top Curl */}
                <path
                  d="M 6 12 C 6 3, 20 3, 34 12 C 24 7, 13 8, 6 12 Z"
                  fill="url(#ribbon-inner-curl)"
                />
                <path
                  d="M 6 12 C 6 3, 20 3, 34 12"
                  stroke="rgba(255, 255, 255, 0.75)"
                  strokeWidth="1.2"
                />

                {/* 2. Front Face Slanted Ribbon Band */}
                <path
                  d="M 34 12 
                     L 155 12 
                     Q 163 12, 168 17 
                     L 204 64 
                     L 82 64 
                     Q 74 64, 69 59 
                     L 34 12 
                     Z"
                  fill="url(#ribbon-emerald-front)"
                  filter="url(#ribbon-cast-shadow)"
                />

                {/* Top Specular Sheen Rim */}
                <path
                  d="M 34 12.75 L 155 12.75"
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth="1.3"
                />

                {/* 3. Bottom Curl */}
                <path
                  d="M 204 64 C 204 73, 214 73, 214 64 C 214 69, 208 71, 204 64 Z"
                  fill="url(#ribbon-inner-curl)"
                />
                <path
                  d="M 204 64 C 204 73, 214 73, 214 64"
                  stroke="rgba(1, 38, 29, 0.5)"
                  strokeWidth="1"
                />
              </svg>

              {/* Coil 3: Luxury Porcelain "Start now" Button */}
              <div className="relative z-10 flex items-center justify-center pl-7 pr-3 pointer-events-auto">
                <button
                  type="button"
                  onClick={onStartNow}
                  className="group relative inline-flex items-center gap-2 bg-gradient-to-b from-[#FFFFFF] via-[#FAFBFB] to-[#EDF2EE] hover:from-[#FFFFFF] hover:via-[#F0FDF4] hover:to-[#DCFCE7] active:scale-[0.98] text-[#0C1210] text-xs sm:text-[13px] font-extrabold pl-3.5 sm:pl-4 pr-1.5 py-1 rounded-full border border-white/95 ring-1 ring-black/10 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_22px_-2px_rgba(0,208,132,0.5),0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D084] transform hover:-translate-y-0.5"
                >
                  <span className="tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                    Start now
                  </span>
                  <span className="w-6 h-6 rounded-full bg-neutral-950 group-hover:bg-[#00D084] text-[#00D084] group-hover:text-neutral-950 inline-flex items-center justify-center transition-all duration-200 shadow-sm group-hover:scale-105">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.6} />
                  </span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
