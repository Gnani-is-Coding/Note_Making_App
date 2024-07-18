import React, { useState } from 'react';
import NoteList from '../NoteList';
import './index.css';

function Search({ notes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const results = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term) ||
        note.tags.some((tag) => tag.toLowerCase().includes(term))
    );

    setSearchResults(results);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <NoteList notes={searchResults.length > 0 ? searchResults : notes} />
    </div>
  );
}

export default Search;