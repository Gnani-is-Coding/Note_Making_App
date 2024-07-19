# Note Making App

This project consists of a backend server built with Node.js and Express, and a frontend client built with React.

## Backend (/Server)

The backend is a Node.js application with Express and MongoDB.

### Installation

To run the Node.js application locally:

1. Install dependencies:
   ```
   npm install
   ```

2. Run the server:
   ```
   npm run start
   ```

The server runs on port 3000.

### Deployment

The backend is deployed at: https://note-making-app-backend.onrender.com

### Tech Stack

- Node.js
- Express
- MongoDB

### API Endpoints

- Get all Notes from DB: 
  `GET https://note-making-app-backend.onrender.com/api/notes`

- Delete a Note by ID: 
  `DELETE https://note-making-app-backend.onrender.com/api/notes/${id}`

- Create a new Note: 
  `POST https://note-making-app-backend.onrender.com/api/notes`

- Login: 
  `POST https://note-making-app-backend.onrender.com/api/login`

- Register: 
  `POST https://note-making-app-backend.onrender.com/api/register`

- Search Notes: 
  `GET https://note-making-app-backend.onrender.com/api/notes/search?query=${term}`

- Get deleted Notes (in Trash): 
  `GET https://note-making-app-backend.onrender.com/api/trash`

## Frontend (/client)

The frontend is a React application.

### Installation

To run the React application locally:

1. Install dependencies:
   ```
   npm install
   ```

2. Run the app:
   ```
   npm start
   ```

The app runs on port 3000.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
