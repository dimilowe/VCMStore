'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { useEffect, useState } from 'react';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Underline as UnderlineIcon,
  Undo2,
  Redo2,
  List,
  ListOrdered,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WYSIWYGEditorProps {
  content: string;
  onChange: (html: string) => void;
  onInsertImage?: (url: string) => void;
  onEditorReady?: (insertHtml: (html: string) => void, savePosition: () => void) => void;
}

export function WYSIWYGEditor({ content, onChange, onInsertImage, onEditorReady }: WYSIWYGEditorProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('formatting-toolbar-collapsed');
    if (saved) setIsCollapsed(saved === 'true');
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('formatting-toolbar-collapsed', String(newState));
  };
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Underline,
      TextStyle,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-4 py-2 prose-p:mb-6 prose-headings:mt-8 prose-headings:mb-4 prose-ul:my-6 prose-ol:my-6',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor when content prop changes (for undo/redo from outside)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Expose insertHtml and savePosition functions to parent component
  useEffect(() => {
    if (editor && onEditorReady) {
      let savedPosition: number | null = null;
      
      const savePosition = () => {
        // Save the current cursor position
        savedPosition = editor.state.selection.from;
        console.log('Saved position:', savedPosition);
      };
      
      const insertHtml = (html: string) => {
        console.log('insertHtml called with:', html?.substring(0, 50));
        
        // Check if html is valid
        if (!html) return;
        
        // Check if this is an image tag
        const imgMatch = html.match(/<img[^>]+src="([^"]+)"/);
        
        if (imgMatch) {
          // If we have a saved position, move cursor there first
          if (savedPosition !== null) {
            console.log('Restoring to position:', savedPosition);
            editor.commands.focus();
            editor.commands.setTextSelection(savedPosition);
          }
          
          // Use TipTap's command API - insert at current cursor position
          editor.chain().focus().setImage({ src: imgMatch[1] }).run();
          
          // Clear saved position
          savedPosition = null;
        } else {
          // For other HTML content
          if (savedPosition !== null) {
            editor.commands.focus();
            editor.commands.setTextSelection(savedPosition);
          }
          editor.chain().focus().insertContent(html).run();
          savedPosition = null;
        }
      };
      
      onEditorReady(insertHtml, savePosition);
    }
  }, [editor, onEditorReady]);

  if (!editor) {
    return <div className="min-h-[500px] px-4 py-2">Loading editor...</div>;
  }

  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <>
      {/* Formatting Toolbar - Sticky so it follows you as you scroll */}
      {isCollapsed ? (
        <div className="fixed right-0 top-[350px] z-10 flex flex-col gap-1 p-2 bg-stone-50 border-l shadow-lg rounded-l-lg">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="w-10 h-10 p-0"
            title="Expand toolbar"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            className="w-10 h-10 p-0 disabled:opacity-30"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            className="w-10 h-10 p-0 disabled:opacity-30"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`w-10 h-10 p-0 ${editor?.isActive('bold') ? 'bg-stone-200' : ''}`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`w-10 h-10 p-0 ${editor?.isActive('italic') ? 'bg-stone-200' : ''}`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`w-10 h-10 p-0 ${editor?.isActive('underline') ? 'bg-stone-200' : ''}`}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={`w-10 h-10 p-0 ${editor?.isActive('strike') ? 'bg-stone-200' : ''}`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`w-10 h-10 p-0 ${editor?.isActive('bulletList') ? 'bg-stone-200' : ''}`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`w-10 h-10 p-0 ${editor?.isActive('orderedList') ? 'bg-stone-200' : ''}`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="sticky top-[144px] z-10 flex items-center gap-1 p-2 bg-stone-50 border border-b-0 rounded-t-lg flex-wrap shadow-sm">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="mr-2"
            title="Collapse toolbar"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Undo/Redo */}
          <div className="flex gap-1 pr-2 border-r">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-8 w-8 p-0 hover:bg-stone-100 disabled:opacity-30"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
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
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`h-8 px-2 hover:bg-stone-100 text-xs font-semibold ${
              editor.isActive('heading', { level: 2 }) ? 'bg-stone-200' : ''
            }`}
            title="Heading 2"
          >
            H2
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`h-8 px-2 hover:bg-stone-100 text-xs font-semibold ${
              editor.isActive('heading', { level: 3 }) ? 'bg-stone-200' : ''
            }`}
            title="Heading 3"
          >
            H3
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={`h-8 px-2 hover:bg-stone-100 text-xs font-semibold ${
              editor.isActive('heading', { level: 4 }) ? 'bg-stone-200' : ''
            }`}
            title="Heading 4"
          >
            H4
          </Button>
        </div>

        {/* Text Formatting */}
        <div className="flex gap-1 px-2 border-r">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`h-8 w-8 p-0 hover:bg-stone-100 ${
              editor.isActive('bold') ? 'bg-stone-200' : ''
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`h-8 w-8 p-0 hover:bg-stone-100 ${
              editor.isActive('italic') ? 'bg-stone-200' : ''
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`h-8 w-8 p-0 hover:bg-stone-100 ${
              editor.isActive('underline') ? 'bg-stone-200' : ''
            }`}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`h-8 w-8 p-0 hover:bg-stone-100 ${
              editor.isActive('strike') ? 'bg-stone-200' : ''
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 px-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`h-8 w-8 p-0 hover:bg-stone-100 ${
              editor.isActive('bulletList') ? 'bg-stone-200' : ''
            }`}
            title="Bullet list"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`h-8 w-8 p-0 hover:bg-stone-100 ${
              editor.isActive('orderedList') ? 'bg-stone-200' : ''
            }`}
            title="Numbered list"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
      </div>
      )}

      {/* Editor Content */}
      <div className="border border-t-0 rounded-b-lg bg-white">
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
