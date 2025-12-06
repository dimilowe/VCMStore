export interface ArticleSpec {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
}

export interface ArticleTip {
  title: string;
  content: string;
}

export interface ArticleSection {
  heading: string;
  icon: string;
  iconColor: string;
  paragraphs: string[];
  specs?: ArticleSpec[];
  tips?: ArticleTip[];
  proTip?: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleToolCTA {
  toolSlug: string;
  toolName: string;
  description: string;
  buttonText: string;
}

export interface ArticleBottomCTA {
  heading: string;
  description: string;
  primaryTool: {
    slug: string;
    name: string;
  };
  secondaryTool?: {
    slug: string;
    name: string;
  };
}

export interface ArticleContent {
  hero: {
    icon: string;
    iconGradient?: string;
    title: string;
    subtitle: string;
    platform?: string;
  };
  quickCTA?: {
    icon: string;
    iconColor: string;
    bgGradient: string;
    borderColor: string;
    buttonGradient: string;
    buttonHoverGradient: string;
    title: string;
    description: string;
    buttonText: string;
    toolSlug: string;
  };
  sections: ArticleSection[];
  faqs: ArticleFAQ[];
  bottomCTA: ArticleBottomCTA;
}

export interface ClusterTheme {
  icon: string;
  iconGradient: string;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  buttonGradient: string;
  buttonHoverGradient: string;
}

export const clusterThemes: Record<string, ClusterTheme> = {
  'social-media-image-sizes': {
    icon: 'Image',
    iconGradient: 'from-pink-500 via-purple-500 to-orange-500',
    accentColor: 'pink',
    bgGradient: 'from-pink-50 to-purple-50',
    borderColor: 'border-pink-200',
    buttonGradient: 'from-pink-500 to-purple-500',
    buttonHoverGradient: 'from-pink-600 to-purple-600',
  },
  'health-fitness-calculators': {
    icon: 'Calculator',
    iconGradient: 'from-orange-500 to-orange-600',
    accentColor: 'orange',
    bgGradient: 'from-orange-50 to-amber-50',
    borderColor: 'border-orange-200',
    buttonGradient: 'from-orange-500 to-orange-600',
    buttonHoverGradient: 'from-orange-600 to-orange-700',
  },
};

export const platformThemes: Record<string, ClusterTheme> = {
  'instagram': {
    icon: 'Instagram',
    iconGradient: 'from-pink-500 via-purple-500 to-orange-500',
    accentColor: 'pink',
    bgGradient: 'from-pink-50 to-purple-50',
    borderColor: 'border-pink-200',
    buttonGradient: 'from-pink-500 to-purple-500',
    buttonHoverGradient: 'from-pink-600 to-purple-600',
  },
  'youtube': {
    icon: 'Youtube',
    iconGradient: 'from-red-500 to-red-600',
    accentColor: 'red',
    bgGradient: 'from-red-50 to-orange-50',
    borderColor: 'border-red-200',
    buttonGradient: 'from-red-500 to-red-600',
    buttonHoverGradient: 'from-red-600 to-red-700',
  },
  'linkedin': {
    icon: 'Linkedin',
    iconGradient: 'from-blue-600 to-blue-700',
    accentColor: 'blue',
    bgGradient: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    buttonGradient: 'from-blue-600 to-blue-700',
    buttonHoverGradient: 'from-blue-700 to-blue-800',
  },
  'tiktok': {
    icon: 'Music',
    iconGradient: 'from-gray-900 via-pink-500 to-cyan-400',
    accentColor: 'gray',
    bgGradient: 'from-pink-50 to-cyan-50',
    borderColor: 'border-pink-200',
    buttonGradient: 'from-gray-900 to-gray-800',
    buttonHoverGradient: 'from-gray-800 to-gray-700',
  },
  'twitter': {
    icon: 'Twitter',
    iconGradient: 'from-blue-400 to-blue-500',
    accentColor: 'blue',
    bgGradient: 'from-blue-50 to-sky-50',
    borderColor: 'border-blue-200',
    buttonGradient: 'from-blue-400 to-blue-500',
    buttonHoverGradient: 'from-blue-500 to-blue-600',
  },
  'health': {
    icon: 'Heart',
    iconGradient: 'from-orange-500 to-orange-600',
    accentColor: 'orange',
    bgGradient: 'from-orange-50 to-amber-50',
    borderColor: 'border-orange-200',
    buttonGradient: 'from-orange-500 to-orange-600',
    buttonHoverGradient: 'from-orange-600 to-orange-700',
  },
};
