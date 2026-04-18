# To-Do List App - Backend (using Node.js, Express.js, MongoDB)

This is RESTful **backend** API for a simple To-Do List application. It allowes user to Create, Read, Update, Delete (CRUD) tasks and search tasks. Honestly this was my first time building a proper backend so there's a lot I learned along the way.

## Technologies Used:
- Node.js (Javascript runtime)
- Express.js (Backend framework)
- MongoDB (Atlas - Cloud Database)
- Mongoose (for database modeling)
- dotenv (Enviornment variables)

## How to Setup & Run this...
I installed node.js and a MongoDB Atlas account.

# Clone the Repository and go into the backend folder
```
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


# Create a .env file
- Create `.env` file in the root folder and add:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=To-Do-App
PORT=5000
```
- And it is excluded via `.gitignore`

# Start the server 
- `npm run dev` --> (to start the server)

```
"MongoDB Connected successfully"
"Server is running on port **http://localhost:5000**"
```

## Backend Deploy Link

- Render **https://to-do-list-backend-ko3y.onrender.com**

## Backend Folder Structure

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
├── server.js              # App entry point
└── README.md              # Project description, challenges & solutions
```
## API Endpoints
- Base URL: `http://localhost:5000/api/todos`

# Method    Endpoint           Description
- GET       api/todos          Get all todos
- GET       api/todos          Search todos ( /todos`?q=` to search )
- POST      api/todos          Create a new todo
- GET       api/todos/:id      Get - single todo
- PUT       api/todos/:id      Update a todo (title, description, completed)
- DELETE    api/todos/:id      Delete a todo

# Search Example
- Search todos (title and description): `/api/todos?q=homework`
- Status (completed / pending): `/api/todos?q=completed` or `/api/todos?q=pending`

## Challenges I Faced & How I Addressed Them

**CORS errors**: When I connected my React frontend to this backend I kept getting blocked by CORS. I didn't even know what CORS was at first. I learned it's a browser security thing that blocks requests from different origins. I had to install the `cors`as package as middleware in `server.js` using `app.use(cors())`, which allows cross-origin requests from the React development server.

**Environment variables**: I committed my MongoDB connection string to GitHub by accident at first. I learned about `.env` files and `.gitignore` the hard way. I now always check that `.env` is in `.gitignore` before pushing anything.

**Search with Text (title / description) fields and Search Status with Boolean (completed / pending)**: Thinking to Implementing a single search query (`?q=`) that works on both text fields (`title`, `description`) and a boolean field (`completed or pending`).

I used MongoDB's `$or` operator combined with `$regex` for text fields and added an `completed` or `pending` condition for the status field, if the word actually matches for `completed` then `completed` to `true` and for `pending` then `completed` to `false` using a conditional expression.


