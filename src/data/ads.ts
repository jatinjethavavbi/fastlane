export interface AdCreative {
  id: string;
  src: string;
  poster: string;
  label: string;
  category: string;
}

export interface FeedsData {
  left: AdCreative[];
  center: AdCreative[];
  right: AdCreative[];
}

export const feeds: FeedsData = {
  left: [
    {
      id: 'left-1',
      src: '/ads/left-1.mp4',
      poster: '/images/ad_skincare_editorial_1794908395716.jpg',
      label: 'CHALKBOARD',
      category: 'Steamer Pro',
    },
    {
      id: 'left-2',
      src: '/ads/left-2.mp4',
      poster: '/images/ad_creator_lifestyle_1794908396875.jpg',
      label: 'CLAYMATION',
      category: 'Lumina Eyewear',
    },
    {
      id: 'left-3',
      src: '/ads/left-3.mp4',
      poster: '/images/case_study_roastery_1794908397891.jpg',
      label: 'BABY PODCAST',
      category: 'Solstice Roasters',
    },
    {
      id: 'left-4',
      src: '/ads/left-4.mp4',
      poster: '/images/ad_skincare_editorial_1794908395716.jpg',
      label: 'NETFLIX DOC',
      category: 'Aura Botanicals',
    },
    {
      id: 'left-5',
      src: '/ads/left-5.mp4',
      poster: '/images/ad_audio_hardware_1794908395903.jpg',
      label: 'COMPETITOR REMIX',
      category: 'Ridge Heritage',
    },
    {
      id: 'left-6',
      src: '/ads/left-6.mp4',
      poster: '/images/ad_athletic_runner_1794908396789.jpg',
      label: 'CAR YAPPER',
      category: 'Velocity Athletic',
    },
    {
      id: 'left-7',
      src: '/ads/left-7.mp4',
      poster: '/images/ad_audio_hardware_1794908395903.jpg',
      label: 'BREAKING NEWS',
      category: 'Minimalist Timepiece',
    },
    {
      id: 'left-8',
      src: '/ads/left-8.mp4',
      poster: '/images/ad_creator_lifestyle_1794908396875.jpg',
      label: 'MEME',
      category: 'Aerofloat Sleep',
    },
  ],
  center: [
    {
      id: 'center-1',
      src: '/ads/center-1.mp4',
      poster: '/images/ad_skincare_editorial_1794908395716.jpg',
      label: 'AI PODCAST',
      category: 'Monolith Objects',
    },
    {
      id: 'center-2',
      src: '/ads/center-2.mp4',
      poster: '/images/ad_audio_hardware_1794908395903.jpg',
      label: 'PAPERMATION',
      category: 'Kestrel Acoustics',
    },
    {
      id: 'center-3',
      src: '/ads/center-3.mp4',
      poster: '/images/ad_skincare_editorial_1794908395716.jpg',
      label: 'STATIC',
      category: 'Steamer Pro',
    },
    {
      id: 'center-4',
      src: '/ads/center-4.mp4',
      poster: '/images/ad_creator_lifestyle_1794908396875.jpg',
      label: 'TEXT ON BODY',
      category: 'Lumina Eyewear',
    },
    {
      id: 'center-5',
      src: '/ads/center-5.mp4',
      poster: '/images/case_study_roastery_1794908397891.jpg',
      label: 'TWEET',
      category: 'Solstice Roasters',
    },
    {
      id: 'center-6',
      src: '/ads/center-6.mp4',
      poster: '/images/ad_skincare_editorial_1794908395716.jpg',
      label: 'NOTES APP',
      category: 'Aura Botanicals',
    },
    {
      id: 'center-7',
      src: '/ads/center-7.mp4',
      poster: '/images/ad_audio_hardware_1794908395903.jpg',
      label: 'BILLBOARD',
      category: 'Ridge Heritage',
    },
    {
      id: 'center-8',
      src: '/ads/center-8.mp4',
      poster: '/images/ad_athletic_runner_1794908396789.jpg',
      label: 'LINKEDIN POST',
      category: 'Velocity Athletic',
    },
  ],
  right: [
    {
      id: 'right-1',
      src: '/ads/right-1.mp4',
      poster: '/images/ad_audio_hardware_1794908395903.jpg',
      label: 'UGC REVIEW',
      category: 'Minimalist Timepiece',
    },
    {
      id: 'right-2',
      src: '/ads/right-2.mp4',
      poster: '/images/ad_creator_lifestyle_1794908396875.jpg',
      label: 'BEFORE/AFTER',
      category: 'Aerofloat Sleep',
    },
    {
      id: 'right-3',
      src: '/ads/right-3.mp4',
      poster: '/images/ad_audio_hardware_1794908395903.jpg',
      label: 'UNBOXING',
      category: 'Fastlane Studio',
    },
    {
      id: 'right-4',
      src: '/ads/right-4.mp4',
      poster: '/images/ad_skincare_editorial_1794908395716.jpg',
      label: '3D ANIMATION',
      category: 'Steamer Pro',
    },
    {
      id: 'right-5',
      src: '/ads/right-5.mp4',
      poster: '/images/ad_creator_lifestyle_1794908396875.jpg',
      label: 'NETFLIX DOC',
      category: 'Lumina Eyewear',
    },
    {
      id: 'right-6',
      src: '/ads/right-6.mp4',
      poster: '/images/ad_skincare_editorial_1794908395716.jpg',
      label: 'CLAYMATION',
      category: 'Monolith Objects',
    },
    {
      id: 'right-7',
      src: '/ads/right-7.mp4',
      poster: '/images/ad_audio_hardware_1794908395903.jpg',
      label: 'BABY PODCAST',
      category: 'Kestrel Acoustics',
    },
    {
      id: 'right-8',
      src: '/ads/right-8.mp4',
      poster: '/images/ad_audio_hardware_1794908395903.jpg',
      label: 'CHALKBOARD',
      category: 'Ridge Heritage',
    },
  ],
};

