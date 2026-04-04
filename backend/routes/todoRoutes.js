const express = require('express'); 
const router = express.Router();
const { getTodos, createTodo, getTodo, updateTodo, deleteTodo} = require('../controllers/todoController');

// GET--- Get all todos with search
/**GET search todos 
 * Route: /api/todos?q=searchTerm
 * Method: GET
 * Desc: Get all todos with optional search by title, description, or completed status
 * Access: Public
 * Params: q (optional search term for title, description, or completed status)  
 */
/**Get all todos
 * Route: /api/todos
 * Method: GET
 * Desc: Get all todos
 * Access: Public
 * Params: None
 */
router.get('/', getTodos);


// POST--- Create / Add a new todo
/**
 * Route: /api/todos
 * Method: POST
 * Desc: Create / Add a new todo
 * Access: Public
 * Params: None
 */
router.post('/', createTodo);


// GET--- Get a single todo by ID
/**
 * Route: /api/todos/:id
 * Method: GET
 * Desc: Get a single todo by ID
 * Access: Public
 * Params: id
 */
router.get('/:id', getTodo);


// PUT--- Update a todo by ID (including marking as completed)
/**
 * Route: /api/todos/:id
 * Method: PUT
 * Desc: Update a todo by ID (including marking as completed)
 * Access: Public
 * Params: id
 */
router.put('/:id', updateTodo);


// DELETE--- Delete a todo by ID
/**
 * Route: /api/todos/:id
 * Method: DELETE
 * Desc: Delete a todo by ID
 * Access: Public
 * Params: id
 */
router.delete('/:id', deleteTodo);



module.exports = router;
