import { useState, useEffect } from 'react';
import { openDB } from 'idb';
import type { Note } from '../types';

const DB_NAME = 'notes-db';
const STORE_NAME = 'notes';

const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    },
  });
  return db;
};

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const db = await initDB();
      const allNotes = await db.getAll(STORE_NAME);
      setNotes(allNotes.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = async (content: string) => {
    try {
      const newNote: Note = {
        id: crypto.randomUUID(),
        content,
        createdAt: Date.now(),
      };
      const db = await initDB();
      await db.add(STORE_NAME, newNote);
      await loadNotes();
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const db = await initDB();
      await db.delete(STORE_NAME, id);
      await loadNotes();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return { notes, isLoading, addNote, deleteNote };
};