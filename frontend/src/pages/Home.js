import { useEffect } from 'react';


//Components Imports
import TodoDtails from "../components/TodoDtails";
import TodoFrom from '../components/TodoFrom';
import { useTodosContext } from '../hooks/useTodosContext';


const Home = () => {

    // useState
    // const [todos, setTodos] = useState([]);
    const { todos, dispatch } = useTodosContext();



    useEffect(() =>  {
        const fetchTodos = async () => {
            const response = await fetch('/api/todos');
            const json = await response.json();

            if (response.ok) {
                // setTodos(json.data);
                dispatch({type: 'SET_TODOS', payload: json.data})
            
            }
        }
        fetchTodos();

    }, [dispatch])


    return (
        <div className='home'>
            <div className="todos">
                {
                    todos && todos.map((todo) => (
                        <TodoDtails key={todo._id} todo={todo} />
                    ))
                }
            </div>
            <TodoFrom />
        </div>
    )
}

export default Home;