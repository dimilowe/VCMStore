'use client';

import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Underline,
  Undo2,
  Redo2,
  Type,
  Heading2,
  Heading3,
  List,
  ListOrdered
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TextFormattingToolbarProps {
  onFormat: (tag: string, closeTag?: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function TextFormattingToolbar({ 
  onFormat, 
  onUndo, 
  onRedo,
  canUndo,
  canRedo
}: TextFormattingToolbarProps) {
  const formatButton = (
    icon: React.ReactNode,
    openTag: string,
    closeTag: string,
    title: string
  ) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => onFormat(openTag, closeTag)}
      className="h-8 w-8 p-0 hover:bg-stone-100"
      title={title}
    >
      {icon}
    </Button>
  );

  return (
    <div className="flex items-center gap-1 p-2 bg-stone-50 border rounded-lg mb-3">
      {/* Undo/Redo */}
      <div className="flex gap-1 pr-2 border-r">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          className="h-8 w-8 p-0 hover:bg-stone-100 disabled:opacity-30"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          className="h-8 w-8 p-0 hover:bg-stone-100 disabled:opacity-30"
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Headings */}
      <div className="flex gap-1 px-2 border-r">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onFormat('<h2 class="text-3xl font-bold mt-8 mb-4">', '</h2>')}
          className="h-8 px-2 hover:bg-stone-100 text-xs font-semibold"
          title="Heading 2"
        >
          H2
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onFormat('<h3 class="text-2xl font-bold mt-6 mb-3">', '</h3>')}
          className="h-8 px-2 hover:bg-stone-100 text-xs font-semibold"
          title="Heading 3"
        >
          H3
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onFormat('<h4 class="text-xl font-bold mt-4 mb-2">', '</h4>')}
          className="h-8 px-2 hover:bg-stone-100 text-xs font-semibold"
          title="Heading 4"
        >
          H4
        </Button>
      </div>

      {/* Text Formatting */}
      <div className="flex gap-1 px-2 border-r">
        {formatButton(<Bold className="h-4 w-4" />, '<strong>', '</strong>', 'Bold (Ctrl+B)')}
        {formatButton(<Italic className="h-4 w-4" />, '<em>', '</em>', 'Italic (Ctrl+I)')}
        {formatButton(<Underline className="h-4 w-4" />, '<u>', '</u>', 'Underline')}
        {formatButton(<Strikethrough className="h-4 w-4" />, '<s>', '</s>', 'Strikethrough')}
      </div>

      {/* Font Sizes */}
      <div className="flex gap-1 px-2 border-r">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onFormat('<span class="text-sm">', '</span>')}
          className="h-8 px-2 hover:bg-stone-100 text-xs"
          title="Small text"
        >
          Small
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onFormat('<span class="text-lg">', '</span>')}
          className="h-8 px-2 hover:bg-stone-100 text-xs"
          title="Large text"
        >
          Large
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onFormat('<span class="text-xl">', '</span>')}
          className="h-8 px-2 hover:bg-stone-100 text-xs"
          title="Extra large text"
        >
          XL
        </Button>
      </div>

      {/* Lists */}
      <div className="flex gap-1 px-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onFormat('<ul class="list-disc ml-6 my-4">\n  <li>', '</li>\n</ul>')}
          className="h-8 w-8 p-0 hover:bg-stone-100"
          title="Bullet list"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onFormat('<ol class="list-decimal ml-6 my-4">\n  <li>', '</li>\n</ol>')}
          className="h-8 w-8 p-0 hover:bg-stone-100"
          title="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
