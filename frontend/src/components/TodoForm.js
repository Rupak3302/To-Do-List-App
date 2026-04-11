import React, { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext';
import axios from 'axios';

const TodoFrom = () => {
    const { dispatch } = useTodosContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Creating a new task handle 
    const handleAddTask = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        

        const todo = { title, description }
        try {
            const response = await axios.post('/api/todos', todo);

            if (response.status === 200 || response.status === 201) {
                setError(null);
                setTitle('');
                setDescription('');
                dispatch({ type: 'ADD_TODO', payload: response.data.data })
                console.log('New todo added', response.data.data);
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Something went wrong');
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
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title...'
        />
        <input
            className='from'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description...'
        />

        <button 
        type='submit'
        disabled = {isLoading}
        >{isLoading ? 'Adding...' : 'Add Task'}</button>
        
        {/* Error message */}
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default TodoFrom