import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';

function NoteList({ notes}) { 



  // useEffect(() => {
  //   if (propNotes && propNotes.length > 0) {
  //     setNoteData(prevNotes => {
  //       const newNotes = propNotes.filter(note => !prevNotes.some(prevNote => prevNote.id === note.id));
  //       return [...prevNotes, ...newNotes];
  //     });
     
  //   }
  // }, [propNotes]);

  return (
    <div className="note-list">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="note" style={{ backgroundColor: note.color }}>
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
        ))
      ) : (
        <h1>No Notes</h1>
      )}
    </div>
  );
}

export default NoteList;