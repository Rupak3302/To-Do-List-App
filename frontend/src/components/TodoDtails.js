import React, { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
// axios import
import axios from "axios";

// Date Fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TodoDtails = ({ todo }) => {
  const { dispatch } = useTodosContext();

  const [ isUpdating, setIsUpdating ] = useState(false);
  const [ isDeleteing, setIsDeleteing ] = useState(false);
  const [ error, setError ]  = useState(null);


  // Updating status (Toggle complete using Checkbox)
  const handleToggleComplete = async () => {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      if (response.status === 200) {
        dispatch({ type: "UPDATE_TODO", payload: response.data.data });
        console.log("Task updated:", response.data.data);
      }
    } catch (error) {
      console.log("Error updating task:", error);
      setError("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  // Updating task details / Edit Task handle (Title + Description)
  const handleEdit = async () => {
    const newTitle = prompt("Edit title:", todo.title);
    if (newTitle === null) return;

    const newDescription = prompt("Edit description:", todo.description);

    setIsUpdating(true);
    setError(null);

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/todos/${todo._id}`, {
          title: newTitle,
          description: newDescription
      });

      if (response.status === 200) {
        dispatch({ type: "UPDATE_TODO", payload: response.data.data });
        console.log("Task updated:", response.data.data);
      }
    } catch (error) {
      console.log("Error updating task:", error);
      setError("Failed to updating task");
    } finally {
      setIsUpdating(false);
    }
  };

  // Deleting a task / Delete Task handle
  const handleDelete = async () => {
    if (!window.confirm("Are you sure to delete this task?")) 
      return;

    setIsDeleteing(true);
    setError(null);

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/todos/${todo._id}`);

      if (response.status === 200) {
        dispatch({ type: "DELETE_TODO", payload: response.data.data });
        console.log("Task deleted:", response.data.data);
      }
    } catch (error) {
      console.log("Error deleting task:", error);
      setError("Failed to delete task");
    } finally {
      setIsDeleteing(false);
    }
  };

  return (
    <div className="todo-details">

      {/* Checkbox - Mark as completed */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={ isUpdating }
      />
      <h4>{todo.title}</h4>
      <p>{todo.description}</p>
      <p className="date">
        {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
      </p>

      {/* Edit button - disabled while updating*/}
      <span className="material-symbols-outlined edit" onClick={!isUpdating ? handleEdit : undefined}
      style={{
        opacity: isUpdating ? 0.5 : 1,
        cursor: isUpdating ? 'not-allowed' : 'pointer'
      }}>
        edit
      </span>

      {/* Delete button - disabled while deleting*/}
      <span className="material-symbols-outlined delete" onClick={!isDeleteing ? handleDelete : undefined}
      style={{
        opacity: isDeleteing ? 0.5 : 1,
        cursor: isDeleteing ? 'not-allowed' : 'pointer'
      }}>
        delete
      </span>

      {/* Loading indicator - while updating */}
      {isUpdating && <span className="updating">Saving...</span>}

      {/* Error message */}
      {error && <div className="error">{error}</div>}

      {/* Show 'completed' text when checked*/}
      {todo.completed && <span className="status">Completed</span>}
    </div>
  );
};

export default TodoDtails;
