const mongoose = require("mongoose")
const env = require("dotenv")

env.config()

mongoose.connect(process.env.MONGODB_CONNECT_URL)
  .then(() => console.log('Connected to MongoDB User'))
  .catch(err => console.error('Could not connect to MongoDB User', err.message));

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//userModel
const User = mongoose.model("users", userSchema)

 module.exports = User