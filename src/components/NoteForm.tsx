import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface NoteFormProps {
  onSubmit: (content: string) => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mb-8">
      <div className="flex gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? ✨"
          className="flex-1 p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 resize-none bg-white/80"
          rows={3}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 shadow-sm hover:shadow"
          disabled={!content.trim()}
        >
          <Plus size={20} />
          Add
        </button>
      </div>
    </form>
  );
};