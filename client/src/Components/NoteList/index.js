import React from 'react';
import { Archive, Trash2 } from 'lucide-react';
import './index.css';

function NoteList({ notes, onDelete, onArchive}) {

  
  return (
    <div className="note-list">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id} className="note" style={{ backgroundColor: note.color }}>
            <div className="note-content">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="note-tags">
                {note.tags && note.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="note-actions">
              <button 
                onClick={() => onArchive && onArchive(note.id)} 
                className="icon-button" 
                aria-label="Archive note"
                style={{"background-color": "transparent"}}
              >
                <Archive size={20} />
              </button>
              <button 
                onClick={() => onDelete && onDelete(note._id)} 
                className="icon-button" 
                aria-label="Delete note"
                style={{"background-color": "transparent"}}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1>No Notes</h1>
      )}
    </div>
  );
}

export default NoteList;