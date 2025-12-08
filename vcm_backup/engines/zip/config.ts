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
    notes?: string[];
  };
  seo: {
    title: string;
    metaDescription: string;
    contentGuide?: string;
    faq: { question: string; answer: string }[];
  };
  relatedArticleSlugs: string[];
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
      ],
      notes: [
        'Organize files into folders before zipping for better structure',
        'Use clear, descriptive names for your ZIP files',
        'Check file sizes before adding - some files compress better than others'
      ]
    },
    seo: {
      title: 'Free ZIP File Creator - Create ZIP Archives Online | VCM Suite',
      metaDescription: 'Create ZIP archives instantly in your browser. Combine multiple files into one ZIP file. No uploads, no signup - completely free and private.',
      contentGuide: `## The Complete Guide to ZIP Files in 2025

ZIP files remain the universal standard for file compression and bundling. Whether you're sharing documents with colleagues, distributing digital products, or backing up important files, understanding how to create and use ZIP archives efficiently is essential for modern digital workflows.

### What Is a ZIP File?

A ZIP file is a compressed archive that bundles multiple files and folders into a single container. The format was created in 1989 and has become the most widely supported archive format across all operating systems. ZIP files use **lossless compression**, meaning your files retain 100% of their original quality when extracted.

### Why Use ZIP Files?

**Reduced File Size:** ZIP compression typically reduces file sizes by 10-80%, depending on the content type. Text files compress extremely well, while already-compressed formats like JPG or MP4 see minimal size reduction.

**Single File Transfer:** Instead of sending 50 individual files, you send one ZIP archive. This dramatically simplifies file sharing via email, cloud storage, or direct downloads.

**Folder Structure Preservation:** ZIP archives maintain your original folder hierarchy. Recipients extract the files exactly as you organized them.

**Universal Compatibility:** Every major operating system—Windows, macOS, Linux, iOS, Android—can open ZIP files without additional software.

### Best Practices for Creating ZIP Archives

**Name Your ZIP Clearly:** Use descriptive names like "project-assets-v2.zip" rather than "files.zip". Recipients should understand the contents before opening.

**Organize Before Zipping:** Create a clean folder structure before adding files to your archive. This saves recipients time when extracting.

**Check Total Size:** Most email providers limit attachments to 25MB. Cloud storage services have their own limits. Know your platform's constraints before creating large archives.

**Include a README:** For complex archives, include a text file explaining the contents and any setup instructions.

### Privacy and Security Considerations

Our ZIP creator runs entirely in your browser using JavaScript. Your files are never uploaded to any server—the compression happens locally on your device. This client-side approach ensures complete privacy for sensitive documents.

For archives containing confidential information, consider password-protecting your ZIP file before sharing (though our tool focuses on simple, fast creation without encryption overhead).

### Common Use Cases

- **Digital Product Delivery:** Bundle ebooks, templates, and bonus files for customers
- **Portfolio Sharing:** Package design work, code samples, or media files for potential clients
- **Email Attachments:** Combine multiple documents into one easily-attached file
- **Backup Archives:** Create dated backups of important project files
- **Asset Distribution:** Share icons, fonts, or images with team members

### Technical Details

Our tool uses the **DEFLATE** compression algorithm at level 6, which provides an optimal balance between compression ratio and speed. The resulting ZIP files are compatible with all standard archive utilities including Windows Explorer, macOS Archive Utility, 7-Zip, WinRAR, and The Unarchiver.`,
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
    },
    relatedArticleSlugs: []
  }
};

export function getZipPresetBySlug(slug: string): ZipEngineConfig | undefined {
  return zipPresets[slug];
}
