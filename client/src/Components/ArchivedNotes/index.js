import React from 'react';
import NoteList from '../NoteList';
import './index.css';

function ArchivedNotes({ notes, onUnarchive }) {
  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <div className="archived-notes">
      <h2>Archived Notes</h2>
      {archivedNotes.length > 0 ? (
        <NoteList
          notes={archivedNotes}
          onNoteAction={(noteId) => onUnarchive(noteId)}
          actionLabel="Unarchive"
        />
      ) : (
        <p>No archived notes.</p>
      )}
    </div>
  );
}

export default ArchivedNotes;