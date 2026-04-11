const Todo = require('../models/todoModle');
const mongoose = require('mongoose');

// GET--- Get all todos with search
exports.getTodos = async (req, res) => {
    try {
        const q = req.query.q;
        let query = {};

        // Search by title, description or completed status (true/false)
        if (q) {
            query = {
                $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { description: { $regex: q, $options: 'i' } },
                    { completed: q.toLowerCase() === 'completed' ? true : q.toLowerCase() === 'pending' ? false : undefined }
                ]
            };
        }

        // Sort by newest first
        const todos = await Todo.find(query).sort({ createdAt: -1 });

        if (todos.length === 0) 
            return res.status(400).json({
                success: false,
                error: 'No data found'
            })
        res.status(200).json({
        success: true,
        msg: 'GET all todos successfully',
        count: todos.length,
        data: todos
        });


    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: `No data found ${error.message}` 
        });
    }
};

// GET--- Get a single todo by ID
exports.getTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);

        // Check if todo exists
        if (!mongoose.Types.ObjectId.isValid(id) || !todo) {
            return res.status(404).json({
                success: false,
                error: `Todo not found with id ${id}`
            })
        }
        res.status(200).json({
            success: true,
            msg: `GET a single todo with ${id} `,
            data: todo
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// POST--- Create / Add a new todo
exports.createTodo = async (req, res) => {
    const { title, description } = req.body;

    // Add doc to db
    try {
        const todo = await Todo.create({ title, description });
        res.status(201).json({
            success: true,
            msg: 'A new todo created successfully',
            data: todo
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
};

// UPDATE--- Update a todo by ID (including marking as completed)
exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    // const { title, description } = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(
            {
                _id: id
            },
            {
                ...req.body
            },
            {
                new: true
            }
        )

        // Check if todo exists
        if (!mongoose.Types.ObjectId.isValid(id) || !todo) {
            return res.status(404).json({
                success: false,
                error: `Todo not found with id ${id}`
            })
        }
        res.json({
            success: true,
            msg: 'Todo updated successfully',
            data: todo
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};

// DELETE--- Delete a todo by ID
exports.deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByIdAndDelete(id);

        // Check if todo exists
        if (!mongoose.Types.ObjectId.isValid(id) || !todo) {
            return res.status(404).json({
                success: false,
                error: `Todo not found with id ${id}` 
            })
        }
        res.json({ 
            success: true, 
            msg: `Todo deleted successfully with id ${id}`,
            data: todo
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};
