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

ZIP files remain the universal standard for file compression and bundling.

### Why Use ZIP Files?

**Reduced File Size:** ZIP compression typically reduces file sizes by 10-80%.

**Single File Transfer:** Instead of sending 50 individual files, you send one ZIP archive.

**Universal Compatibility:** Every major operating system can open ZIP files.`,
      faq: [
        {
          question: 'Is this ZIP creator really free?',
          answer: 'Yes, completely free with no hidden costs, watermarks, or signup required.'
        },
        {
          question: 'Are my files uploaded to a server?',
          answer: 'No! This tool runs entirely in your browser. Your files never leave your device.'
        },
        {
          question: 'What file types can I add to the ZIP?',
          answer: 'You can add any file type - images, documents, videos, audio files, code files, and more.'
        },
        {
          question: 'What are the size limits?',
          answer: 'You can add up to 50 files with a total size of 100MB.'
        },
        {
          question: 'Can I use this on mobile?',
          answer: 'Yes! The ZIP creator works on all devices including smartphones and tablets.'
        }
      ]
    },
    relatedArticleSlugs: []
  },

  'zip-file-compression': {
    slug: 'zip-file-compression',
    title: 'Zip File Compression Tool',
    description: 'Compress files into a lean ZIP archive for faster sharing and downloads. Runs entirely in your browser.',
    allowedMimeTypes: ['*/*'],
    maxFiles: 100,
    maxTotalSizeMB: 200,
    defaultZipName: 'compressed-files',
    zipNamePattern: '{basename}-compressed',
    ui: {
      heroHeading: 'Compress Files Into a ZIP Archive',
      heroSubheading: 'Reduce file size and bundle everything into one download with fast, in-browser ZIP compression.',
      primaryCtaLabel: 'Compress & Download ZIP',
      dropzoneLabel: 'Drop files here to compress or click to browse',
      secondaryNotes: [
        'Works with documents, images, video and more',
        'Up to 100 files, 200MB total',
        'Client-side compression - no uploads',
        'Perfect for email and cloud sharing'
      ],
      notes: [
        'Combine many small files into a single ZIP to avoid hitting attachment limits.',
        'For images and videos, ZIP mainly bundles them; heavy compression comes from optimizing the files themselves first.',
        'Use clear ZIP names so recipients know exactly what they are opening.'
      ]
    },
    seo: {
      title: 'Zip File Compression Tool - Compress Files Into a ZIP Online | VCM Suite',
      metaDescription: 'Compress files into a single ZIP archive online. Reduce file size for faster uploads and downloads. 100% browser-based and private.',
      contentGuide: `## How ZIP File Compression Works

When you compress files into a ZIP, two things are happening at once:

1. **Bundling:** Multiple files and folders are combined into one container file.
2. **Compression:** Repeated patterns inside those files are stored more efficiently using algorithms like DEFLATE.

### When ZIP Compression Helps the Most

- Text-heavy files (CSV, JSON, logs, source code) often shrink dramatically.
- Office documents and PDFs usually see a noticeable size reduction.
- Already-compressed formats (JPG, MP4, MP3) will not shrink much, but they still benefit from being bundled.`,
      faq: [
        {
          question: 'Does ZIP compression reduce image and video quality?',
          answer: 'No. ZIP uses lossless compression. Your images and videos will be identical after extraction.'
        },
        {
          question: 'How much space will I save?',
          answer: 'Text files can shrink by more than 80%. PDFs and Office files often shrink 10-40%. Already compressed media may barely change in size.'
        },
        {
          question: 'Is there a file count or size limit?',
          answer: 'This preset supports up to 100 files and 200MB total. For larger archives, split them into multiple ZIP files.'
        }
      ]
    },
    relatedArticleSlugs: []
  },

  'zip-file-make': {
    slug: 'zip-file-make',
    title: 'Zip File Maker',
    description: 'Make a ZIP file from any set of files in seconds. Drag, drop, download - no technical steps.',
    allowedMimeTypes: ['*/*'],
    maxFiles: 80,
    maxTotalSizeMB: 150,
    defaultZipName: 'my-zip-file',
    zipNamePattern: '{basename}-zip',
    ui: {
      heroHeading: 'Make a ZIP File Instantly',
      heroSubheading: 'Turn loose files into a single ZIP download. No software to install, works in your browser.',
      primaryCtaLabel: 'Make ZIP File',
      dropzoneLabel: 'Drop files here to make a ZIP or click to browse',
      secondaryNotes: [
        'Supports any file type',
        'Up to 80 files, 150MB total',
        'No account needed',
        'Ideal for quick one-off bundles'
      ],
      notes: [
        'Decide on a clear naming convention before creating your ZIP so versions do not get mixed up.',
        'If you expect to update the files later, add the version and date to the ZIP file name.',
        'For clients, consider including a short README.txt in the archive with instructions or context.'
      ]
    },
    seo: {
      title: 'Zip File Make Tool - Create ZIP Files Online | VCM Suite',
      metaDescription: 'Make ZIP files online in seconds. Drag and drop to create a ZIP archive from multiple files. Free, fast, and private.',
      contentGuide: `## The Fastest Way to Make a ZIP File Online

