import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ForumEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const ForumEditor = ({ content, onChange }: ForumEditorProps) => {
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const handleFormat = (tag: string, wrapper?: string) => {
    const textarea = document.getElementById('forum-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let newText = '';
    if (wrapper) {
      newText = `<${tag}>${selectedText}</${tag}>`;
    } else {
      newText = tag;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    onChange(newContent);
  };

  const insertList = (type: 'ul' | 'ol') => {
    const listItem = type === 'ul' ? '• Item\n• Item\n• Item' : '1. Item\n2. Item\n3. Item';
    const textarea = document.getElementById('forum-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newContent = content.substring(0, start) + '\n' + listItem + '\n' + content.substring(start);
    onChange(newContent);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (!url) return;

    const textarea = document.getElementById('forum-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || 'Link text';

    const newContent =
      content.substring(0, start) +
      `<a href="${url}" target="_blank" class="text-primary hover:underline">${selectedText}</a>` +
      content.substring(end);
    onChange(newContent);
  };

  return (
    <div className="border-2 border-border bg-card">
      <div className="flex flex-wrap gap-1 p-2 border-b-2 border-border bg-muted/50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('strong', 'wrap')}
          className="font-pixel text-xs h-8 px-2"
          title="Bold"
        >
          <strong>B</strong>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('em', 'wrap')}
          className="font-pixel text-xs h-8 px-2 italic"
          title="Italic"
        >
          I
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('u', 'wrap')}
          className="font-pixel text-xs h-8 px-2 underline"
          title="Underline"
        >
          U
        </Button>
        <div className="w-px bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertList('ul')}
          className="font-pixel text-xs h-8 px-2"
          title="Bullet List"
        >
          •
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertList('ol')}
          className="font-pixel text-xs h-8 px-2"
          title="Numbered List"
        >
          1.
        </Button>
        <div className="w-px bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertLink}
          className="font-pixel text-xs h-8 px-2"
          title="Insert Link"
        >
          🔗
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('code', 'wrap')}
          className="font-pixel text-xs h-8 px-2"
          title="Code"
        >
          {'</>'}
        </Button>
      </div>
      <Textarea
        id="forum-editor"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your post content here... You can use basic HTML tags for formatting."
        className="min-h-[250px] border-0 bg-background font-pixel text-sm resize-y focus-visible:ring-0"
      />
      <div className="p-2 border-t-2 border-border bg-muted/30">
        <p className="text-xs text-muted-foreground font-pixel">
          Tip: You can use HTML tags like &lt;strong&gt;, &lt;em&gt;, &lt;code&gt; for formatting
        </p>
      </div>
    </div>
  );
};

export default ForumEditor;
