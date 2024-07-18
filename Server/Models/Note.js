const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGODB_CONNECT_URL)
  .then(() => console.log('Connected to MongoDB Note'))
  .catch(err => console.error('Could not connect to MongoDB Note', err.message));


const noteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    tags: [String],
    color: {type: String, default: "#ffffff" },
    isArchived: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

//notes collection
const Note = mongoose.model("notes", noteSchema)

module.exports = Note 