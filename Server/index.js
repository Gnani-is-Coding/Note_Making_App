const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require("./Models/User")
const Note = require("./Models/Note")

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Authentication Middleware
const auth = (req, res, next) => {
  const token = req.header("Authorization").split(' ')[1];
  console.log(token, "token")

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(decoded.user, "decoded")
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// APIs
// GET all User
app.get("/users", async(req,res) => {
  try {
    const usersInDB = await User.find({})
    
    console.log(usersInDB, "user in db")

    res.json(usersInDB)

  } catch(e) {
    console.log("Error", e.message)
    res.status(500).send("Server Error")
  }
})

//Register New user
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
  
    if (user) return res.status(400).json({ message: 'User already exists' });

    const saltString = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltString);

    user = new User({ email, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login User
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let userDetails = await User.findOne({ email });
    console.log(userDetails)

    if (!userDetails) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, userDetails.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

    const payload = { user: { id: userDetails.id } };
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a note
app.post('/api/notes', auth, async (req, res) => {
  try {
    const { title, content, tags, color } = req.body;
    const newNote = new Note({
      user: req.user.id,
      title,
      content,
      tags,
      color
    });
    const note = await newNote.save();
    res.json(note);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all notes for a user
app.get('/api/notes/:id', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id, isDeleted: false }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a note
app.put('/api/notes/:id', auth, async (req, res) => {
  try {
    const { title, content, tags, color, isArchived } = req.body;

    let note = await Note.findById(req.params.id);
    console.log(note, "stored note")
    if (!note) return res.status(404).json({ message: 'Note not found' });

    //We are getting user from payload of jwtToken
    if (note.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    note.title = title;
    note.content = content;
    note.tags = tags;
    note.color = color;
    note.isArchived = isArchived;
    note.updatedAt = Date.now();

    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a note (move to trash)
app.delete('/api/notes/:id', auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    note.isDeleted = true;
    note.deletedAt = Date.now();
    await note.save();
    res.json({ message: 'Note moved to trash' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get trashed notes
app.get('/api/notes/trash', auth, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const trashedNotes = await Note.find({
      user: req.user.id,
      isDeleted: true,
      deletedAt: { $gte: thirtyDaysAgo }
    }).sort({ deletedAt: -1 });
    res.json(trashedNotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Search notes
app.get('/api/notes/search', auth, async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const notes = await Note.find({
      user: req.user.id,
      isDeleted: false,
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { content: { $regex: searchTerm, $options: 'i' } }
      ]
    }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get notes by tag
app.get('/api/notes/tag/:tag', auth, async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
      isDeleted: false,
      tags: req.params.tag
    }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

