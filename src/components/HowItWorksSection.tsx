'use client';

import React from 'react';
import { ArcShowcase } from './showcase/ArcShowcase';

interface HowItWorksSectionProps {
  onStartNow?: () => void;
}

export function HowItWorksSection({ onStartNow }: HowItWorksSectionProps) {
  return <ArcShowcase />;
}
