import React from 'react';
import './index.css';

function NoteList({ notes }) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} className="note" style={{ backgroundColor: note.color }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div className="note-tags">
            {note.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;