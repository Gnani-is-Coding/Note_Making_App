import React from 'react';
import NoteList from '../NoteList';
import './index.css';

function TrashNotes({ notes, onRestore, onDelete }) {
  const trashedNotes = notes.filter((note) => note.deleted);

  const isWithin30Days = (deletedDate) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(deletedDate) > thirtyDaysAgo;
  };

  const recentlyDeletedNotes = trashedNotes.filter((note) =>
    isWithin30Days(note.deletedAt)
  );

  return (
    <div className="trash-notes">
      <h2>Trash</h2>
      {recentlyDeletedNotes.length > 0 ? (
        <>
          <NoteList
            notes={recentlyDeletedNotes}
            onNoteAction={(noteId) => onRestore(noteId)}
            actionLabel="Restore"
          />
          <button onClick={() => onDelete(recentlyDeletedNotes.map((note) => note.id))}>
            Delete All
          </button>
        </>
      ) : (
        <p>No recently deleted notes.</p>
      )}
    </div>
  );
}

export default TrashNotes;