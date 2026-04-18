# To-Do List App - Frontend (using React.js)

This is the **React.js** frontend for a To-Do List application, fully integrated with a Node.js/Express REST API backend. Supports complete CRUD operations, real-time search, task completion toggling, inline editing, loading indicators, error messages, and a fully responsive UI.

## Technologies Used:
- React.js (Create React App)
- Axios (for all API calls)
- Context API + useReducer (state management)
- React Router DOM

## Features
- Add new task
- Edit task (title + description)
- Mark task as completed (checkbox + "Completed" text)
- Delete task
- Live search by (title / description) or status (completed / pending)
- Real-time UI
- Responsive design
- Proper error handling

## How to Setup & Run this...

- `npx create-react-app frontend`
- `npm install axios` --- (For connect to the backend API)
- `npm react-router-dom` --- (For routing)
- `npm install date-fns` --- (For date formating)

## Run the server
- `npm start`

> Frontend runs at: **http://localhost:3000**

## Frontend deployment (vercel)

- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

> Vercel - **https://taskmanager-todo-app.vercel.app/**

## Environment Variables

Create a `.env` file inside the frontend folder:
```
REACT_APP_API_URL=https://to-do-list-backend-ko3y.onrender.com
```

## Frontend Folder Structure

```
frontend/
├── public/
│   ├── index.html             # HTML template + Google Fonts + Material Icons
│   └── manifest.json
└── src/
    ├── components/
    │   ├── Navbar.js          # Header and search bar at the top
    │   ├── TodoDetails.js     # Each Todo card (toggle, edit, delete, completed)
    │   └── TodoForm.js        # Add new task form (loading/error states)
    ├── context/
    │   └── TodoContext.js     # Global state — Context API + useReducer
    ├── hooks/
    │   └── useTodosContext.js # Custom hook to use the context easily
    ├── pages/
    │   └── Home.js            # Main page — loads and show all todos
    ├── App.js                 # BrowserRouter + search handler
    ├── App.css                # All styles + fully responsive media queries
    ├── index.js               # React root + TodoContextProvider wrapper
    ├── .gitignore             
    ├── package.json 
    └── index.js               

```

## Challenges Faced & How I Addressed Them

**The proxy stopped working after deployment**: Locally I used the `"proxy"` field in package.json which forwords API calls from React to the backend automatically. After deploying to Netlify, this doesn't work at all because proxy is a development-only feature. I had to add the `REACT_APP_API_URL` environment variable and update every API call to use it. I only realized this was the problem after seeing 404 errors pointing to the Netlify URL instead of Render.

**Race condition in search**: When typing fast in serarch bar, older API responses were arriving after newer ones. So I fixed it by Implemented a `lastestSearch` variable in `App.js` that saving the most recent input value and checking if the response belongs to the latest before dispatching it.

**TodoForm validation**: In `TodoForm.js` I added client-side checks. I added a check that disable the button when title is empty and also i added title and description length validation with max length of 100 and 300 characters shows a clear message immediately without waiting for the network request.

**Visual Feedback During API Calls**: When an API call was in progress, there was no feedback to the user and buttons could be clicked multiple times, causing duplicate requests i fixed it by Added `isLoading` and `isUpdating` state variables to every Adding task component. While a request is pending, buttons are disabled, inputs are greyed out, and loading text ("Adding..."), ("Saving...") replaces the normal button label and Added a `finally` block in the `try/catch` block that always resets the loading state whether the request succeeds or fails.

**Responsive Layout Breaking on Mobile**: The original CSS used a fixed `grid-template-columns: 2fr 1fr` layout and a fixed `300px` search bar width. On mobile screens, the layout overflowed and became unusable.I fixed it by Added responsive `@media` breakpoints in `App.css`:**≤ 600px (for mobile view)** Header stacks vertically, search bar becomes full width, font sizes and paddings reduced.


