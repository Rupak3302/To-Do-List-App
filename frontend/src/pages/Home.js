import { useEffect, useState } from 'react';
import axios from 'axios';

//Components Imports
import TodoDtails from "../components/TodoDtails";
import TodoFrom from '../components/TodoForm';
import { useTodosContext } from '../hooks/useTodosContext';

// Retrieving the list of tasks
const Home = () => {
    const { todos, dispatch } = useTodosContext();

    const [ isLoading, seIstLoding ] = useState(false);
    const [ error, setError ]  = useState(null);

    useEffect(() =>  {
        const fetchTodos = async () => {
            seIstLoding(true);
            setError(null);

            try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/todos`);

            if (response.status === 200) {
                dispatch({type: 'SET_TODOS', payload: response.data.data})
            }
        } catch (error) {
            console.log('Error fetching todos:', error);
            setError('Failed to load task. Plese try again later.');
        } finally {
            seIstLoding(false);
        }
    };

        fetchTodos();
    }, [dispatch])

    return (
        <div className='home'>
            <TodoFrom />
            <div className="todos">
                <h3> My Task </h3>

                {/* Loading Indicator */}
                {isLoading && (
                    <div className='loading'>
                        <p>Loading Task...</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className='error'>
                        {error}
                    </div>
                )}
                {/* Task list */}
                {
                    !isLoading && !error && todos && todos.map((todo) => (
                        <TodoDtails 
                        key={todo._id} 
                        todo={todo} 
                        />
                    ))
                }

                {/* No Task Message */}
                {!isLoading && !error && todos && todos.length === 0 && (
                    <div className='empty'>
                        <p>No task add yet. Please add a new task.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;