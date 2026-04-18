const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

// Load env files firstly because when I put after connectedDB it won't find MONGO_URI in time
dotenv.config(); 

// Connect to MongoDB - I call this early so the DB is ready before requests come in
connectDB(); 

const app = express();

// express can read JSON from request body
// without this req.body would be undefined when I do POST/PUT requests
app.use(express.json());



// Allow requests from other origins (like our React frontend)
app.use(cors());

// middleware - I added this to see in the terminal, which routes are being hits
app.use((req, res, next) => {
    console.log(`${req.path} ${req.method}`);
    next(); // call next() because the request won't gets stuck here
});

// Testing route 
app.get('/', (req, res) => {
    res.json({ msg: 'Server is running' });
});

// All todo routes go through /api/todos
app.use('/api/todos/', todoRoutes);

// Get the port from environment variables
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
    
