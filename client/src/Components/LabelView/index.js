import React, { useState, useEffect } from 'react';
import NoteList from '../NoteList';
import './index.css';

function LabelView({ notes }) {
  const [selectedLabel, setSelectedLabel] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  const labels = [...new Set(notes.flatMap((note) => note.tags))];

  useEffect(() => {
    if (selectedLabel) {
      setFilteredNotes(notes.filter((note) => note.tags.includes(selectedLabel)));
    } else {
      setFilteredNotes(notes);
    }
  }, [selectedLabel, notes]);

  return (
    <div className="label-view">
      <div className="label-selector">
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
        >
          <option value="">All Labels</option>
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <NoteList notes={filteredNotes} />
    </div>
  );
}

export default LabelView;