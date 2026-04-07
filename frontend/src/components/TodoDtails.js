import React from 'react'
import { useTodosContext } from '../hooks/useTodosContext';


const TodoDtails = ({todo}) => {

  const { dispatch } = useTodosContext();


  const handleDelete = async () => {
    const response = await fetch('/api/todos/' + todo._id, {
      method: 'DELETE'
    })

    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_TODO', payload: json.data})
    
    }
  }

  return (
    <div className='todo-details'>
        <h4>{todo.title}</h4>
        <p>{todo.description}</p>
        <p className='date'>{todo.createdAt}</p>
        <span className='material-symbols-outlined delete' onClick={handleDelete}>delete</span>
    </div>
  )
}

export default TodoDtails