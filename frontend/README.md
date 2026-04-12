# 📝 To-Do List App — Frontend

A React.js frontend for a To-Do List application, fully integrated with a Node.js/Express REST API backend. Supports complete CRUD operations, real-time search, task completion toggling, inline editing, loading indicators, error messages, and a fully responsive UI.

---

## 🚀 How to Set Up and Run

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [npm](https://www.npmjs.com/)
- Backend server running (see backend README)

---

### Step 1 — Clone the Repository

```bash
git clone <your-github-repo-url>
cd todo-app/frontend
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Configure Environment Variables

For **local development**, no `.env` is needed. The `proxy` field in `package.json` automatically forwards all `/api/...` requests to the backend:

```json
"proxy": "http://localhost:5000"
```

For **production deployment** (Netlify), create a `.env` file inside `frontend/`:

```env
REACT_APP_API_URL=https://your-backend-on-render.com
```

Then update all axios calls from `/api/todos` to:

```js
`${process.env.REACT_APP_API_URL}/api/todos`
```

### Step 4 — Run the App

```bash
npm start
```

> Frontend runs at: **http://localhost:3000**

---

## 🌍 Environment Variables

| Variable             | Description                                  | Required         |
|----------------------|----------------------------------------------|------------------|
| `REACT_APP_API_URL`  | Deployed backend URL (e.g. from Render)      | Production only  |

> ⚠️ Never commit your `.env` file. It is already excluded via `.gitignore`.

---

## 📁 Project Structure

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

---

## 🧩 Features

| Feature | Component |
|---|---|
| View all todos | `Home.js` |
| Add a new todo | `TodoForm.js` |
| Edit todo title & description | `TodoDetails.js` — `handleEdit` |
| Delete a todo | `TodoDetails.js` — `handleDelete` |
| Mark todo as complete/incomplete | `TodoDetails.js` — `handleToggleComplete` |
| Search todos by title or description | `Navbar.js` + `App.js` |
| Loading indicators | `Home.js`, `TodoForm.js`, `TodoDetails.js` |
| Error messages | All components |
| Responsive UI | `App.css` media queries |

---

## Dependencies

| Package            | Version   | Purpose                              |
|--------------------|-----------|--------------------------------------|
| `react`            | ^19.2.4   | UI framework                         |
| `react-dom`        | ^19.2.4   | DOM rendering                        |
| `react-router-dom` | ^7.14.0   | Client-side routing                  |
| `axios`            | ^1.14.0   | HTTP requests for all API calls      |
| `date-fns`         | ^4.1.0    | Human-readable relative timestamps  |
| `react-scripts`    | 5.0.1     | CRA build tooling                    |

---

## ☁️ Deployment — Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) → **New Site from Git** → Connect your repo
3. Configure the build settings:
   - **Base Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `frontend/build`
4. Add environment variable in the Netlify dashboard:
   - `REACT_APP_API_URL` → your Render backend URL
5. Add a `_redirects` file inside `frontend/public/`:
   ```
   /*  /index.html  200
   ```
   This ensures React Router works correctly on page refresh.
6. Click **Deploy**

---

## ⚠️ Challenges Faced & How I Addressed Them

### 1. 🔗 API URL Breaking After Deployment
**Challenge:** Locally, the `"proxy"` field in `package.json` forwarded `/api/todos` requests to the backend automatically. After deploying to Netlify, the proxy no longer worked — all API calls pointed to the Netlify domain instead of the Render backend, breaking the entire app.

**Solution:** Added a `REACT_APP_API_URL` environment variable in the Netlify dashboard pointing to the Render backend URL, and updated all axios calls to use this variable in production builds.

---

### 2. 🔄 Stale Search Results from Race Conditions
**Challenge:** When a user typed quickly in the search bar, multiple API requests fired at the same time. Older responses sometimes arrived after newer ones, causing the wrong list of todos to be displayed on screen.

**Solution:** Implemented a `lastestSearch` variable in `App.js` that stores the most recent input value. Before dispatching results to state, the function checks if the response belongs to the latest search and returns early if not, discarding stale results automatically.

---

### 3. 🔁 Keeping UI in Sync After Every CRUD Operation
**Challenge:** After creating, updating, or deleting a todo, the UI needed to reflect changes instantly without re-fetching all data from the server again.

**Solution:** Every axios call dispatches the corresponding Context reducer action (`ADD_TODO`, `UPDATE_TODO`, `DELETE_TODO`) using the data returned directly from the server response. This keeps global state perfectly in sync with the database without any extra API calls.

---

### 4. ⏳ No Visual Feedback During API Calls
**Challenge:** When an API call was in progress, there was no feedback to the user — buttons could be clicked multiple times, causing duplicate requests or confusing behaviour.

**Solution:** Added `isLoading` and `isUpdating` state variables to every component. While a request is pending, buttons are disabled, inputs are greyed out, and loading text ("Adding...", "Saving...") replaces the normal button label. A `finally` block always resets the loading state whether the request succeeds or fails.

---

### 5. 📱 Responsive Layout Breaking on Mobile
**Challenge:** The original CSS used a fixed `grid-template-columns: 2fr 1fr` layout and a fixed `300px` search bar width. On tablet and mobile screens, the layout overflowed and became unusable.

**Solution:** Added three responsive `@media` breakpoints in `App.css`:
- **≤ 900px (tablet):** Grid switches to single column, search bar shrinks to `220px`
- **≤ 600px (mobile):** Header stacks vertically, search bar becomes full width, font sizes and paddings reduced
- **≤ 400px (small mobile):** Further font size reductions for very small screens

---

### 6. 🧩 Managing Global State Without a Third-Party Library
**Challenge:** Passing todos and dispatch functions down through multiple component layers via props made the code messy and hard to maintain.

**Solution:** Used React's built-in **Context API** combined with **`useReducer`** for global state management. A custom `useTodosContext` hook wraps `useContext` and throws a descriptive error if used outside the Provider, making any misuse immediately obvious during development.