import React from "react";
import { useTodosContext } from "../hooks/useTodosContext";
// axios import
import axios from "axios";

// Date Fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TodoDtails = ({ todo }) => {
  const { dispatch } = useTodosContext();

  // Updating status (Toggle complete using Checkbox)
  const handleToggleComplete = async () => {
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
    }
  };

  // Updating task details / Edit Task handle (Title + Description)
  const handleEdit = async () => {
    const newTitle = prompt("Edit title:", todo.title);
    if (newTitle === null) return;

    const newDescription = prompt("Edit description:", todo.description);

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
      alert("Failed to updating task");
    }
  };

  // Deleting a task / Delete Task handle
  const handleDelete = async () => {
    if (!window.confirm("Are you sure to delete this task?")) 
      return;

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/todos/${todo._id}`);

      if (response.status === 200) {
        dispatch({ type: "DELETE_TODO", payload: response.data.data });
        console.log("Task deleted:", response.data.data);
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <div className="todo-details">
      {/* Checkbox - Mark as completed */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      <h4>{todo.title}</h4>
      <p>{todo.description}</p>
      <p className="date">
        {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
      </p>
      {/* Edit button */}
      <span className="material-symbols-outlined edit" onClick={handleEdit}>
        edit
      </span>
      {/* Delete button */}
      <span className="material-symbols-outlined delete" onClick={handleDelete}>
        delete
      </span>
      {/* Show 'completed' text when checked*/}
      {todo.completed && <span className="status">Completed</span>}
    </div>
  );
};

export default TodoDtails;
