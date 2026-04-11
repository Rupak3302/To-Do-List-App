# To-Do List App - Backend (using Node.js, Express.js, MongoDB)

## Project Overview
This is RESTful **backend** API for a simple To-Do List application.
It allowes user to Create, Read, Update, Delete (CRUD) tasks and search tasks.


## Technologies Used:
- Node.js (Javascript runtime)
- Express.js (Backend framework)
- MongoDB (Atlas - Cloud Database)
- Mongoose (for database modeling)
- dotenv (Enviornment variables)

## Features
- Create, Read, Update, Delete (CRUD) tasks
- Search tasks by title or description
- Proper error handling
- Asynchronous programming


## How to Setup & Run this...
# Clone the Repository

```bash
git clone https://github.com/Rupak3302/To-Do-List-App.git
cd todo-app/backend
```

# Install All packages & with commands

- `npm install / npm i` (& To restore the node_modules and package-lock.json)

- `npm i express`
- `npm i nodemon` -- (save-dev)
- `npm i dotenv` -- (Enviornment variables)
- `npm i mongoose` -- (Database)
- `npm install mondodb`
- `npm i cors` -- (Allow requests from other origins (like our React frontend))


# Create .env file
- Create `.env` file in the root folder and add:

- MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=To-Do-App
- PORT=5000

- And it is excluded via `.gitignore`

# Run the server 
- npm run dev --> (to start the server)

- MongoDB Connected
- Server is running on port **http://localhost:5000**


## Assignment Folder Structure

```
todo-app/
├── backend/
├── config/
│   └── db.js              # MongoDB connection logic
├── controllers/
│   └── todoController.js  # All API logic (CRUD + search)
├── models/
│   └── todoModle.js       # Mongoose schema & model
├── routes/
│   └── todoRoutes.js      # Express route definitions
├── .env                   # Environment variables (not committed)
├── .gitignore             # Ignores node_modules, .env, package-lock.json
├── package.json           # Project metadata & dependencies
└── server.js              # App entry point
```

## API Endpoints
- Base URL: `http://localhost:5000/api/todos`

# Method    Endpoint           Description
- GET       api/todos          Get all todos
- GET       api/todos          Search todos ( /todos?q=keywords )
- POST      api/todos          Create a new todo
- GET       api/todos/:id      Get - single todo
- PUT       api/todos/:id      Update a todo (title, description, completed)
- DELETE    api/todos/:id      Delete a todo

### Search Example

```js
GET /api/todos?q=keyword
```
- Searches across **title**, **description**, and **completed status** (`true` / `pending`).


## Todo Data Model

```js
{
  title:       String,   // Required, max 100 characters
  description: String,   // Optional, max 300 characters
  completed:   Boolean,  // Default: false
  createdAt:   Date,     // Auto-generated
  updatedAt:   Date      // Auto-generated
}
```

## Challenges Faced & Solutions

1. MongoDB connection Issues
- Solved by using .env file with dotenv and proper connection string fron MongoDB Atlas

2. API not receiving JSON data
- Fixed by using express.json() middleware

## ⚠️ Challenges Faced & How I Addressed Them

### 1. 🔌 MongoDB Connection Failure on Startup
**Challenge:** If `MONGO_URI` was missing or incorrect, the server would crash without a meaningful error.

**Solution:** Wrapped the Mongoose connection in an `async/await` function inside `db.js` with a `try/catch` block. On failure, `console.error()` logs the exact error message and `process.exit(1)` stops the server cleanly instead of leaving it in a broken state.

---

### 2. 🔍 Search Across Multiple Fields Including a Boolean
**Challenge:** Implementing a single search query (`?q=`) that works on both text fields (`title`, `description`) and a boolean field (`completed`).

**Solution:** Used MongoDB's `$or` operator combined with `$regex` for text fields. For the `completed` field, I mapped the string `"true"` to `true` and `"pending"` to `false` using a conditional expression, then built the query object dynamically before passing it to `Todo.find()`.

---

### 3. 🆔 Invalid MongoDB ObjectId Crashing the Server
**Challenge:** Passing a malformed or invalid ID to `findById()` caused an unhandled exception and returned a `500` error instead of a clean `404`.

**Solution:** Added `mongoose.Types.ObjectId.isValid(id)` validation before every database operation that uses an ID. If the ID is invalid, the API immediately returns a `404` response with a descriptive error message.

---

### 4. 🌐 CORS Errors Between Frontend and Backend
**Challenge:** The React frontend (running on port `3000`) was blocked by the browser when trying to call the Express backend (port `5000`) due to CORS policy.

**Solution:** Installed and applied the `cors` npm package as middleware in `server.js` using `app.use(cors())`, which allows cross-origin requests from the React development server.

---

### 5. 🧩 Keeping Code Modular and Maintainable
**Challenge:** Avoiding a single large file with all logic mixed together, which becomes hard to read and maintain.

**Solution:** Followed the **MVC-style pattern** by separating concerns into four distinct layers — `models/` for the schema, `controllers/` for business logic, `routes/` for route definitions, and `config/` for database connection — keeping each file focused and easy to navigate.


## To-Do List App - Frontend (using React.js)

## How to Setup & Run this...
- npx create-react-app frontend
- npm install axios (For connect to the backend API)
- npm react-router-dom (For routing)