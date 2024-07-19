import React, { useState } from 'react';
import NoteList from '../NoteList';
import Cookies from 'js-cookie'
import './index.css';

function Search({ notes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

        const url = `http://localhost:3000/api/notes/search?query=${term}`;
        const jwtToken = Cookies.get("jwt_token");

        const options = {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${jwtToken}`
          }
        };
  
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data, "search data")
  
        if (response.ok) {
          setSearchResults(data)
        } else {
          throw new Error(data.message || 'Failed to fetch notes');
        }
  

    
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={handleSearch}
      />

      
      <NoteList notes={searchTerm.length > 0 ?  searchResults: notes} />

    </div>
  );
}

export default Search;