import { useEffect } from 'react';
import axios from 'axios';

//Components Imports
import TodoDtails from "../components/TodoDtails";
import TodoFrom from '../components/TodoForm';
import { useTodosContext } from '../hooks/useTodosContext';

// Retrieving the list of tasks
const Home = () => {
    const { todos, dispatch } = useTodosContext();

    useEffect(() =>  {
        const fetchTodos = async () => {
            try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/todos`);

            if (response.status === 200) {
                dispatch({type: 'SET_TODOS', payload: response.data.data})
            }
        } catch (error) {
            console.log('Error fetching todos:', error);
        }
    };

        fetchTodos();
    }, [dispatch])

    return (
        <div className='home'>
            <div className="todos">
                {
                    todos && todos.map((todo) => (
                        <TodoDtails 
                        key={todo._id} 
                        todo={todo} 
                        />
                    ))
                }
            </div>
            <TodoFrom />
        </div>
    )
}

export default Home;