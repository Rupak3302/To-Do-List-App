import React, { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext';


const TodoFrom = () => {

    const { dispatch } = useTodosContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleAddTodo = async (e) => {
        e.preventDefault();

        const todo = { title, description }
        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
    })
    const json = await response.json();

    if (!response.ok) {
        setError(json.error);

    } else {
        setError(null);
        setTitle('');
        setDescription('');
        console.log('New Todo Added', json);
        dispatch({type: 'ADD_TODO', payload: json.data})
        }
    }


  return (
    <form className='create' onSubmit={handleAddTodo}>
        <h3>Add a New Task</h3>

        <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title...'
        />
        <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description...'
        />
        <button type='submit'>Add Task</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default TodoFrom