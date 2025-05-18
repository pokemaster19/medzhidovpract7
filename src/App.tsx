import React from 'react';
import { StickyNote } from 'lucide-react';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useNotes } from './hooks/useNotes';

function App() {
  const { notes, isLoading, addNote, deleteNote } = useNotes();

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <StickyNote size={32} className="text-purple-600" />
            <h1 className="text-3xl font-bold text-purple-900">My Notes</h1>
          </div>
          <p className="text-purple-600">Your cozy note-taking space ✨</p>
        </header>

        <main className="flex flex-col items-center">
          <NoteForm onSubmit={addNote} />
          
          {isLoading ? (
            <div className="text-purple-600">Loading your notes...</div>
          ) : notes.length === 0 ? (
            <div className="text-purple-600">Write your first note! 📝</div>
          ) : (
            <NoteList notes={notes} onDelete={deleteNote} />
          )}
        </main>
      </div>
      
      <OfflineIndicator />
    </div>
  );
}

export default App;