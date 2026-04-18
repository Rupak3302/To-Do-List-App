## Implementing To-Do List APIs with Node.js, Express.js, and MongoDB and Integrating To-Do List APIs with React Frontend (Part 1 and Part 2 Assignment)
> Deployement Links 
## GitHub Links
- https://github.com/Rupak3302/To-Do-List-App.git

## Backend Links (Render)
- https://to-do-list-backend-ko3y.onrender.com

## Frontend Links(Vercel)
- https://taskmanager-todo-app.vercel.app/

> Overview of Decisions Made During the Enhancement Process
### 1. Project Structure Decision

Decision: Kept the entire project — backend and frontend — in a single GitHub repository with two separate folders (`backend/` and `frontend/`), rather than splitting into two separate repos.

Reason: The assignment referred to a single "Github Repo" for submission. A monorepo structure keeps the full-stack project organized, easier to manage, and simpler to submit as one GitHub link.

### 2. Backend Architecture Decision

Decision: Followed an MVC-style pattern by separating the backend into four distinct layers — `models/`, `controllers/`, `routes/`, and `config/` — instead of writing everything in a single `server.js` file.

Reason: This makes the code modular, readable, and maintainable. Each file has a single responsibility — the model defines the schema, the controller handles logic, the routes define endpoints, and the config manages database connection.

### 3. Database Decision

Decision: Used MongoDB Atlas (cloud-hosted) instead of a local MongoDB instance, and connected via `mongoose` with the URI stored in a `.env` file.

Reason: Atlas works seamlessly with cloud deployments like Render without any extra configuration. Storing the URI in `.env` keeps credentials secure and out of the GitHub repository.

### 4. State Management Decision

Decision: Used React's built-in Context API + useReducer for global state management instead of a third-party library like Redux.

Reason: For an app of this scale, Context API with useReducer provides clean, predictable state management without the overhead of additional dependencies. The reducer handles four clear actions — `SET_TODOS`, `ADD_TODO`, `UPDATE_TODO`, `DELETE_TODO` — keeping state transitions easy to trace and debug.

### 7. Loading & Error State Decision

Decision: Added `isLoading`, `isUpdate` state variables and `error` state variables to **every component** that makes API calls, with `finally` blocks to always reset loading state.

Reason: Without loading indicators, users had no feedback during API calls — they could click buttons multiple times causing duplicate requests. The `finally` block ensures the UI never gets stuck in a loading state even if the request fails.

### 8. Responsive Design Decision

Decision: Added One media query breakpoints to `App.css` ( ≤600px for mobile view) to make the layout fully responsive, replacing the fixed `grid-template-columns: 2fr 1fr` desktop-only layout.

Reason: The original CSS had no responsive design — the layout broke completely on mobile. The assignment required a "responsive and user-friendly interface", so media queries were added to stack the grid to a single column on smaller screens and adjust font sizes, paddings, and header layout for mobile users.

### 10. CORS Decision

Decision: Configured the backend CORS policy to use a whitelist function that allows `localhost:3000` for development and all `*.ver.app` subdomains for production, instead of `app.use(cors())` which allows all origins.

Reason: Allowing all origins (`cors()` with no config) is a security risk in production. The whitelist approach ensures only the known frontend origins can access the backend API, while still supporting both local development and all Netlify preview deploy URLs.

### 11. Environment Variables Decision

Decision: Use `REACT_APP_API_URL` environment variable for all frontend API calls, with the value set differently per environment — `http://localhost:5000` locally and `https://to-do-list-backend-ko3y.onrender.com` on vercel's dashboard.

Reason: Hardcoding the backend URL would break either local development or production deployment. The environment variable approach means the same codebase works in both environments without any code changes — just a different `.env` value.


> Frontend
<img width="1918" height="1071" alt="Screenshot 2026-04-19 021630" src="https://github.com/user-attachments/assets/aa50c48a-ed86-490d-9d7b-dde43af80835" />

> Backend (Postman)

- Get All Todos
<img width="1919" height="1079" alt="Screenshot 2026-04-15 194324" src="https://github.com/user-attachments/assets/691d3ccd-e48e-4a1e-82f1-0509fe59ff70" />

- Create Todo / Add Todo
<img width="1919" height="1079" alt="Screenshot 2026-04-15 224123" src="https://github.com/user-attachments/assets/7cfde717-4fe5-496d-a558-a4ff11c27e3b" />

- Search a todo (title / description) and (completed / pending)
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/5bc79a1c-84dd-44d6-b3fe-ad816346e51e" />
<img width="1919" height="1075" alt="image" src="https://github.com/user-attachments/assets/034c9cea-00d2-4498-b08b-e8d9601c76c6" />
<img width="1913" height="1080" alt="image" src="https://github.com/user-attachments/assets/d3035a26-cf0f-4713-9e21-b8021a75cd3b" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/aaf62035-5b69-4c86-bb27-7eb95541bc70" />

- Get Single todo by ID
<img width="1919" height="1079" alt="Screenshot 2026-04-15 224633" src="https://github.com/user-attachments/assets/eb328688-c58b-44bb-b6da-394a010cdd2c" />

- Edit / Update todo by ID
<img width="1919" height="1076" alt="Screenshot 2026-04-15 224956" src="https://github.com/user-attachments/assets/2e366f36-815a-497b-b922-36f5f2792174" />

- Delete todo by ID
<img width="1916" height="1078" alt="Screenshot 2026-04-15 225126" src="https://github.com/user-attachments/assets/78040c59-c057-42b5-85e3-7475a1ea6bea" />

> Database (MongoDB)
<img width="1915" height="1078" alt="Screenshot 2026-04-15 193935" src="https://github.com/user-attachments/assets/4ce5af6a-0d68-453f-b7ee-df8c21f5cd28" />
