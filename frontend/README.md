# To-Do List App - Frontend (using React.js)

A **React.js** frontend for a To-Do List application, fully integrated with a Node.js/Express REST API backend. Supports complete CRUD operations, real-time search, task completion toggling, inline editing, loading indicators, error messages, and a fully responsive UI.

---

## Technologies Used:
- React.js (Create React App)
- Axios (for all API calls)
- Context API + useReducer (state management)
- React Router DOM

## Features
- Add new task
- Edit task (title + description)
- Mark task as completed (checkbox + "Completed" badge)
- Delete task
- Live search by title or description or (completed / pending)
- Real-time UI updates
- Responsive design
- Proper error handling

## How to Setup & Run this...

- `npx create-react-app frontend`
- `npm install axios` --- (For connect to the backend API)
- `npm react-router-dom` --- (For routing)
- `npm install date-fns` --- (For date formating)

### Run the server
- `npm start`

> Frontend runs at: **http://localhost:3000**


### Frontend Folder Structure

```
frontend/
├── public/
│   ├── index.html             # HTML template + Google Fonts + Material Icons
│   └── manifest.json
└── src/
    ├── components/
    │   ├── Navbar.js          # Header + debounced search bar
    │   ├── TodoDetails.js     # Todo card (toggle, edit, delete + error)
    │   └── TodoForm.js        # Add new task form (loading/error states)
    ├── context/
    │   └── TodoContext.js     # Global state — Context API + useReducer
    ├── hooks/
    │   └── useTodosContext.js # Custom hook for consuming context
    ├── pages/
    │   └── Home.js            # Main page — fetches todos, loading/error/empty states
    ├── App.js                 # BrowserRouter + search handler
    ├── App.css                # All styles + fully responsive media queries
    ├── index.js               # React root + TodoContextProvider wrapper
    ├── .gitignore             
    ├── package.json           # Project metadata & dependencies
    └── index.js               # React root + TodoContextProvider wrapper

```

## Challenges Faced & How I Addressed Them

### 1. API URL Breaking After Deployment
**Challenge:** Locally, the `"proxy"` field in `package.json` forwarded `"The backend deploy link"` requests to the backend automatically. After deploying to Netlify, the proxy no longer worked — all API calls pointed to the Netlify domain instead of the Render backend, breaking the entire app.

**Solution:** Added a `REACT_APP_API_URL` environment variable in the Netlify dashboard pointing to the Render backend URL, and updated all axios calls to use this variable in production builds.

---

### 2. Stale Search Results from Race Conditions
**Challenge:** When a user typed quickly in the search bar, multiple API requests fired at the same time. Older responses sometimes arrived after newer ones, causing the wrong list of todos to be displayed on screen.

**Solution:** Implemented a `lastestSearch` variable in `App.js` that stores the most recent input value. Before dispatching results to state, the function checks if the response belongs to the latest search and returns early if not, discarding stale results automatically.

---

### 3. Keeping UI in Sync After Every CRUD Operation
**Challenge:** After creating, updating, or deleting a todo, the UI needed to reflect changes instantly without re-fetching all data from the server again.

**Solution:** Every axios call dispatches the corresponding Context reducer action (`ADD_TODO`, `UPDATE_TODO`, `DELETE_TODO`) using the data returned directly from the server response. This keeps global state perfectly in sync with the database without any extra API calls.

---

### 4. ⏳ No Visual Feedback During API Calls
**Challenge:** When an API call was in progress, there was no feedback to the user — buttons could be clicked multiple times, causing duplicate requests or confusing behaviour.

**Solution:** Added `isLoading` and `isUpdating` state variables to every Adding task component. While a request is pending, buttons are disabled, inputs are greyed out, and loading text ("Adding...") replaces the normal button label. A `finally` block always resets the loading state whether the request succeeds or fails.

---

### 5. Responsive Layout Breaking on Mobile
**Challenge:** The original CSS used a fixed `grid-template-columns: 2fr 1fr` layout and a fixed `300px` search bar width. On tablet and mobile screens, the layout overflowed and became unusable.

**Solution:** Added responsive `@media` breakpoints in `App.css`:
- **≤ 600px (mobile):** Header stacks vertically, search bar becomes full width, font sizes and paddings reduced

---

### 6. Managing Global State Without a Third-Party Library
**Challenge:** Passing todos and dispatch functions down through multiple component layers via props made the code messy and hard to maintain.

**Solution:** Used React's built-in **Context API** combined with **`useReducer`** for global state management. A custom `useTodosContext` hook wraps `useContext` and throws a descriptive error if used outside the Provider, making any misuse immediately obvious during development.

