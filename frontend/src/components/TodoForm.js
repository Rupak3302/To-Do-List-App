import React, { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext';
import axios from 'axios';

const TodoFrom = () => {
    const { dispatch } = useTodosContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Creating a new task
    const handleAddTask = async (e) => {
        e.preventDefault();

        // client side validation - check title before even calling the API
        // this gives instant feedback without wating for a network request
        if (!title.trim()) {
            setError('Title is required - please write a title');
            return; // stop here, don't add
        }
        if (title.trim().length > 100) {
            setError('Title is too long - max 100 characters');
            return;
        }
        if (description.lendth > 300) {
            setError('Description is too long - max 300 characters');
            return; 
        }

        setError(null);
        setIsLoading(true);
        

        const todo = { title, description }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/todos`, todo);

            if (response.status === 200 || response.status === 201) {
                // clear the from after the successfull creation
                setTitle('');
                setDescription('');
                setError(null);
                // add the new todo to the global state so it shows immediately
                dispatch({ type: 'ADD_TODO', payload: response.data.data })
                console.log('New todo added', response.data.data);
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Something went wrong, please try again');
            console.log('Creating todo failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className='create' onSubmit={handleAddTask}>
            <h3>Add a New Task</h3>

            <input
                className='from'
                type='text'
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    // clear error when user starts typing again
                    if (error) setError(null);
                }}
                placeholder='Title...'
                disabled={isLoading}
            />
            {/* show character count for title length existence*/}
            {title.length > 0 && (
                <small style={{ 
                    color: title.length > 100 ? '#ff4d4d' : '#ebb504' 
                }}>
                {title.length}/100 characters
                </small>
            )}

            <input
                className='from'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Description...'
                disabled={isLoading}
            />
            {/* show character count for description length existence*/}
            {description.length > 0 && (
                <small style={{ 
                    color: description.length > 300 ? '#ff4d4d' : '#ebb504' 
                }}>
                {description.length}/300 characters
                </small>
            )}

            {/* button is disabled when title is empty or while loading this prevents submitting a blank form */}
            <button 
                type='submit'
                disabled = {isLoading || !title.trim()}
                style={{
                    opacity: isLoading || !title.trim() ? 0.6 : 1,
                    cursor: isLoading || !title.trim() ? 'not-allowed' : 'pointer'
                }}
            >
                {isLoading ? 'Adding...' : 'Add Task'}
            </button>

            {/* Error message */}
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default TodoFrom;