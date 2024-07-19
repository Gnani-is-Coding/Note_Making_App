import React, { useState } from 'react';
import './index.css';

function NoteEditor({ onCreateNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState('black');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateNote({ title, content, tags, color });
    setTitle('');
    setContent('');
    setTags([]);
    setColor('#ffffff');
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && e.target.value && tags.length < 9) {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  return (
    <form className="note-editor" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="note-actions">
        <input
          type="text"
          placeholder="Add tag (press Enter)"
          onKeyDown={handleAddTag}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{width: '50px'}}
        />
        <button type="submit">Save</button>
      </div>
      <div className="tag-list">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </form>
  );
}

export default NoteEditor;