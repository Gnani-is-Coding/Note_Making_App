import React, { useEffect, useState } from 'react';
import NoteList from '../NoteList';
import Cookies from 'js-cookie'
import './index.css';

function TrashNotes({ notes }) {
  const [trashNotes, setTrashNotes] = useState()

  useEffect(() => {

    const getTrashNotes = async() => {

      const url = `http://localhost:3000/api/trash`
      const jwtToken = Cookies.get("jwt_token")
  
      const options = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`
        }
      }
      
      console.log(options)
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data, "data")

      if (response.ok) {
        setTrashNotes(data)
      }

    }

    getTrashNotes()
  }, [])

  // const isWithin30Days = (deletedDate) => {
  //   const thirtyDaysAgo = new Date();
  //   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  //   return new Date(deletedDate) > thirtyDaysAgo;
  // };

  // const recentlyDeletedNotes = trashedNotes.filter((note) =>
  //   isWithin30Days(note.deletedAt)
  // );

  return (
    <div className="trash-notes">
      <h2>Trash</h2>
      {trashNotes?.length > 0 ? (
        <>
          <NoteList
            notes={trashNotes}
            // onNoteAction={(noteId) => onRestore(noteId)}
            actionLabel="Restore"
          />
          <button>
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