Most people just want one thing: select some files, click a button, and end up with a clean ZIP archive they can send or upload.

This tool is built for that exact workflow:

1. Drop in all the files you want to include.
2. Optionally rename the output ZIP.
3. Click the button and download instantly.`,
      faq: [
        {
          question: 'Do I need administrator rights or special software?',
          answer: 'No. Everything runs in your browser tab. You do not need to install or configure anything on your system.'
        },
        {
          question: 'Can I rename the ZIP file?',
          answer: 'Yes. You can customize the ZIP name so it matches your project, client, or versioning scheme.'
        },
        {
          question: 'Will this overwrite existing ZIP files on my computer?',
          answer: 'No. The ZIP is just downloaded like any other file. If a file with the same name exists, your browser will usually append a number instead of overwriting it.'
        }
      ]
    },
    relatedArticleSlugs: []
  },

  'zip-file-folder': {
    slug: 'zip-file-folder',
    title: 'Zip Folder Online',
    description: 'Convert a folder contents into a single ZIP archive for easier sharing and backups.',
    allowedMimeTypes: ['*/*'],
    maxFiles: 200,
    maxTotalSizeMB: 300,
    defaultZipName: 'folder-archive',
    zipNamePattern: '{basename}-folder-archive',
    ui: {
      heroHeading: 'Turn Any Folder Into a ZIP File',
      heroSubheading: 'Drag in the contents of a folder and bundle everything into a structured ZIP archive.',
      primaryCtaLabel: 'Zip Folder Contents',
      dropzoneLabel: 'Drop folder contents here or browse to select',
      secondaryNotes: [
        'Preserve folder structure via clear naming',
        'Great for project hand-offs and backups',
        'Up to 200 files, 300MB total',
        'No server storage - 100% local'
      ],
      notes: [
        'If your browser supports folder uploads, you can drag the folder itself; otherwise, drag its contents.',
        'Mirror the folder hierarchy in your file selection to keep things organized inside the ZIP.',
        'For recurring backups, add the date to the ZIP name, e.g. "client-x-assets-2025-01-01.zip".'
      ]
    },
    seo: {
      title: 'Zip File Folder Tool - Zip Folder Contents Online | VCM Suite',
      metaDescription: 'Zip a folder contents online. Bundle entire project folders into a single ZIP archive for backups and hand-offs.',
      contentGuide: `## Why Zipping Folders Is the Cleanest Way to Share Projects

Most real projects are more than a couple of files. Zipping a folder lets you:

- Preserve the exact structure of the project
- Avoid missing files during hand-off
- Keep all related assets in one searchable archive

This preset is tuned for folder-style workflows: higher file counts and slightly higher size limits, while still staying fast and fully client-side.`,
      faq: [
        {
          question: 'Can I drag a whole folder at once?',
          answer: 'Some browsers support folder drag-and-drop or "Upload Folder". If not, you can select all files inside the folder instead.'
        },
        {
          question: 'Will subfolders be preserved?',
          answer: 'If your browser passes folder information, the internal structure will be preserved.'
        },
        {
          question: 'Is there a limit on how many files I can add?',
          answer: 'This preset supports up to 200 files and 300MB total. For extremely large folders, create multiple ZIP archives.'
        }
      ]
    },
    relatedArticleSlugs: []
  },

  'zip-file-on-linux': {
    slug: 'zip-file-on-linux',
    title: 'Zip File on Linux (No Terminal Needed)',
    description: 'Create ZIP files on Linux directly from your browser. No command-line, no packages to install.',
    allowedMimeTypes: ['*/*'],
    maxFiles: 80,
    maxTotalSizeMB: 150,
    defaultZipName: 'linux-archive',
    zipNamePattern: '{basename}-linux-zip',
    ui: {
      heroHeading: 'Create ZIP Files on Linux Without the Terminal',
      heroSubheading: 'Skip command-line syntax. Use a simple drag-and-drop ZIP creator that works in any Linux browser.',
      primaryCtaLabel: 'Create Linux ZIP',
      dropzoneLabel: 'Drop files here from your Linux file manager',
      secondaryNotes: [
        'Works on Ubuntu, Fedora, Arch, and more',
        'No sudo, no package installs',
        'Ideal for Chromebook and remote-desktop workflows',
        'Files never leave your machine'
      ],
      notes: [
        'Open your Linux file manager, select the files you need, and drag them into the tool.',
        'Use descriptive archive names so you can quickly identify them in your ~/Downloads folder.',
        'Great for users who have limited terminal access on corporate or school machines.'
      ]
    },
    seo: {
      title: 'Zip File on Linux - Create ZIP Archives Without Terminal Commands | VCM Suite',
      metaDescription: 'Create ZIP files on Linux in your browser. No terminal commands required. Works on Ubuntu, Fedora, Arch and more.',
      contentGuide: `## Creating ZIP Files on Linux Without Touching the Terminal

