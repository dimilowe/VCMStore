export type ZipEngineConfig = {
  slug: string;
  title: string;
  description: string;
  allowedMimeTypes: string[];
  maxFiles: number;
  maxTotalSizeMB: number;
  defaultZipName: string;
  zipNamePattern?: string;
  ui: {
    heroHeading: string;
    heroSubheading: string;
    primaryCtaLabel: string;
    dropzoneLabel: string;
    secondaryNotes?: string[];
  };
  seo: {
    title: string;
    metaDescription: string;
    faq: { question: string; answer: string }[];
  };
};

export const zipPresets: Record<string, ZipEngineConfig> = {
  'zip-file-creator': {
    slug: 'zip-file-creator',
    title: 'VCM Zip Pack Creator',
    description: 'Create ZIP archives from multiple files instantly in your browser. No uploads, no server - completely private and secure.',
    allowedMimeTypes: ['*/*'],
    maxFiles: 50,
    maxTotalSizeMB: 100,
    defaultZipName: 'vcm-pack',
    zipNamePattern: '{basename}-pack',
    ui: {
      heroHeading: 'Create ZIP Files Instantly',
      heroSubheading: 'Combine multiple files into a single ZIP archive. 100% client-side - your files never leave your device.',
      primaryCtaLabel: 'Download ZIP',
      dropzoneLabel: 'Drop files here or click to browse',
      secondaryNotes: [
        'Supports all file types',
        'Up to 50 files, 100MB total',
        'No signup required',
        'Files stay on your device'
      ]
    },
    seo: {
      title: 'Free ZIP File Creator - Create ZIP Archives Online | VCM Suite',
      metaDescription: 'Create ZIP archives instantly in your browser. Combine multiple files into one ZIP file. No uploads, no signup - completely free and private.',
      faq: [
        {
          question: 'Is this ZIP creator really free?',
          answer: 'Yes, completely free with no hidden costs, watermarks, or signup required. Create as many ZIP files as you need.'
        },
        {
          question: 'Are my files uploaded to a server?',
          answer: 'No! This tool runs entirely in your browser. Your files never leave your device, making it completely private and secure.'
        },
        {
          question: 'What file types can I add to the ZIP?',
          answer: 'You can add any file type - images, documents, videos, audio files, code files, and more. There are no restrictions on file formats.'
        },
        {
          question: 'What are the size limits?',
          answer: 'You can add up to 50 files with a total size of 100MB. This is more than enough for most use cases like sharing documents or bundling assets.'
        },
        {
          question: 'Can I use this on mobile?',
          answer: 'Yes! The ZIP creator works on all devices including smartphones and tablets. Just tap to select files and download your ZIP.'
        }
      ]
    }
  }
};

export function getZipPresetBySlug(slug: string): ZipEngineConfig | undefined {
  return zipPresets[slug];
}
