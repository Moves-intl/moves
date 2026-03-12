import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Label } from '@/components/ui/label';

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const ToolbarButton = ({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`px-2 py-1 rounded text-sm border transition-colors ${
      active
        ? 'bg-gray-800 text-white border-gray-800'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value,
  onChange,
  placeholder,
  height = '400px',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'], alignments: ['left', 'center', 'right', 'justify'] }),
      Image,
      Link.configure({ openOnClick: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none p-3 min-h-full',
      },
    },
  });

  // Sync external value changes (e.g., edit mode loading)
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value]);

  if (!editor) return null;

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border border-gray-300 rounded-t bg-gray-50">
        {/* Headings */}
        <select
          className="text-sm border border-gray-300 rounded px-1 py-1 bg-white"
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'paragraph') editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: parseInt(val) as 1|2|3|4|5|6 }).run();
          }}
          defaultValue="paragraph"
        >
          <option value="paragraph">Normal</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
        </select>

        <div className="w-px bg-gray-300 mx-1" />

        {/* Text formatting */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
          <u>U</u>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
          <s>S</s>
        </ToolbarButton>

        {/* Text color */}
        <label title="Text Color" className="flex items-center gap-1 px-2 py-1 rounded text-sm border border-gray-300 bg-white hover:bg-gray-100 cursor-pointer">
          A
          <input
            type="color"
            className="w-4 h-4 cursor-pointer border-0 p-0 bg-transparent"
            onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
            title="Text Color"
          />
        </label>

        <div className="w-px bg-gray-300 mx-1" />

        {/* Lists */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List">
          1.
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
          •—
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        {/* Alignment */}
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
          ≡L
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
          ≡C
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
          ≡R
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Justify">
          ≡J
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        {/* Blockquote & Code */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
          "
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
          {'</>'}
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        {/* Link */}
        <ToolbarButton
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive('link')}
          title="Insert Link"
        >
          🔗
        </ToolbarButton>

        {/* Image */}
        <ToolbarButton
          onClick={() => {
            const url = window.prompt('Enter image URL');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          title="Insert Image"
        >
          🖼
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        {/* ✅ TABLE BUTTON */}
        <ToolbarButton onClick={insertTable} title="Insert Table">
          ⊞ Table
        </ToolbarButton>

        {/* Table controls — only show when cursor is inside a table */}
        {editor.isActive('table') && (
          <>
            <ToolbarButton onClick={() => editor.chain().focus().addColumnBefore().run()} title="Add Column Before">
              +Col←
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add Column After">
              +Col→
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().deleteColumn().run()} title="Delete Column">
              -Col
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().addRowBefore().run()} title="Add Row Before">
              +Row↑
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().addRowAfter().run()} title="Add Row After">
              +Row↓
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().deleteRow().run()} title="Delete Row">
              -Row
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().deleteTable().run()} title="Delete Table">
              🗑Table
            </ToolbarButton>
          </>
        )}

        <div className="w-px bg-gray-300 mx-1" />

        {/* Clear formatting */}
        <ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting">
          Tx
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <div
        className="border border-t-0 border-gray-300 rounded-b bg-white overflow-y-auto"
        style={{ height }}
        onClick={() => editor.commands.focus()}
      >
        <style>{`
          .ProseMirror table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }
          .ProseMirror td, .ProseMirror th {
            border: 1px solid #ccc;
            padding: 6px 10px;
            min-width: 60px;
            vertical-align: top;
          }
          .ProseMirror th {
            background: #f3f4f6;
            font-weight: 600;
          }
          .ProseMirror .selectedCell:after {
            background: rgba(59, 130, 246, 0.15);
            content: '';
            left: 0; right: 0; top: 0; bottom: 0;
            pointer-events: none;
            position: absolute;
            z-index: 2;
          }
          .ProseMirror p.is-editor-empty:first-child::before {
            color: #adb5bd;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }
        `}</style>
        <EditorContent editor={editor} style={{ minHeight: height }} />
      </div>
    </div>
  );
};

export default RichTextEditor;
