const mongoose = require('mongoose');

// This is the structure of our data
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        maxlength: [300, 'Description cannot exceed 300 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Todo', todoSchema);