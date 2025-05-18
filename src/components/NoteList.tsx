import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Note } from '../types';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  return (
    <div className="w-full max-w-lg space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 border-purple-400"
        >
          <div className="flex justify-between items-start gap-4">
            <p className="flex-1 whitespace-pre-wrap text-purple-900">{note.content}</p>
            <button
              onClick={() => onDelete(note.id)}
              className="text-purple-400 hover:text-purple-600 transition-colors p-1"
              aria-label="Delete note"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="mt-2 text-sm text-purple-500">
            {new Date(note.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};