Linux makes it easy to create ZIPs with the command line, but not everyone wants to memorize commands or open a terminal just to send a few files.

### Browser-Based ZIP on Linux

This preset is optimized for Linux users:

- Works in Firefox, Chrome, Brave and other modern browsers on Linux
- Requires no additional packages or extensions
- Respects the same file permissions as your normal user`,
      faq: [
        {
          question: 'Do I need the zip CLI installed on my Linux machine?',
          answer: 'No. All the compression happens inside your browser using JavaScript. It does not depend on system-level packages.'
        },
        {
          question: 'Which Linux distributions are supported?',
          answer: 'Any distribution with a modern browser will work, including Ubuntu, Debian, Fedora, Arch, Manjaro, Pop!_OS and many others.'
        },
        {
          question: 'Can I run this over SSH or remote desktop?',
          answer: 'Yes. As long as you can open a graphical browser in your Linux session, you can use this tool.'
        }
      ]
    },
    relatedArticleSlugs: []
  },

  'zip-file-in-linux': {
    slug: 'zip-file-in-linux',
    title: 'Zip Files in Linux (GUI Workflow)',
    description: 'Zip files in Linux using a simple drag-and-drop interface instead of command-line tools.',
    allowedMimeTypes: ['*/*'],
    maxFiles: 80,
    maxTotalSizeMB: 150,
    defaultZipName: 'linux-files-zip',
    zipNamePattern: '{basename}-in-linux',
    ui: {
      heroHeading: 'Zip Files in Linux the Easy Way',
      heroSubheading: 'A graphical, browser-based ZIP tool for Linux users who prefer clicks over commands.',
      primaryCtaLabel: 'Zip Files in Linux',
      dropzoneLabel: 'Drop files from your Linux file manager here',
      secondaryNotes: [
        'Runs inside your browser',
        'Great for beginners migrating from Windows/macOS',
        'No risk of messing up terminal commands',
        'Files stay on your device'
      ],
      notes: [
        'This is ideal for users who are new to Linux but comfortable with drag-and-drop interfaces.',
        'Use it alongside your file manager bookmarks and workspaces as part of your daily workflow.',
        'Combine it with cloud folders (like Nextcloud/Dropbox) for quick shareable archives.'
      ]
    },
    seo: {
      title: 'Zip File in Linux - Easy GUI ZIP Creator for Linux | VCM Suite',
      metaDescription: 'Zip files in Linux with a graphical, browser-based tool. No command-line needed. Perfect for Linux beginners and power users.',
      contentGuide: `## Making Linux Feel Familiar for Everyday File Tasks

If you recently switched to Linux from Windows or macOS, the terminal can feel intimidating.

This preset is designed for that use case:

- Use the same drag-and-drop habits you already know
- Avoid mistyped commands and confusing flags
- Keep your workflow visual and predictable`,
      faq: [
        {
          question: 'Is this tool only for beginners?',
          answer: 'No. Power users also like having a quick GUI option for one-off tasks, especially when working on systems where they do not control the shell configuration.'
        },
        {
          question: 'Will the ZIP file I create work on Windows or macOS?',
          answer: 'Yes. ZIP is a cross-platform format. Archives you create here will open on Windows, macOS, Linux, iOS and Android.'
        },
        {
          question: 'Do I need root or sudo permissions?',
          answer: 'No. Everything runs with your normal user permissions inside the browser.'
        }
      ]
    },
    relatedArticleSlugs: []
  },

  'zip-file-linux': {
    slug: 'zip-file-linux',
    title: 'Linux ZIP File Creator',
    description: 'A universal ZIP creator for Linux users. Works in any modern browser and produces fully compatible archives.',
    allowedMimeTypes: ['*/*'],
    maxFiles: 100,
    maxTotalSizeMB: 200,
    defaultZipName: 'linux-zip-file',
    zipNamePattern: '{basename}-linux',
    ui: {
      heroHeading: 'Create ZIP Files on Any Linux System',
      heroSubheading: 'From laptops to servers with GUIs, use this browser-based ZIP tool whenever you need a fast archive.',
      primaryCtaLabel: 'Create Linux ZIP File',
      dropzoneLabel: 'Drop files here from your Linux environment',
      secondaryNotes: [
        'Compatible with most Linux desktops',
        'No terminal or file-roller required',
        'Perfect for shared workstations',
        'No data leaves your box'
      ],
      notes: [
        'Use this tool when you are logged into a Linux machine via VNC or remote desktop and want a quick ZIP without installing extra utilities.',
        'Pair it with local encrypted storage if you are handling sensitive data.',
        'For repetitive tasks, save this page as a browser bookmark in your Linux environment.'
      ]
    },
    seo: {
      title: 'Zip File Linux - Online ZIP Tool for Linux Users | VCM Suite',
      metaDescription: 'Create ZIP files on Linux with a simple web interface. Works on any distro with a modern browser. No installation required.',
      contentGuide: `## A Single ZIP Workflow for All Your Linux Machines

