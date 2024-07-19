import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Routes, Navigate } from 'react-router-dom';
import './App.css';

// Placeholder components (to be implemented)
import Login from './Components/Login';
import Register from './Components/Register';
import NoteList from './Components/NoteList';
import NoteEditor from './Components/NoteEditor';
import Search from './Components/Search';
import LabelView from './Components/LabelView';
import ArchivedNotes from './Components/ArchivedNotes';
import TrashNotes from './Components/TrashNotes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // TODO: Check if user is authenticated
    // If authenticated, fetch notes from the server
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    setIsAuthenticated(false);
  };

  const handleCreateNote = (note) => {
    // TODO: Implement create note logic
    setNotes([...notes, note]);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>Note-Taking App</h1>
          {isAuthenticated ? (
            <nav>
              <Link to="/">Home</Link>
              <Link to="/search">Search</Link>
              <Link to="/labels">Labels</Link>
              <Link to="/archived">Archived</Link>
              <Link to="/trash">Trash</Link>
              <button onClick={handleLogout}>Logout</button>
            </nav>
          ) : (
            <nav>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </nav>
          )}
        </header>

        <main>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Register onLogin={handleLogin} />
        } />
        
        {isAuthenticated ? (
          <>
            <Route path="/" element={
              <>
                <NoteList notes={notes} />
                <NoteEditor onCreateNote={handleCreateNote} />
              </>
            } />
            <Route path="/search" element={<Search notes={notes} />} />
            <Route path="/labels" element={<LabelView notes={notes} />} />
            <Route path="/archived" element={<ArchivedNotes notes={notes.filter(note => note.archived)} />} />
            <Route path="/trash" element={<TrashNotes notes={notes.filter(note => note.deleted)} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
