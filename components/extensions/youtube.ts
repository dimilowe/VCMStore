import { Node, mergeAttributes } from '@tiptap/core';

export interface YoutubeOptions {
  inline: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtube: {
      setYoutubeVideo: (options: { src: string }) => ReturnType;
    };
  }
}

export const Youtube = Node.create<YoutubeOptions>({
  name: 'youtube',
  
  group: 'block',
  
  atom: true,
  
  addOptions() {
    return {
      inline: false,
      HTMLAttributes: {},
    };
  },
  
  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-youtube-video]',
      },
      {
        tag: 'iframe[src*="youtube.com/embed"]',
      },
      {
        tag: 'iframe[src*="youtube-nocookie.com/embed"]',
      },
    ];
  },
  
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { 
        'data-youtube-video': '', 
        class: 'video-container my-6',
        style: 'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;'
      },
      [
        'iframe',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          width: '100%',
          height: '100%',
          style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
          frameborder: '0',
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen: 'true',
        }),
      ],
    ];
  },
  
  addCommands() {
    return {
      setYoutubeVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export function extractYoutubeVideoId(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.+&v=)([^&]+)/,
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/v\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}