Developers and admins often bounce between multiple Linux environments: local laptops, dev boxes, and remote servers with GUIs.

Rather than remembering which box has which tools installed, this browser-based ZIP creator gives you one reliable workflow:

- Open your browser
- Drop in files
- Download a ZIP archive`,
      faq: [
        {
          question: 'Does this replace the zip command completely?',
          answer: 'For simple archive creation, yes. For advanced options like split archives or scripted backups, you will still want the CLI. This tool is built for quick everyday bundles.'
        },
        {
          question: 'Will this work on minimal window managers?',
          answer: 'If you can open a modern web browser, it will work, regardless of whether you use GNOME, KDE, XFCE, i3, or something more minimal.'
        },
        {
          question: 'Is this safe to use on production systems?',
          answer: 'The tool itself is client-side, but you should still follow your organization policies about handling sensitive data. Nothing is uploaded, but you control where archives are stored and shared.'
        }
      ]
    },
    relatedArticleSlugs: []
  },

  'zip-file-password-protection': {
    slug: 'zip-file-password-protection',
    title: 'Zip File Password Protection Tool',
    description: 'Add password protection to ZIP archives so only people with the key can open your files.',
    allowedMimeTypes: ['*/*'],
    maxFiles: 50,
    maxTotalSizeMB: 100,
    defaultZipName: 'secure-archive',
    zipNamePattern: '{basename}-protected',
    ui: {
      heroHeading: 'Protect Your ZIP Files With a Password',
      heroSubheading: 'Encrypt ZIP archives in your browser before you share them. Only people with the password can open the contents.',
      primaryCtaLabel: 'Create Password-Protected ZIP',
      dropzoneLabel: 'Drop files here to create a secure ZIP',
      secondaryNotes: [
        'Set your own strong password',
        'Ideal for contracts, invoices and client files',
        'Works on Windows, macOS and Linux',
        'Files are processed locally in your browser'
      ],
      notes: [
        'Choose a unique password that you do not reuse on other accounts.',
        'Send the password over a different channel than the ZIP file (for example, ZIP via email, password via text).',
        'Remember that if you forget the password, the contents cannot be recovered.'
      ]
    },
    seo: {
      title: 'Zip File Password Protection - Encrypt ZIP Files Online | VCM Suite',
      metaDescription: 'Create password-protected ZIP files online. Encrypt archives before sharing sensitive documents with clients or coworkers.',
      contentGuide: `## Why Password-Protect a ZIP File?

Sometimes zipping files is not enough. If the contents are sensitive - contracts, invoices, ID scans, medical information - you also need a layer of protection.

Password-protected ZIP archives add basic encryption so only people with the password can access the contents.

### Smart Ways to Use Password-Protected ZIPs

- Share client documents with a simple extra layer of security
- Store receipts or statements in a single encrypted archive
- Send confidential files over email without exposing raw attachments`,
      faq: [
        {
          question: 'Is ZIP password protection unbreakable?',
          answer: 'It adds a strong barrier for everyday use, but extremely determined attackers with enough time and computing power may still attempt to crack weak passwords. Always choose long, unique passwords.'
        },
        {
          question: 'Will recipients need special software to open the ZIP?',
          answer: 'No. Most modern archive tools on Windows, macOS and Linux support password-protected ZIP files out of the box.'
        },
        {
          question: 'What happens if I forget the password?',
          answer: 'There is no recovery mechanism. If you lose or forget the password, the files inside the ZIP cannot be decrypted.'
        }
      ]
    },
    relatedArticleSlugs: []
  }
};

export function getZipPresetBySlug(slug: string): ZipEngineConfig | undefined {
  return zipPresets[slug];
}
