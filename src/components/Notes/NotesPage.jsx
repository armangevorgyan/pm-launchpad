import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { Plus, Search, FileText, Trash2, Tag } from 'lucide-react';

const NotesPage = () => {
  const { notes, setNotes } = useProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      date: new Date().toLocaleDateString(),
      tags: []
    };
    setNotes([newNote, ...notes]);
    setEditingNote(newNote);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
    if (editingNote?.id === id) setEditingNote(null);
  };

  const updateNote = (updated) => {
    setNotes(notes.map(n => n.id === updated.id ? updated : n));
    setEditingNote(updated);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] flex gap-8">
      <div className="w-80 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">Notes</h2>
          <button onClick={addNote} className="p-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-xs dark:text-white w-full"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {filteredNotes.map(note => (
            <div 
              key={note.id}
              onClick={() => setEditingNote(note)}
              className={`
                p-4 rounded-xl cursor-pointer transition-all border
                ${editingNote?.id === note.id 
                  ? 'bg-primary/5 border-primary shadow-sm' 
                  : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}
              `}
            >
              <h4 className={`font-bold text-sm mb-1 truncate ${editingNote?.id === note.id ? 'text-primary' : 'dark:text-white'}`}>
                {note.title || 'Untitled Note'}
              </h4>
              <p className="text-xs text-slate-400 mb-2">{note.date}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {note.content || 'No content yet...'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 card overflow-hidden flex flex-col">
        {editingNote ? (
          <>
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <input 
                type="text" 
                value={editingNote.title}
                onChange={(e) => updateNote({...editingNote, title: e.target.value})}
                className="bg-transparent border-none outline-none text-xl font-bold dark:text-white w-full"
                placeholder="Note Title"
              />
              <button 
                onClick={() => deleteNote(editingNote.id)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <textarea 
              value={editingNote.content}
              onChange={(e) => updateNote({...editingNote, content: e.target.value})}
              className="flex-1 p-8 bg-transparent border-none outline-none resize-none dark:text-slate-300 leading-relaxed text-lg"
              placeholder="Start writing..."
            ></textarea>
            <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-bold text-slate-500 uppercase">Learning</span>
                <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-bold text-slate-500 uppercase">Week 1</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold dark:text-white mb-2">Select a note to view</h3>
            <p className="text-sm max-w-xs">Choose a note from the sidebar or create a new one to start writing.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;