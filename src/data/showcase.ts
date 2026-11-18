import React from 'react';
import { LearnsYourBrand } from '@/components/showcase/sections/LearnsYourBrand';
import { StudiesCompetitors } from '@/components/showcase/sections/StudiesCompetitors';

export interface SectionConfig {
  id: string;
  label: string;
  index: number;
  Component: React.ComponentType<{ isActive?: boolean }>;
}

export const sections: SectionConfig[] = [
  {
    id: 'learns-your-brand',
    label: 'Learns your brand',
    index: 0,
    Component: LearnsYourBrand,
  },
  {
    id: 'studies-competitors',
    label: 'Studies competitors',
    index: 1,
    Component: StudiesCompetitors,
  },
];
