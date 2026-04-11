const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');

dotenv.config(); // Load env files
connectDB(); // Connect to database

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Allow requests from other origins (like our React frontend)
app.use(cors());


// middleware 
app.use((req, res, next) => {
    console.log(`${req.path} ${req.method}`);
    next();
});


// Testing route 
app.get('/', (req, res) => {
    res.json({ msg: 'Server is running' });
});

app.use('/api/todos/', todoRoutes);

// Get the port from environment variables
const PORT = process.env.PORT

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
    
