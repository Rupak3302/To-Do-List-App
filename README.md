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
- git clone https://github.com/Rupak3302/To-Do-List-App.git
- cd todo-app/backend

# Install All packages & with commands
- npm install / npm i (& To restore the node_modules and package-lock.json)

- npm i express
- npm i nodemon -- (save-dev)
- npm i dotenv -- (Enviornment variables)
- npm i mongoose -- (Database)
- npm install mondodb
- npm i cors -- (Allow requests from other origins (like our React frontend))


# Create .env file
- Create .env file in the root folder and add:

- MONGO_URI
- PORT=5000

# Run the server 
- npm run dev --> (to start the server)

- MongoDB Connected
- Server is running on port http://localhost:5000


## Assignment Folder Structure

todo-app/backend/
├── config/
|    ├── db.js     
├── controllers/ 
|    ├── todoController.js   
├── models/
|    ├── todos.js         
├── routes/
|    ├── todoRoutes.js         
├── node_modules/    
├── server.js 
├── .gitignore
├── .env 
├── package-lock.json           
└── package.json



## API Endpoints
# Method    Endpoint        Description
- GET       api/todos          Get all todos
- GET       api/todos          Search todos ( /todos?q=keywords )
- POST      api/todos          Create a new todo
- GET       api/todos/:id      Get - single todo
- PUT       api/todos/:id      Update a todo
- DELETE    api/todos/:id      Delete a todo


## Challenges Faced & Solutions

1. MongoDB connection Issues
- Solved by using .env file with dotenv and proper connection string fron MongoDB Atlas

2. API not receiving JSON data
- Fixed by using express.json() middleware

3. Cors error
- 


## To-Do List App - Frontend (using React.js)

## How to Setup & Run this...
- npx create-react-app frontend
- npm install axios (For connect to the backend API)
- npm react-router-dom (For routing)